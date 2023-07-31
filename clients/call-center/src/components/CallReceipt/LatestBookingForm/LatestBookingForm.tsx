import styles from './LatestBookingForm.module.css';

const LatestBookingForm: React.FC = () => {
    return <table className={styles["latest-booking-form"]}>
        <div className = {styles["form-heading"]}>
        <span className={styles["title"]}>
                Cuốc xe gần đây
            </span>
        </div>
    </table>
}

export default LatestBookingForm;