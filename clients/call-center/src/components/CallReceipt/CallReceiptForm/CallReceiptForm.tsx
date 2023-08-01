import styles from './CallReceiptForm.module.css';
import {ReactComponent as SunIcon} from "@assets/svg/CallReceipt/sun.svg";
import {ReactComponent as MoonIcon} from "@assets/svg/CallReceipt/moon.svg";


const CallReceiptForm: React.FC = () => {
    return <form className={styles["call-receipt-form"]}>
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
                    <input name = "guest-name" placeholder = "Nhập tên khách hàng" />
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
                    <input name = "guest-phone-number" placeholder = "Nhập số điện thoại"/>
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
                    <select name = "guest-booking-type">
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
                        <input placeholder = "HH" style = {{fontFamily: 'Montserrat', width: "6.5rem", borderRadius: "8px", border: "1px solid #ced4da", backgroundColor: '#e9ecef', height: "1rem", padding: "1.8rem", outline: 'none'}}>
                        </input>
                        <span style = {{fontWeight: 600, fontSize: "2.5rem"}}>
                            :
                        </span>
                        <input placeholder = "MM" style = {{fontFamily: 'Montserrat', width: "8rem", borderRadius: "8px", border: "1px solid #ced4da", backgroundColor: '#e9ecef', height: "1rem", padding: "1.8rem", outline: 'none'}}>
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
                    <input name = "pick-up-place" placeholder = "Nhập điểm đón" className = {styles["pick-up-place"]}/>
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
                    <input name = "arrival-place" placeholder = "Nhập điểm đến" className = {styles["arrival-place"]}/>
                </div>
                <div className = {`${styles.input} ${styles["stretched-all"]}`}>
                    <label htmlFor="guest-note" style = {{display: "flex", gap: "1rem"}}>
                        <span className={styles["title"]}>
                            Ghi chú 
                        </span>
                    </label>
                    <textarea name = "guest-note" placeholder = "Nhập ghi chú....." className = {styles["guest-note"]}/>
                </div>
            <div className={styles["forward-btn"]}>
                <button>
                    Chuyển tiếp
                </button>
            </div>
        </div>
        
    </form>
}

export default CallReceiptForm;