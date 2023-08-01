import styles from './LatestBookingForm.module.css';
import {ReactComponent as LocationIcon} from "@assets/svg/CallReceipt/location.svg";
import {ReactComponent as PickUpIcon} from "@assets/svg/CallReceipt/pick-up.svg";

interface LatestBookingData {
    bookingTime: String,
    departureAddress: String,
    arrivalAddress: String,
    vehicleType: String
}

const latestBookingData: LatestBookingData[] = [
    {
        bookingTime: "07:30 - 31/7/2023",
        departureAddress: "22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh",
        arrivalAddress: "22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh",
        vehicleType: "Ô tô (7-9 chỗ)"
    },
    {
        bookingTime: "07:30 - 31/7/2023",
        departureAddress: "22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh",
        arrivalAddress: "22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh",
        vehicleType: "Ô tô (2-4 chỗ)"
    },
    {
        bookingTime: "07:30 - 31/7/2023",
        departureAddress: "22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh",
        arrivalAddress: "22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh",
        vehicleType: "Xe máy (1 chỗ)"
    },
    {
        bookingTime: "07:30 - 31/7/2023",
        departureAddress: "22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh",
        arrivalAddress: "22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh",
        vehicleType: "Xe tay ga (1 chỗ)"
    },

    {
        bookingTime: "07:30 - 31/7/2023",
        departureAddress: "22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh",
        arrivalAddress: "22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh",
        vehicleType: "Ô tô (7-9 chỗ)"
    },
]


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
                {latestBookingData.map((el, index) => 
                    <tr style = {{backgroundColor: "#FBF9FA", cursor: "pointer"}} key = {index}>
                        <td>{el.bookingTime}</td>
                        <td>{el.departureAddress}</td>
                        <td>{el.arrivalAddress}</td>
                        <td>{el.vehicleType}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </form>
}

export default LatestBookingForm;