import React from "react";
import styles from "../../assets/css/dashboard.module.css";
import { ReactComponent as User } from "../../assets/svg/Dashboard/user.svg";
import { ReactComponent as Driver } from "../../assets/svg/Dashboard/driver.svg";
import { ReactComponent as Trip } from "../../assets/svg/Dashboard/trip.svg";
import { ReactComponent as CanceledTrip } from "../../assets/svg/Dashboard/canceledtrip.svg";

const Dashboard: React.FC = () => {
  return (
    <div className={styles["dashboard-container"]}>
      <div className={styles["category-container"]}>

        <div className={styles["category"]}>
          <div className={styles["category-info"]}>
            <div className={styles["category-name"]}>2.152</div>
            <div className={styles["category-role"]}>Người dùng</div>
          </div>
          <div className={styles["category-img"]}>
            <User />
          </div>
        </div>

        <div className={styles["category"]}></div>
        <div className={styles["category"]}></div>
        <div className={styles["category"]}></div>
      </div>
    </div>
  );
};

export default Dashboard;
