import styles from './CallReceiptPage.module.css';
import {ReactComponent as Logo} from '@assets/svg/CallReceipt/logo.svg';
import CallReceiptForm from "@components/CallReceipt/CallReceiptForm/CallReceiptForm";
import MostVisitedAddressForm from '@components/CallReceipt/MostVisitedAddressForm/MostVisitedAddressForm';
import LatestBookingForm from "@components/CallReceipt/LatestBookingForm/LatestBookingForm";

const CallReceiptPage: React.FC = () => {
    return <div className={styles["container"]}>
        <div className={styles["heading"]}>
            <span className={styles["title"]}>
                Powered by
            </span>
            <div className={styles["logo-section"]}>
                <Logo className={styles["logo"]}/>
            </div>
        </div>
        <div className={styles["body-content"]}>
            <div className={styles["call-receipt-and-most-visited-address"]}>
                <CallReceiptForm/>
                <MostVisitedAddressForm/>
            </div>
            <div className={styles["latest-booking"]}>
                <LatestBookingForm/>
            </div>
        </div>
    </div>
}

export default CallReceiptPage;