import styles from './CallReceiptForm.module.css';
import {ReactComponent as SunIcon} from "@assets/svg/CallReceipt/sun.svg";
import {ReactComponent as MoonIcon} from "@assets/svg/CallReceipt/moon.svg";
import {useState, useRef} from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/ReduxHooks';
import {callReceiptActions} from "@store/reducers/callReceiptSlice";


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
    const dispatch = useAppDispatch();
    const bookingInformation = useAppSelector((state) => state.callReceipt.bookingInformation);
    // const mostVisitedAddress: string  = useAppSelector((state) => state.callReceipt.mostVisitedAddress);

    console.log("bookingInformation: ", bookingInformation);

    const nameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const vehicleTypeRef = useRef<HTMLSelectElement>(null);
    const scheduledBookingTime_HH_Ref = useRef<HTMLInputElement>(null);
    const scheduledBookingTime_MM_Ref = useRef<HTMLInputElement>(null);
    const departureAddressRef = useRef<HTMLInputElement>(null);
    const arrivalAddressRef = useRef<HTMLInputElement>(null);
    const noteRef = useRef<HTMLTextAreaElement>(null);

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData: BookingInformation = {
            name: nameRef.current?.value || '',
            phoneNumber: phoneNumberRef.current?.value || '',
            vehicleType: vehicleTypeRef.current?.value || '',
            scheduledBookingTime_HH: scheduledBookingTime_HH_Ref.current?.value || '',
            scheduledBookingTime_MM: scheduledBookingTime_MM_Ref.current?.value || '',
            departureAddress: departureAddressRef.current?.value || '',
            arrivalAddress: arrivalAddressRef.current?.value || '',
            note: noteRef.current?.value || '',
        }
        dispatch(callReceiptActions.updateBookingInformation(formData));
    }
    // helper functions - real-time tracking input value from user 
    const handleArrivalAddressInputChange = () => {
        if (arrivalAddressRef.current) {
            dispatch(callReceiptActions.updateBookingInformation({
                ...bookingInformation,
                arrivalAddress: arrivalAddressRef.current.value
            }));
        }
    }

    const handleDepartureAddressInputChange = () => {
        if (departureAddressRef.current) {
            dispatch(callReceiptActions.updateBookingInformation({
                ...bookingInformation,
                departureAddress: departureAddressRef.current.value
            }));
        }
    }


    return <form className={styles["call-receipt-form"]} onSubmit = {handleFormSubmit} >
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
                        <label htmlFor = "hidden-check-box" className={styles["day-night-toggle-btn"]} >
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
                    <input ref = {departureAddressRef} value = {bookingInformation.departureAddress} onChange = {handleDepartureAddressInputChange} type = "text" name = "pick-up-place" placeholder = "Nhập điểm đón" className = {styles["pick-up-place"]}/>
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
                    <input ref = {arrivalAddressRef} value = {bookingInformation.arrivalAddress} onChange = {handleArrivalAddressInputChange} type = "text" name = "arrival-place" placeholder = "Nhập điểm đến" className = {styles["arrival-place"]}/>
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