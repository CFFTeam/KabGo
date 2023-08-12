import styles from "./BookingPage.module.css";
import GuestInfo from "@components/CallReceiptHandler/BookingForm/GuestInfo/GuestInfo";
import PlaceInfo from "@components/CallReceiptHandler/BookingForm/PlaceInfo/PlaceInfo"; 
import ConfirmInfo from "@components/CallReceiptHandler/BookingForm/ConfirmInfo/ConfirmInfo";
import { useAppSelector } from "@hooks/ReduxHooks";

const BookingPage: React.FC = () => {
    const processSteps = useAppSelector((state) => state.callReceiptHandler.processSteps);
    return <div className={styles["main-content"]}>
        {processSteps.stepOne && <GuestInfo/>}
        {processSteps.stepTwo &&  <PlaceInfo/>}   
        {processSteps.stepThree && <ConfirmInfo/>}
        <br />
        <br />
        <br />
        <br />
    </div>
}

export default BookingPage;