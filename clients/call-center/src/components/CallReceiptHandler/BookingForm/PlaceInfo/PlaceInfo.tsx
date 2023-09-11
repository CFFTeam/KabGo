import styles from "./PlaceInfo.module.css";
import { useState, useRef } from "react";
import {ReactComponent as PickUpIcon} from '@assets/svg/CallReceipt/pick-up.svg';
import {ReactComponent as LocationIcon} from '@assets/svg/CallReceipt/location.svg';
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { GoogleMap, Marker, Autocomplete, DirectionsRenderer, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { callReceiptHandlerActions } from "@store/reducers/callReceiptHandlerSlice";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import PlacesAutocompleteInput from "../../../PlacesAutocompleteInput/PlacesAutocompleteInput";
import originMarkerIcon from "@assets/svg/CallReceiptHandler/origin-point-icn.svg";
import destinationMarkerIcon from "@assets/svg/CallReceiptHandler/des-point-icn.svg";
import mapStyles from "@assets/googleMapStyles/map.json";
import { formatAsVietnameseCurrency } from "@utils/formatCurrent";


// define global variables (used for setting)
const HCMUS_LAT_LNG_CENTER = {
    lat: 10.763352053865761,
    lng: 106.68228927747572
}

// used for customizing google map UI
const mapOptions = {
    styles: mapStyles,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
}

// customize direction line
const polylineOptions = {
    polylineOptions: {
        strokeColor: '#FF6B00', // Orange color
        strokeOpacity: 1,
        strokeWeight: 4,      // Thickness of the line
      },
    suppressMarkers: true, // Turn off default markers
}

// customize marker icon
const markerOptions = {
    originLocationIcon: originMarkerIcon,
    destinationLocationIcon: destinationMarkerIcon,
}

// React PlaceInfo Component
const PlaceInfo: React.FC = () => {
    const guestInformation = useAppSelector((state) => state.callReceiptHandler.finalBookingInformation);
    const dispatch = useAppDispatch();
    const processSteps = useAppSelector((state) => state.callReceiptHandler.processSteps);
    // used for detecting of specific marker when hovering

    const [hoveredMarker, setHoveredMarker] = useState<string>('');
    const finalBookingInformation = useAppSelector((state) => state.callReceiptHandler.finalBookingInformation);
    // retrieve original_latitude, original_longitude & destination_latitude & destination_longitude
    // const { originLatLng: originLatLngGlobal, destinationLatLng: destinationLatLngGlobal} 
    // = useAppSelector((state) => state.callReceiptHandler.finalBookingInformation);

    const { originLatLng: originLatLngGlobal, destinationLatLng: destinationLatLngGlobal} = finalBookingInformation;
    // calling Google map API service
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
        libraries: ['places'],
        language: 'vi',
        region: 'vn',
    })

    // used for get & set result from calling direction service of google map API
    const [directionsResponse, setDirectionsResponse] = useState<any>(null);
    
    // used for calculate distance & duration later
    const [distanctace, setDistance] = useState<any>('');
    const [duration, setDuration] = useState<any>('');

    const roundToThousands = (price: number) => {
        return Math.round(price / 1000) * 1000;
        // console.log(roundToThousands(160480)); // Result: 160000
        // console.log(roundToThousands(160650)); // Result: 161000
      }

    const calculatePrice = (distance: number) => {
        const distanceConvertedValue = distance * 1000; // convert kilometers to meters -> 1km = 1000m
        if (finalBookingInformation.vehicleType === "Xe máy") {
            return roundToThousands(distanceConvertedValue * 5.5);
        }
        else if (finalBookingInformation.vehicleType === "Xe tay ga") {
            return roundToThousands(distanceConvertedValue * 6.3);
        }
        else if (finalBookingInformation.vehicleType === "Ô tô (2-4 chỗ)") {
            return roundToThousands(distanceConvertedValue * 11.8);
        }
        else if (finalBookingInformation.vehicleType === "Ô tô (7-9 chỗ)") {
            return roundToThousands(distanceConvertedValue * 13.8);
        }
    }
   
    // Used to calculate logic related & render the direction of a route based on the starting address and the destination address
    const calculateRoute = async () => {
        if (window.google.maps) {
           const directionService = new window.google.maps.DirectionsService();
           console.log('direction service: ', directionService);
           console.log('guestInformation: ', guestInformation);
            const results = await directionService.route({
                origin: new window.google.maps.LatLng(guestInformation.originLatLng.lat, guestInformation.originLatLng.lng),
                destination: new window.google.maps.LatLng(guestInformation.destinationLatLng.lat, guestInformation.destinationLatLng.lng), 
                travelMode: window.google.maps.TravelMode.DRIVING
            })
           
            setDirectionsResponse(results);

            // calculate distance, duration & price
            const distance = results.routes[0].legs[0].distance?.text || '';
            const duration = results.routes[0].legs[0].duration?.text || '';
            // handle price
            const distanceValue = parseFloat(distance.replace(',', '.').split(' ')[0]); // convert to number (13,6 km -> 13.6)
            console.log('distance value: ', distanceValue);
            const price = calculatePrice(distanceValue) || 0;
            console.log('price: ', price);
            const formattedPrice = formatAsVietnameseCurrency(price);
            dispatch(callReceiptHandlerActions.updateFinalBookingInformation({
                ...finalBookingInformation,
                distance: distance,
                duration: duration,
                price: formattedPrice,
            }))
        }

        // handle fake data - delete when done
        // const distance = '13,6 km';
        //     const duration = '36 phút';
        //     // handle price
        //     const distanceValue = parseFloat(distance.replace(',', '.').split(' ')[0]); // convert to number (13,6 km -> 13.6)
        //     const price = calculatePrice(distanceValue) || 0;
        //     const formattedPrice = formatAsVietnameseCurrency(price);
        //     dispatch(callReceiptHandlerActions.updateFinalBookingInformation({
        //         ...finalBookingInformation,
        //         distance: distance,
        //         duration: duration,
        //         price: formattedPrice,
        //     }))
    }

    // handle button click
    const handleForward = () => {
        dispatch(callReceiptHandlerActions.updateProcessSteps({
            ...processSteps,
            stepThree: true,
            stepTwo: false,
        }))
    }

    const handleBackward = () => {
        dispatch(callReceiptHandlerActions.updateProcessSteps({
            ...processSteps,
            stepOne: true,
            stepTwo: false,
        }))
    }


    // return JSX code

    // if the google map API is not finished
    if (!isLoaded) {
        return <></>
    }

    // if the google map API is finished
    return <div className={styles["wrapper"]}>
        <form className={styles["geolocation-form"]}>
            <div className={styles["form-heading"]}>
                <span className={styles["title"]}>
                    Thông tin địa điểm
                </span>
            </div>
            <div className={styles["form-body"]}>
                    <div className={styles["flex-container"]}>
                        <div className={styles["input"]}>
                            <label htmlFor="departure-address" style = {{display: "flex", gap: "1rem"}}>
                                <span className={styles["title"]}>
                                    <PickUpIcon style ={{fontSize: "2rem"}}/>
                                </span>
                                <span>
                                    Điểm đón
                                </span>
                            </label>
                            <PlacesAutocompleteInput inputStyle = "origin" role = "call-receipt-handler" defaultValue = {guestInformation?.origin}/>
                        </div>

                        <div className={styles["input"]}>
                            <label htmlFor="arrival-address" style = {{display: "flex", gap: "1rem"}}>
                                <span className={styles["title"]}>
                                <LocationIcon style ={{fontSize: "2rem"}}/>
                                </span>
                                <span>
                                Điểm đến
                                </span>
                            </label>
                            <PlacesAutocompleteInput inputStyle = "destination" role = "call-receipt-handler" defaultValue = {guestInformation?.destination}/>
                        </div>

                        <div className={styles["location-btn"]}>
                            <button  type = "button" onClick = {calculateRoute}>
                                Định vị
                            </button>
                        </div>

                    </div>

    {/* ----------------- Google Map box ----------------- */}
                <div className={styles["geo-map"]}>
                    {/* Display markers, or directions */}
                    <GoogleMap 
                    center = {HCMUS_LAT_LNG_CENTER} 
                    mapContainerStyle = {{width: '100%', height: '100%'}} 
                    zoom = {10} 
                    options = {mapOptions}
                    >
                        {directionsResponse && 
                            <>
                                <DirectionsRenderer directions = {directionsResponse} options = {polylineOptions}/>
                                <Marker 
                                position={{
                                    lat: directionsResponse.routes[0].legs[0].start_location.lat(),
                                    lng: directionsResponse.routes[0].legs[0].start_location.lng(),
                                }}
                                icon={markerOptions.originLocationIcon} 
                                onMouseOver={() => setHoveredMarker('origin')}
                                onMouseOut={() => setHoveredMarker('')}
                                >
                                    {/* show address when hovering */}
                                    {hoveredMarker === 'origin' && (
                                    <InfoWindow>
                                        <div>{directionsResponse.routes[0].legs[0].start_address}</div>
                                    </InfoWindow>
                                    )}
                                </Marker>

                                {/* destination marker icon */}
                                <Marker
                                position={{
                                    lat: directionsResponse.routes[0].legs[0].end_location.lat(),
                                    lng: directionsResponse.routes[0].legs[0].end_location.lng(),
                                    }}
                                icon={markerOptions.destinationLocationIcon}
                                onMouseOver={() => setHoveredMarker('destination')}
                                onMouseOut={() => setHoveredMarker('')}
                                >
                                    {/* show address when hovering */}
                                    {hoveredMarker === 'destination' && (
                                    <InfoWindow>
                                        <div>{directionsResponse.routes[0].legs[0].end_address}</div>
                                    </InfoWindow>
                                    )}
                                </Marker>
                            </>
                        }
                    </GoogleMap> 
                </div>
                <div className={styles["forward-btn"]}>
                    <button type = 'button'  onClick = {handleBackward}>
                        Quay lại
                    </button>
                    <button type = 'button' onClick = {handleForward}>
                        Tiếp tục
                    </button>
                </div>
            </div>
        </form>
    </div>
}

export default PlaceInfo;