import styles from './CallReceiptForm.module.css';

const CallReceiptForm: React.FC = () => {
    return <form className={styles["call-receipt-form"]}>
        <div className={styles["form-heading"]}>
            <span className={styles["title"]}>
                Tiếp nhận cuộc gọi
            </span>
        </div>
    </form>
}

export default CallReceiptForm;