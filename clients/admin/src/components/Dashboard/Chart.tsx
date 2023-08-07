import React from "react";
import styles from "./dashboard.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from "react-hot-toast";
import { ReactComponent as Info } from "../../assets/svg/Dashboard/info.svg";
import { ReactComponent as RevenueSignature } from "../../assets/svg/Dashboard/revenuesign.svg";

import LineGraph from "./LineGraph";
import { dashboardActions } from "@store/dashboard";
import { useEffect } from "react";

const Chart: React.FC = () => {
  const dispatch = useAppDispatch();
  const chartData = useAppSelector((state) => state.dashboard.chartData);
  let sumRevenue: string = chartData.yLabels
    .reduce((partialSum, a) => partialSum + a, 0)
    .toLocaleString("it-IT", { style: "currency", currency: "VND" });
  sumRevenue = sumRevenue.slice(0, sumRevenue.length - 3);
  const getRevenue = [1000000, 4000000, 1000000, 12000000, 6000000, 8000000, 1000000];
  // const getRevenue = [1200000, 5000000, 100000, 1260000, 100000, 900000, 4500000];
  useEffect(() => {
    dispatch(dashboardActions.updateRevenue(getRevenue));
  }, []);

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
          <div className={styles["revenue"]}>{sumRevenue}</div>
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

export default Chart;
