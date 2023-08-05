import styles from "./PlacesAutocomplete.module.css";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";

const PlacesAutocomplete = ({}) => {
    const handleSelect = (description: any) => {
        setValue(description, false);
        clearSuggestions();
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

    return <div className={styles["places-complete-input"]} style = {{backgroundColor: "black", position: "relative"}}>
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
    </div> 
}

export default PlacesAutocomplete;