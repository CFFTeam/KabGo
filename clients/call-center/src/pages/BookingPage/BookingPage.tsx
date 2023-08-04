import styles from "./BookingPage.module.css";
import GuestInfo from "@components/CallReceiptHandler/BookingForm/GuestInfo/GuestInfo";
import PlaceInfo from "@components/CallReceiptHandler/BookingForm/PlaceInfo/PlaceInfo"; 
import ConfirmInfo from "@components/CallReceiptHandler/BookingForm/ConfirmInfo/ConfirmInfo";

const BookingPage: React.FC = () => {
    return <div className={styles["main-content"]}>
        {/* <span className={styles["title"]}>
            Thông tin đặt xe
        </span> */}
        {/* <GuestInfo/> */}
        {/* <PlaceInfo/> */}
        <ConfirmInfo/>
        <br />
        <br />
        <br />
        <br />
      {/* <CallReceiptTable/> */}
    </div>
}

export default BookingPage;