import styles from "./ConfirmInfo.module.css";

const ConfirmInfo: React.FC = () => {
    return <div className={styles["wrapper"]}>
         <form className={styles["call-receipt-form"]}>
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
                       <span className={styles["name_title"]}>
                            Họ tên:
                       </span> 
                       <span className={styles["name"]}>
                            Nguyễn Thoại Đăng Khoa
                       </span>
                    </div>
                    <div className={styles["guest_phone_number"]}>
                        <span className={styles["name_title"]}>
                            Số điện thoại:
                        </span> 
                        <span className={styles["name"]}>
                           0903861717
                        </span>
                    </div>
                    <div className={styles["guest_vehicle_booking_type"]}>
                        <span className={styles["name_title"]}>
                            Loại xe đặt:
                        </span> 
                        <span className={styles["name"]}>
                            Ô tô (7 - 9 chỗ)
                        </span>
                    </div>
                    <div className={styles["guest_note"]}>
                        <span className={styles["name_title"]}>
                            Ghi chú:
                        </span> 
                        <span className={styles["name"]}>
                            Hẻm nhỏ gần chung cư, đối diện Ủy Ban Nhân Dân Phường 24
                        </span>
                    </div>
                </div>
            <div className={styles["details_info_section-title"]}>
                <span className={styles["text"]}>
                   Chi tiết cuốc xe
                </span>
            </div>
         </form>
    </div>
}

export default ConfirmInfo;