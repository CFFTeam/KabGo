import styles from "./ConfirmInfo.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {ReactComponent as PickUpIcon} from "@assets/svg/CallReceipt/pick-up.svg";
import {ReactComponent as LocationIcon} from "@assets/svg/CallReceipt/location.svg";
import {ReactComponent as ClockIcon} from "@assets/svg/CallReceiptHandler/clock-icn.svg";
import {ReactComponent as CheckedIcon} from "@assets/svg/CallReceiptHandler/chcked-icn.svg";
import { useAppSelector, useAppDispatch } from "@hooks/ReduxHooks";
import { callReceiptHandlerActions } from "@store/reducers/callReceiptHandlerSlice";
import Overlay from "@components/Overlay/Overlay";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";

const ConfirmInfo: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const processSteps = useAppSelector((state) => state.callReceiptHandler.processSteps);  
    const [isHandled, setIsHandled] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    // handle button clicking
    const handleBackward = () => {
        dispatch(callReceiptHandlerActions.updateProcessSteps({
            ...processSteps,
            stepTwo: true,
            stepThree: false,
        }));
    }

    const handleForward = () => { 
        setIsHandled(true);
        setTimeout(() => {
            setIsHandled(false);
            setIsFinished(true);
        }, 2500)
        // dispatch(callReceiptHandlerActions.updateProcessSteps({
        //     ...processSteps,
        //     stepThree: false,
        //     stepOne: true,
        // }));
    }

    const handleClosingOverlay = () => {
        setIsHandled(false);
        setIsFinished(false);
    }

    // const handleCo

    return <div className={styles["wrapper"]}>
         <form className={styles["confirm-form"]}>

            <div className={styles["form-heading"]}>
                    <span className={styles["title"]}>
                        Thông tin cuốc xe
                    </span>
            </div>

            <div className={styles["guest_info_section-title"]}>
                <span className={styles["text"]}>
                   Thông tin khách hàng
                </span>
            </div>

            <div className={styles["guest_info_section-content"]}>
                    <div className={styles["guest_name"]}>
                       <span className={styles["title"]}>
                            Họ tên:
                       </span> 
                       <span className={styles["text"]}>
                            Nguyễn Thoại Đăng Khoa
                       </span>
                    </div>
                    <div className={styles["guest_phone_number"]}>
                        <span className={styles["title"]}>
                            Số điện thoại:
                        </span> 
                        <span className={styles["text"]}>
                           0903861717
                        </span>
                    </div>
                    <div className={styles["guest_vehicle_booking_type"]}>
                        <span className={styles["title"]}>
                            Loại xe đặt:
                        </span> 
                        <span className={styles["text"]}>
                            Ô tô (7 - 9 chỗ)
                        </span>
                    </div>
                    <div className={styles["guest_note"]}>
                        <span className={styles["title"]}>
                            Ghi chú:
                        </span> 
                        <span className={styles["text"]}>
                            Hẻm nhỏ gần chung cư, đối diện Ủy Ban Nhân Dân Phường 24
                        </span>
                </div>
            </div>

            <div className={styles["details_info_section-title"]}>
                <span className={styles["text"]}>
                  Chi tiết cuốc xe
                </span>
            </div>

            <div className={styles["details_info_section-content"]}>
                <div className={styles["departure-address"]}>
                    <div className={styles["title"]}>
                        <span className={styles["departure-icon"]}>
                            <PickUpIcon style = {{fontSize: "2rem", marginTop: ".3rem"}}/>
                        </span>
                        <span className={styles["title"]}>
                            Điểm đón: 
                        </span>    
                    </div>
                    <span className={styles["text"]}>
                        125 Lý Thái Tổ, Q.10 , TP. Hồ Chí Minh
                    </span>
                </div>

                <div className={styles["arrival-address"]}>
                    <div className={styles["title"]}>
                        <span className={styles["arrival-icon"]}>
                            <LocationIcon style = {{fontSize: "2.2rem", marginTop: ".3rem"}}/>
                        </span>
                        <span className={styles["title"]}>
                            Điểm đến: 
                        </span>    
                    </div>
                    <span className={styles["text"]}>
                         45 Trần Hưng Đạo, Q.5, TP. Hồ Chí Minh
                    </span>
                </div>

                <div className={styles["scheduled-time"]}>
                    <div className={styles["title"]}>
                        <span className={styles["departure-icon"]}>
                            <ClockIcon style = {{fontSize: "2rem", marginTop: ".3rem"}}/>
                        </span>
                        <span className={styles["title"]}>
                           Thời gian đón dự kiến: 
                        </span>    
                    </div>
                    <span className={styles["text"]}>
                            09:30 AM - 10/3/2023
                    </span>
                </div>
            </div>

            <div className={styles["total_price-section"]}>
                    <div className={styles["title"]}>
                        Tổng tiền
                    </div>
                    <div className={styles["price-text"]}>
                        167.000đ
                    </div>
            </div>

            <div className={styles["btn-section"]}>
                <button type = 'button' onClick = {handleBackward}>
                    Quay lại
                </button>
                <button type = 'button' onClick = {handleForward}>
                    Điều phối 
                </button>
            </div>
         </form>

        {/* when clicking coordinate button => overlay appears */}
        {isHandled && 
            <>
                <Overlay onCloseOverlay={handleClosingOverlay}/>
                <div className={styles["loading-form"]}>
                    <div className={styles["content"]}>
                        <LoadingSpinner/>
                        <span className={styles["text"]}>
                            Đang xử lý, vui lòng chờ đợi...
                        </span>
                    </div>
                </div>
            </>
        }


        {isFinished && 
            <>
                <Overlay onCloseOverlay={handleClosingOverlay}/>
                <div className={styles["successful-form"]}>
                    <div className={styles["title"]}>
                        <span className={styles["icon"]}>
                            <CheckedIcon className={styles["checked-icon"]}/>
                        </span>
                        <span className={styles["text"]}>
                            Thành công
                        </span>
                    </div>
                    <div className={styles["content"]}>
                       <div className={styles["text"]}>
                       Hệ thống đã ghi nhận cuốc xe. Thông tin sẽ được chuyển đến các bác tài trong giây lát. Với cuốc xe có hẹn giờ, hệ thống sẽ tự động đặt khi đến giờ yêu cầu (có thể chỉnh sửa ở Dashboard)
                       </div>
                    </div>
                    <div className={styles["back-to-home-btn"]}>
                        <button type = "button" onClick = {() => navigate('/')}>
                            Trang chủ
                        </button>
                    </div>
                </div>
            </>
        }

      
    </div>  
}

export default ConfirmInfo;
