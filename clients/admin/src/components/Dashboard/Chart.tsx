import React from "react";
import styles from "./dashboard.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from "react-hot-toast";
import { ReactComponent as Info } from "../../assets/svg/Dashboard/info.svg";
import { ReactComponent as RevenueSignature } from "../../assets/svg/Dashboard/revenuesign.svg";

import LineGraph from "./LineGraph";

const ChartComponent: React.FC = () => {
  //   const categoryData = useAppSelector((state) => state.dashboard.categoryData);

  return (
    <div className={styles["chart-container"]}>
      <div className={styles["chart-title"]}>
        <div className={`${styles["el-title"]} ${styles["under-el-title"]}`}>
          Doanh thu
        </div>
        <div className={styles["el-title"]}>Time line</div>
        <div className={styles["el-title"]}>Giờ làm</div>
      </div>
      <div className={styles["chart-content"]}> 
        <div className={styles["total-revenue"]}>
          <div className={styles["title-info"]}>
            <div className={styles["title"]}>TỔNG DOANH THU HÀNG THÁNG</div>
            <Info />
          </div>
          <div className={styles["revenue"]}>30.453.000</div>
          <div className={styles["currency"]}>VNĐ</div>
        </div>
        <div className={styles["chart-revenue"]}>
          <LineGraph />
          <RevenueSignature className={styles["revenue-sign"]} />
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
