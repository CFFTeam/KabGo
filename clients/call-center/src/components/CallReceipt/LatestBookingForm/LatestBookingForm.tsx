import styles from './LatestBookingForm.module.css';
import {ReactComponent as LocationIcon} from "@assets/svg/CallReceipt/location.svg";
import {ReactComponent as PickUpIcon} from "@assets/svg/CallReceipt/pick-up.svg";


const LatestBookingForm: React.FC = () => {
    return <form className={styles["latest-booking-form"]}>
        <div className = {styles["form-heading"]}>
            <span className={styles["title"]}>
                    Cuốc xe gần đây
            </span>
        </div>
        <table className={styles["table-list"]}>
            <thead className = {styles["table-heading"]}>
                <tr>
                    <th style = {{fontSize: "1.8rem"}}>Thời gian</th>
                    <th>
                        <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <span style = {{fontSize: "1.8rem"}}>
                                Điểm đón
                            </span>
                            <span className={styles["address-icn"]}>
                                <PickUpIcon style = {{fontSize: "2.4rem", marginLeft: "1rem", marginTop: "0.2rem"}}/>
                            </span>
                        </div>
                    </th>  
                    <th>
                        <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <span style = {{lineHeight: "1em", fontSize: "1.8rem"}}>
                                Điểm đến
                            </span>
                            <span className={styles["address-icn"]}>
                                <LocationIcon style = {{fontSize: "2.4rem", marginLeft: "1rem"}}/>
                            </span>
                        </div>
                    </th>  
                    <th style = {{fontSize: "1.8rem"}}>Loại xe đặt</th>
                </tr>
            </thead>
            
            <tbody>
                <tr style = {{backgroundColor: "#FBF9FA", cursor: "pointer"}}>
                    <td>07:30 - 21/7/2023</td>
                    <td>22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh</td>
                    <td>22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh</td>
                    <td>Ô tô (7-9 chỗ)</td>
                </tr>

                <tr style = {{backgroundColor: "#FBF9FA", cursor: "pointer"}}>
                    <td>07:30 - 21/7/2023</td>
                    <td>22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh</td>
                    <td>22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh</td>
                    <td>Ô tô (7-9 chỗ)</td>
                </tr>

                <tr style = {{backgroundColor: "#FBF9FA", cursor: "pointer"}}>
                    <td>07:30 - 21/7/2023</td>
                    <td>22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh</td>
                    <td>22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh</td>
                    <td>Xe máy (1 chỗ)</td>
                </tr>

                <tr style = {{backgroundColor: "#FBF9FA", cursor: "pointer"}}>
                    <td>07:30 - 21/7/2023</td>
                    <td>22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh</td>
                    <td>22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh</td>
                    <td>Xe tay ga (1 chỗ)</td>
                </tr>

                <tr style = {{backgroundColor: "#FBF9FA", cursor: "pointer"}}>
                    <td>07:30 - 21/7/2023</td>
                    <td>22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh</td>
                    <td>22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh</td>
                    <td>Ô tô (7-9 chỗ)</td>
                </tr>
                {/*
                <tr style = {{backgroundColor: "#FBF9FA", cursor: "pointer"}}>
                    <td>07:30 - 21/7/2023</td>
                    <td>22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh</td>
                    <td>22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh</td>
                    <td>O to (7-9 cho)</td>
                </tr>

                <tr style = {{backgroundColor: "#FBF9FA", cursor: "pointer"}}>
                    <td>07:30 - 21/7/2023</td>
                    <td>22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh</td>
                    <td>22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh</td>
                    <td>O to (7-9 cho)</td>
                </tr>

                <tr style = {{backgroundColor: "#FBF9FA", cursor: "pointer"}}>
                    <td>07:30 - 21/7/2023</td>
                    <td>22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh</td>
                    <td>22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh</td>
                    <td>O to (7-9 cho)</td>
                </tr> */}

            </tbody>
        </table>
    </form>
}

export default LatestBookingForm;