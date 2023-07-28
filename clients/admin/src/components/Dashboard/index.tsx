import React from "react";
import styles from "../../assets/css/dashboard.module.css";
import { ReactComponent as User } from "../../assets/svg/Dashboard/user.svg";
import { ReactComponent as Driver } from "../../assets/svg/Dashboard/driver.svg";
import { ReactComponent as Trip } from "../../assets/svg/Dashboard/trip.svg";
import { ReactComponent as CanceledTrip } from "../../assets/svg/Dashboard/canceledtrip.svg";
import Category from "./Category";


const Dashboard: React.FC = () => {
  return (
    <div className={styles["dashboard-container"]}>
      <Category />
    </div>
  );
};

export default Dashboard;
