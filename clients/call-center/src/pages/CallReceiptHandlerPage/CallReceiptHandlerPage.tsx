import styles from "./CallReceiptHandlerPage.module.css";
import CallReceiptTable from "@components/CallReceiptHandler/CallReceiptTable/CallReceiptTable";

const CallReceiptHandlerPage: React.FC = () => {
    return <div className={styles["main-content"]}>
        <span className={styles["title"]}>
            Xử lý điều phối
        </span>
        <CallReceiptTable/>
    </div>
}

export default CallReceiptHandlerPage;