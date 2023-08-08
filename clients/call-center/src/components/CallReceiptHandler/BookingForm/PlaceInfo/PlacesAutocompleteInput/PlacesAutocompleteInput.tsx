import styles from "./PlacesAutocompleteInput.module.css";
import { useState } from "react";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import { callReceiptHandlerActions } from "@store/reducers/callReceiptHandlerSlice";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import {ReactComponent as LocationIcon} from "@assets/svg/CallReceipt/location.svg";

interface PlacesAutocompleteProps {
    inputStyle: "origin" | "destination";
}

const PlacesAutocomplete = (props: PlacesAutocompleteProps) => {
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

    const dispatch = useAppDispatch();
    const bookingAddress = useAppSelector((state) => state.callReceiptHandler.bookingAddress);

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
            dispatch(callReceiptHandlerActions.updateOriginGeolocation({
                lat: lat,
                lng: lng
            }))

            dispatch(callReceiptHandlerActions.updateBookingAddress({
                ...bookingAddress,
                origin: address
            }))
        }
        
        else if (props.inputStyle === 'destination') {
            dispatch(callReceiptHandlerActions.updateDestinationGeolocation({
                lat: lat,
                lng: lng
            }))

            dispatch(callReceiptHandlerActions.updateBookingAddress({
                ...bookingAddress,
                destination: address
            }))
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
        type = "text" placeholder = {props.inputStyle === "origin" ? "Nhập địa chỉ đón..." : "Nhập địa chỉ đến..."} 
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
