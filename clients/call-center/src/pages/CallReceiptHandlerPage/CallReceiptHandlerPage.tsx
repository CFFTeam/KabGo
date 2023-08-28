import styles from "./CallReceiptHandlerPage.module.css";
import CallReceiptTable from "@components/CallReceiptHandler/CallReceiptTable/CallReceiptTable";

const CallReceiptHandlerPage: React.FC = () => {
    return <div className={styles["main-content"]}>
        <CallReceiptTable/>
    </div>
}

export default CallReceiptHandlerPage;  