import styles from "./BookingPage.module.css";
import GuestInfo from "@components/CallReceiptHandler/BookingForm/GuestInfo/GuestInfo";

const BookingPage: React.FC = () => {
    return <div className={styles["main-content"]}>
        <span className={styles["title"]}>
            Thông tin đặt xe
        </span>
        <GuestInfo/>
        <br />
        <br />
        <br />
        <br />
      {/* <CallReceiptTable/> */}
    </div>
}

export default BookingPage;