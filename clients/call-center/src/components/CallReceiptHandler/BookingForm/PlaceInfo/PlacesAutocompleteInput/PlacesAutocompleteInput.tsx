import styles from "./PlacesAutocompleteInput.module.css";
import { useState } from "react";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import { callReceiptHandlerActions } from "@store/reducers/callReceiptHandlerSlice";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";

interface PlacesAutocompleteProps {
    inputStyle: "origin" | "destination";
}

const PlacesAutocomplete = (props: PlacesAutocompleteProps) => {
    const dispatch = useAppDispatch();

    const handleSelect = async (address: any) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({address});
        const {lat, lng} = await getLatLng(results[0]);
        
        if (props.inputStyle === "origin")
        {
            dispatch(callReceiptHandlerActions.updateOriginGeolocation({
                lat: lat,
                lng: lng
            }))
            console.log('lat_origin: ', lat);
            console.log('lng_origin: ', lng);
        }
        
        else if (props.inputStyle === 'destination') {
            dispatch(callReceiptHandlerActions.updateDestinationGeolocation({
                lat: lat,
                lng: lng
            }))
            console.log('lat_destination: ', lat);
            console.log('lng_destination: ', lng);
        }



    };

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

    return <div className={styles["places-complete-input"]}>
        <input value = {value} disabled = {!ready} onChange={(e) => setValue(e.target.value)} type = "text" placeholder = {props.inputStyle === "origin" ? "Nhập địa chỉ đón..." : "Nhập địa chỉ đến..."} />
        {status === 'OK' && 
        <div className = {styles["suggestion-list"]}>
            {data.map(({place_id, description}, index) => (

            // <li style = {{listStyle: "none", backgroundColor: "red", fontSize: "1.5rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            // padding: "1rem", borderBottom: "1px solid black", cursor: "pointer"
            // }} 
            // key={place_id} value = {description} onClick={() => handleSelect(description)}>
            //     {description}
            // </li>

            <li className = {styles["suggestion-item"]}
            key={place_id} value = {description} onClick={() => handleSelect(description)}>
                {description}
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
