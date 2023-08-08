import styles from "./GuestInfo.module.css";
import {ReactComponent as SunIcon} from "@assets/svg/CallReceipt/sun.svg";
import {ReactComponent as MoonIcon} from "@assets/svg/CallReceipt/moon.svg";
import {useState, useRef} from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/ReduxHooks';
import {callReceiptHandlerActions} from "@store/reducers/callReceiptHandlerSlice";

const GuestInfo: React.FC = () => {
    const dispatch = useAppDispatch();
    const processSteps = useAppSelector((state) => state.callReceiptHandler.processSteps);

    const nameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const vehicleTypeRef = useRef<HTMLSelectElement>(null);
    const scheduledBookingTime_HH_Ref = useRef<HTMLInputElement>(null);
    const scheduledBookingTime_MM_Ref = useRef<HTMLInputElement>(null);
    const departureAddressRef = useRef<HTMLInputElement>(null);
    const arrivalAddressRef = useRef<HTMLInputElement>(null);
    const noteRef = useRef<HTMLTextAreaElement>(null);

    const handleForward = () => {
        dispatch(callReceiptHandlerActions.updateProcessSteps({
            ...processSteps,
            stepOne: false,
            stepTwo: true,
        }));
    }
     
    return <div className={styles["wrapper"]}>
        <form className={styles["call-receipt-form"]}>
            <div className={styles["form-heading"]}>
                <span className={styles["title"]}>
                    Thông tin khách hàng
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
                                Thời gian khách đặt xe
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
                    <div className = {`${styles.input} ${styles["stretched-all"]}`}>
                        <label htmlFor="guest-note" style = {{display: "flex", gap: "1rem"}}>
                            <span className={styles["title"]}>
                                Ghi chú 
                            </span>
                        </label>
                        <textarea ref = {noteRef} name = "guest-note" placeholder = "Nhập ghi chú....." className = {styles["guest-note"]}/>
                    </div>
                <div className={styles["forward-btn"]}>
                    <button type = 'submit' onClick = {handleForward}>
                        Tiếp tục
                    </button>
                </div>
            </div>
    </form>
</div>
    
}

export default GuestInfo;