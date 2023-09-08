import styles from './CallReceiptForm.module.css';
import {ReactComponent as SunIcon} from "@assets/svg/CallReceipt/sun.svg";
import {ReactComponent as MoonIcon} from "@assets/svg/CallReceipt/moon.svg";
import {useState, useRef} from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/ReduxHooks';
import {callReceiptActions} from "@store/reducers/callReceiptSlice";
import { GoogleMap, Marker, Autocomplete, DirectionsRenderer, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import PlacesAutocomplete from '@components/PlacesAutocompleteInput/PlacesAutocompleteInput';
import useAxios from '../../../hooks/useAxios';
import axiosClient from '@utils/axiosClient';


interface BookingInformation {
    name: string,
    phoneNumber: string,
    vehicleType: string,
    scheduledBookingTime_HH: string,
    scheduledBookingTime_MM: string,
    departureAddress: string,
    arrivalAddress: string,
    note: string,
}


const CallReceiptForm: React.FC = () => {  
    // calling Google map API service
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
        libraries: ['places'],
        language: 'vi',
        region: 'vn',
    })

    const [isAM, setIsAm] = useState(true);
    const dispatch = useAppDispatch();
    const bookingInformation = useAppSelector((state) => state.callReceipt.bookingInformation);
    // const mostVisitedAddress: string  = useAppSelector((state) => state.callReceipt.mostVisitedAddress);

    const nameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const vehicleTypeRef = useRef<HTMLSelectElement>(null);
    const scheduledBookingTime_HH_Ref = useRef<HTMLInputElement>(null);
    const scheduledBookingTime_MM_Ref = useRef<HTMLInputElement>(null);
    const noteRef = useRef<HTMLTextAreaElement>(null);

    const toggleTime = () => {
        setIsAm(!isAM);
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // const formData: BookingInformation = {
        //     name: nameRef.current?.value || '',
        //     phoneNumber: phoneNumberRef.current?.value || '',
        //     vehicleType: vehicleTypeRef.current?.value || '',
        //     scheduledBookingTime_HH: scheduledBookingTime_HH_Ref.current?.value || '',
        //     scheduledBookingTime_MM: scheduledBookingTime_MM_Ref.current?.value || '',
        //     departureAddress: bookingInformation.departureAddress || '', // must not be empty (set from PlacesAutocompleteInput)
        //     arrivalAddress: bookingInformation.arrivalAddress || '',  // must not be empty (set from PlacesAutocompleteInput)
        //     note: noteRef.current?.value || '',
        // }
        // dispatch(callReceiptActions.updateBookingInformation(formData));
        // send data to back-end api call-center-s1
        try {
            console.log('handle submit form');
            const date = new Date() ;
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            const bookingTime = `${scheduledBookingTime_HH_Ref.current?.value}:${scheduledBookingTime_MM_Ref.current?.value} ${isAM ? "AM" : 
        "PM"} - ${formattedDate}`;
            const formData = {
                // customer_name: nameRef.current?.value || '',
                // customer_phonenumber: phoneNumberRef.current?.value || '',
                // vehicle_type: vehicleTypeRef.current?.value || '',  
                // origin: bookingInformation.departureAddress || '',
                // destination: bookingInformation.arrivalAddress || '',
                // note: noteRef.current?.value || '',
                // state: "Chờ xử lý",
                // origin_latlng: bookingInformation.originLatLng,
                // destination_latlng: bookingInformation.destinationLatLng,
                // time: bookingTime,
                // local_time: new Date(date.getTime() + (7 * 60 * 60 * 1000)).toISOString()
            
                customer_name: 'Khoa Nguyễn',
                customer_phonenumber: '0903861515',
                vehicle_type: "Ô tô (2-4 chỗ)",
                origin: "Chung cư 24/16 Võ Oanh (Chung cư C1 cũ), Võ Oanh, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh",
                destination: "Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM, Đường Nguyễn Văn Cừ, phường 4, Quận 5, Thành phố Hồ Chí Minh",
                note: "Gần chung ủy ban nhân dân phường 25",
                state: "Chờ xử lý",
                origin_latlng: {
                    lat: 10.8441125, 
                    lng: 106.7407742
                },
                destination_latlng: {
                    lat: 10.7628356, 
                    lng: 106.6824824
                },
                time: "12:30 PM - 01/09/2023",
                local_time: new Date(date.getTime() + (7 * 60 * 60 * 1000)).toISOString()
            }
            // call axios service
            const response = await axiosClient.post(`${process.env.REACT_APP_API_URI_S1}/v1/locating/call-receipt` as string, formData);
            console.log('response: ', response);
        } catch (error) {
            console.log(error);

        }
    }

    // return JSX code
    // if the google map API is not finished
    if (!isLoaded) {
        return <></>
    }

    // if the google map API is finished
    return <form className={styles["call-receipt-form"]} onSubmit = {handleFormSubmit} action = "">
        <div className={styles["form-heading"]}>
            <span className={styles["title"]}>
                Tiếp nhận cuộc gọi
            </span>
        </div>
        <div className={styles["form-body"]}>
                <div className={styles["input"]}>
                    <label htmlFor="guest-name" style = {{display: "flex", gap: "1rem"}}>
                        <span className={styles["title"]}>
                            Tên khách hàng 
                        </span>
                        <span style = {{color: 'red', fontWeight: 600}}>
                            (*)
                        </span>
                    </label>
                    <input name = "guest-name" placeholder = "Nhập tên khách hàng" type = "text" ref = {nameRef} />
                </div>
                <div className={styles["input"]}>
                    <label htmlFor="guest-phone-number" style = {{display: "flex", gap: "1rem"}}>
                        <span className={styles["title"]}>
                            Số điện thoại 
                        </span>
                        <span style = {{color: 'red', fontWeight: 600}}>
                            (*)
                        </span>
                    </label>
                    <input name = "guest-phone-number" placeholder = "Nhập số điện thoại" type = "text" ref = {phoneNumberRef} />
                </div>
                <div className={styles["input"]}>
                    <label htmlFor="guest-booking-type" style = {{display: "flex", gap: "1rem"}}>
                        <span className={styles["title"]}>
                            Loại xe
                        </span>
                        <span style = {{color: 'red', fontWeight: 600}}>
                            (*)
                        </span>
                    </label>
                    <select name = "guest-booking-type" ref = {vehicleTypeRef} >
                        <option value = "Chọn loại xe" disabled selected>Chọn loại xe</option>
                        <option value = "Xe máy">Xe máy</option>
                        <option value = "Xe tay ga">Xe tay ga</option>
                        <option value = "Ô tô (2-4) chỗ">Ô tô (2-4) chỗ</option>
                        <option value = "Ô tô (7-9) chỗ">Ô tô (7-9) chỗ</option>
                    </select>
                </div>
                <div className={styles["input"]}>
                    <label htmlFor="guest-scheduled-call" style = {{display: "flex", gap: "1rem"}}>
                        <span className={styles["title"]}>
                            Hẹn giờ (chỉ dành cho KH VIP)
                        </span>
                    </label>
                    <div className = {styles["pick-up-time"]} style = {{display: 'flex', gap: "1rem"}}>
                        <input ref = {scheduledBookingTime_HH_Ref} type = "text" placeholder = "HH" style = {{fontFamily: 'Montserrat', width: "6.5rem", borderRadius: "8px", border: "1px solid #ced4da", backgroundColor: '#e9ecef', height: "1rem", padding: "1.8rem", outline: 'none'}}>
                        </input>
                        <span style = {{fontWeight: 600, fontSize: "2.5rem"}}>
                            :
                        </span>
                        <input ref = {scheduledBookingTime_MM_Ref} type = "text" placeholder = "MM" style = {{fontFamily: 'Montserrat', width: "8rem", borderRadius: "8px", border: "1px solid #ced4da", backgroundColor: '#e9ecef', height: "1rem", padding: "1.8rem", outline: 'none'}}>
                        </input>

                        <input id = "hidden-check-box" className="hidden-check-box" type = "checkbox" hidden>
                        </input>
                        <label htmlFor = "hidden-check-box" className={styles["day-night-toggle-btn"]} onClick = {toggleTime}>
                            <span className={styles["circle"]}>
                            </span>
                           <SunIcon className = {styles["sun-icon"]}/>
                           <MoonIcon className = {styles["moon-icon"]}/>
                        </label>
                    </div>
                    
                </div>
                <div className={styles["input"]}>
                    <label htmlFor="pick-up-place" style = {{display: "flex", gap: "1rem"}}>
                        <span className={styles["title"]}>
                            Điểm đón 
                        </span>
                        <span style = {{color: 'red', fontWeight: 600}}>
                            (*)
                        </span>
                    </label>
                    <PlacesAutocomplete inputStyle = "origin" role = "call-receipt"/>
                </div>
                <div className={styles["input"]}>
                    <label htmlFor="arrival-place" style = {{display: "flex", gap: "1rem"}}>
                        <span className={styles["title"]}>
                            Điểm đến 
                        </span>
                        <span style = {{color: 'red', fontWeight: 600}}>
                            (*)
                        </span>
                    </label>
                    <PlacesAutocomplete inputStyle = "destination" role = "call-receipt"/>
                    {/* <input ref = {arrivalAddressRef} value = {bookingInformation.arrivalAddress} onChange = {handleArrivalAddressInputChange} type = "text" name = "arrival-place" placeholder = "Nhập điểm đến" className = {styles["arrival-place"]}/> */}
                </div>
                <div className = {`${styles.input} ${styles["stretched-all"]}`}>
                    <label htmlFor="guest-note" style = {{display: "flex", gap: "1rem"}}>
                        <span className={styles["title"]}>
                            Ghi chú 
                        </span>
                    </label>
                    <textarea ref = {noteRef} name = "guest-note" placeholder = "Nhập ghi chú....." className = {styles["guest-note"]}/>
                </div>
            <div className={styles["forward-btn"]}>
                <button type = 'submit' >
                    Chuyển tiếp
                </button>
            </div>
        </div>
        
    </form>
}

export default CallReceiptForm;


/// ----------------------------------------------------------------
// customer_name: 'Khoa Nguyễn',
// customer_phonenumber: '0903861515',
// vehicle_type: "Ô tô (2-4 chỗ)",
// origin: "Chung cư 24/16 Võ Oanh (Chung cư C1 cũ), Võ Oanh, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh",
// destination: "Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM, Đường Nguyễn Văn Cừ, phường 4, Quận 5, Thành phố Hồ Chí Minh",
// note: "Gần chung ủy ban nhân dân phường 25",
// time: "12:30 PM - 26/8/2023",
// state: "Chờ xử lý",
// origin_latlng: {
//     lat: 10.8441125, 
//     lng: 106.7407742
// },
// destination_latlng: {
//     lat: 10.7628356, 
//     lng: 106.6824824
// }