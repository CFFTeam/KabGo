import styles from "./PlaceInfo.module.css";
import { useState, useRef } from "react";
import {ReactComponent as PickUpIcon} from '@assets/svg/CallReceipt/pick-up.svg';
import {ReactComponent as LocationIcon} from '@assets/svg/CallReceipt/location.svg';
import { GoogleMap, Marker, Autocomplete, DirectionsRenderer, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import PlacesAutocomplete from "./PlacesAutocomplete/PlacesAutocomplete";

const center = {
    lat: 37.7749295,
    lng: -122.4194155
}

let originAutocomplete: any  = {};
let destinationAutocomplete: any  = {};


const google = window.google; 

const PlaceInfo: React.FC = () => {
    const [isMapLoaded, setIsMapsLoaded] = useState(false);

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
        libraries: ['places'],
        language: 'vi',
        region: 'vn',
    })

    

    const originRef = useRef<HTMLInputElement | null>(null);
    const destinationRef = useRef<HTMLInputElement | null>(null);

    const [origin, setOrigin] = useState<any>('');
    const [arrival, setArrival] = useState<any>('');

    const [originLatLng, setOriginLatLng] = useState<any>({});
    const [arrivalLatLng, setArrivalLatLng] = useState<any>({});

    const handleOriginPlaceChange = (place: any) => {
        if (place) {
            setOrigin(place.formatted_address);
            setOriginLatLng({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
                }
            );
        }
        
    };

    const handleArrivalPlaceChange = (place: any) => {
        if (place) {
            setArrival(place.formatted_address);
            setArrivalLatLng({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
                }
            );
        }
    };

    // Experimental section

    // const {
    //     ready, 
    //     value,
    //     setValue,
    //     suggestions: {status, data},
    //     clearSuggestions
    // } = usePlacesAutocomplete();
    
    // const handleSelect = (description: any) => {
    //     setValue(description, false);
    //     clearSuggestions();
    //   };
    
    // Experimental section
    
    
    

    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState<any>(null);
    const [distanctace, setDistance] = useState<any>('');
    const [duration, setDuration] = useState<any>('');

    const calculateRoute = async () => {
        console.log('origin-ref: ', originRef);
        console.log('destination-ref: ', destinationRef);
        console.log('originLatLng: ',originLatLng);
        console.log('arrivalLatLng: ', arrivalLatLng);

        setTimeout(async () => {
            if (originRef.current?.value === '' || destinationRef.current?.value === '') {
                return;
            }
            // eslint-disable-next-line no-undef
            const directionService = new google.maps.DirectionsService();
    
            const results  = await directionService.route({
                origin: originRef.current?.value as string,
                destination: destinationRef.current?.value as string,
                travelMode: google.maps.TravelMode.DRIVING
            })
    
            setDirectionsResponse(results);
            setDistance(results.routes[0].legs[0].distance?.text);
            setDuration(results.routes[0].legs[0].duration?.text);
        }, 3000);

    }

    const clearRoute = () => {
        setDirectionsResponse(null);
        setDistance('');
        setDuration('');
        if (originRef.current) {
            originRef.current.value = '';
        }
        if (destinationRef.current) {
            destinationRef.current.value = '';
        }
    }

    if (!isLoaded) {
        return <>Loading....</>
    }

    return <div className={styles["wrapper"]}>
    <form className={styles["call-receipt-form"]}>
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
                        {/* <Autocomplete onLoad={(autocomplete) => (originAutocomplete = autocomplete)} 
                        onPlaceChanged={() => handleOriginPlaceChange(originAutocomplete.getPlace())}>
                            <input ref = {originRef} name = "departure-address" placeholder = "Nhập địa chỉ đón..." type = "text" className = {styles["departure-address-inp"]}/>
                        </Autocomplete> */}

                        {/* <div className={styles["places-complete-input"]} style = {{backgroundColor: "black", position: "relative"}}>
                            <input style = {{width: "100%"}} value = {value} onChange={(e) => setValue(e.target.value)} type = "text" placeholder = "Nhập địa chỉ đón..." />
                            {status === 'OK' && 
                                    <div style = {{position: "absolute", zIndex: 99999, width: "100%"}}>
                                    {data.map(({place_id, description}, index) => (
                                    <li style = {{listStyle: "none", backgroundColor: "red", fontSize: "1.5rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                                    padding: "1rem", borderBottom: "1px solid black", cursor: "pointer"
                                    }} 
                                    key={place_id} value = {description} onClick={() => handleSelect(description)}>
                                        {description}
                                    </li>
                                    ))}
                                </div>
                            }            
                        </div>  */}

                        <PlacesAutocomplete/>

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
                        {/* eslint-disable-next-line no-undef */}
                        <Autocomplete onLoad={(autocomplete) => (destinationAutocomplete = autocomplete)}
                        onPlaceChanged={() => handleArrivalPlaceChange(destinationAutocomplete.getPlace())} >
                            <input ref = {destinationRef} name = "arrival-address" placeholder = "Nhập địa chỉ đến..." type = "text"  className = {styles["arrival-address-inp"]}/>
                        </Autocomplete>
                    </div>
                    <div className={styles[""]}>
                        <button className={styles[""]} onClick = {calculateRoute} type = "button">
                            Calculate route
                        </button>
                    </div>
                </div>
                {/* Google Map box */}
                <div className={styles["geo-map"]}>
                    {/* Display markers, or directions */}
                   <GoogleMap center = {center} mapContainerStyle = {{width: '100%', height: '100%'}} zoom = {15} 
                   options = {{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false
                }}>
                    <Marker position = {center} />
                    {directionsResponse && <DirectionsRenderer directions = {directionsResponse} />}
                    </GoogleMap> 
                </div>
            <div className={styles["forward-btn"]}>
                <button className={styles[""]}>
                    Quay lại
                </button>
                <button type = 'submit' >
                    Tiếp tục
                </button>
            </div>
        </div>
</form>
</div>
}

export default PlaceInfo;