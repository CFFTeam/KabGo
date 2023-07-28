import React from "react";
import styles from "./MostVisitedAddressForm.module.css";

const MostVisitedAddressForm: React.FC = () => {
    return <form className={styles["most-visited-address-form"]}>
        <div className={styles["form-heading"]}>
            <span className={styles["title"]}>
                Địa chỉ đi nhiều nhất
            </span>
        </div>
    </form>
}

export default MostVisitedAddressForm;