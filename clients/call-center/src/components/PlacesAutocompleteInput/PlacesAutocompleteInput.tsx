import styles from "./PlacesAutocompleteInput.module.css";
import { useEffect, useState } from "react";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import { callReceiptActions } from "@store/reducers/callReceiptSlice";
import { callReceiptHandlerActions } from "@store/reducers/callReceiptHandlerSlice";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import {ReactComponent as LocationIcon} from "@assets/svg/CallReceipt/location.svg";

interface PlacesAutocompleteProps {
    role: "call-receipt" | "call-receipt-handler";
    inputStyle: "origin" | "destination";
    defaultValue?: string;
}


const PlacesAutocomplete = (props: PlacesAutocompleteProps) => {
    const [placeHolderText, setPlaceHolderTextChange] = useState<string>('');
    // define usePlacesAutocomplete
    const {
        ready,
        value,
        setValue,
        suggestions: {
            status,
            data
        },
        clearSuggestions
    } = usePlacesAutocomplete();
    
    // define placeHolder text
    useEffect(() => {
        if (props.inputStyle === "origin") {
            if (props.defaultValue) {
                setPlaceHolderTextChange(props.defaultValue);
                setValue(props.defaultValue, false);
            } 
            else setPlaceHolderTextChange("Nhập địa chỉ đến...");
        }
        else {
            if (props.defaultValue) {
                setPlaceHolderTextChange(props.defaultValue);
                setValue(props.defaultValue, false);
            }
            else setPlaceHolderTextChange("Nhập địa chỉ đón...");
        }
    }, [props.defaultValue]);

    const dispatch = useAppDispatch();
    // call-receipt-handler role 
    const finalBookingInformation = useAppSelector((state) => state.callReceiptHandler.finalBookingInformation); 
    // call-receipt role
    const bookingInformation = useAppSelector((state) => state.callReceipt.bookingInformation);

    // used to track index of item in suggestions list
    const [activeIndex, setActiveIndex] = useState<number>(-1);

    // handle when clicking to list item (single address)
    const handleSelect = async (address: string) => {
        setValue(address, false); // set current address to user input
        clearSuggestions(); // clear suggestions list

        const results = await getGeocode({address});
        const {lat, lng} = await getLatLng(results[0]);

        if (props.inputStyle === "origin")
        {
            if (props.role === "call-receipt-handler") {

                dispatch(callReceiptHandlerActions.updateFinalBookingInformation({
                    ...finalBookingInformation,
                    originLatLng: {
                        lat: lat,
                        lng: lng
                    }
                }))
            }
            else if (props.role === "call-receipt") {
                dispatch(callReceiptActions.updateBookingInformation({
                    ...bookingInformation,
                    departureAddress: address,
                    originLatLng: {
                        lat: lat,
                        lng: lng
                    }
                }));
            }
        }
        
        else if (props.inputStyle === 'destination') {
            if (props.role === "call-receipt-handler") {
                dispatch(callReceiptHandlerActions.updateFinalBookingInformation({
                    ...finalBookingInformation,
                    destinationLatLng: {
                        lat: lat,
                        lng: lng,
                    }
                }))
            }

            else if (props.role === "call-receipt") {
                dispatch(callReceiptActions.updateBookingInformation({
                    ...bookingInformation,
                    arrivalAddress: address,
                    destinationLatLng: {
                        lat: lat,
                        lng: lng,
                    }
                }));
            }
        }
    };

    // handle when moving key down
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((prevIndex: number) => Math.min(prevIndex + 1, data.length - 1));
        }
        else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((prevIndex: number) => Math.max(prevIndex - 1, -1));
        }
        else if (event.key === "Enter") {
            event.preventDefault();
            const {place_id, description} = data[activeIndex];
            handleSelect(description);
        }
    }

    // handle when input is changed
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value, true);
        setActiveIndex(-1);
    }


    return <div className={styles["places-complete-input"]}>
        <input value = {value} disabled = {!ready} onChange = {handleInputChange} 
        type = "text" placeholder = {placeHolderText} 
        onKeyDown = {handleKeyPress}
        />
        {status === 'OK' && 
        <div className = {styles["suggestion-list"]}>
            {data.map(({place_id, description}, index) => (
            // <li className = {styles["suggestion-item"]}
            // key={place_id} value = {description} onClick={() => handleSelect(description)}>
            //     {description}
            // </li>
            <li className = {activeIndex === index ? `${styles["suggestion-item"]} ${styles["active"]}` : styles["suggestion-item"]} 
            key={place_id} 
            value = {description} 
            onClick={() => handleSelect(description)}
            >
                <span className={styles["location-icn"]}>
                    <LocationIcon/>
                </span>
                <span className={styles["description"]}>
                  {description}
                </span>
            </li>
        ))}
        </div>}            
    </div> 
}
export default PlacesAutocomplete;


// const [value, setValue] = useState<any>('');
    // let status = "OK";
    // let data = [
    //     {   
    //         place_id: '1',
    //         description: "22/16, Huỳnh Đình Hai, phường 24, Q.Bình Thạnh, TP.Hồ Chí Minh",
    //     },
    //     {   
    //         place_id: '2',
    //         description: "22/16, Huỳnh Đình Hai, phường 24, Q.Bình Thạnh, TP.Hồ Chí Minh",
    //     },
    //     {   
    //         place_id: '3',
    //         description: "22/16, Huỳnh Đình Hai, phường 24, Q.Bình Thạnh, TP.Hồ Chí Minh",
    //     },
    //     {   
    //         place_id: '4',
    //         description: "22/16, Huỳnh Đình Hai, phường 24, Q.Bình Thạnh, TP.Hồ Chí Minh",
    //     },
    //     {   
    //         place_id: '5',
    //         description: "22/16, Huỳnh Đình Hai, phường 24, Q.Bình Thạnh, TP.Hồ Chí Minh",
    //     }
    // ]
