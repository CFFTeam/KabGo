import styles from "./PlaceInfo.module.css";
import {ReactComponent as PickUpIcon} from '@assets/svg/CallReceipt/pick-up.svg';
import {ReactComponent as LocationIcon} from '@assets/svg/CallReceipt/location.svg';


const PlaceInfo: React.FC = () => {
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
                        <input name = "departure-address" placeholder = "Nhập địa chỉ đón..." type = "text" />
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
                        <input name = "arrival-address" placeholder = "Nhập địa chỉ đến..." type = "text"  />
                    </div>
                </div>
                <div className={styles["geo-map"]}>
                    
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