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
  const isDoneChartData = useAppSelector(
    (state) => state.dashboard.isDoneCategoryData
  );
  let sumRevenue: string = chartData.yLabels
    .reduce((partialSum, a) => partialSum + a, 0)
    .toLocaleString("it-IT", { style: "currency", currency: "VND" });
  sumRevenue = sumRevenue.slice(0, sumRevenue.length - 3);

  return (
    <div className={styles["chart-container"]}>
      <div className={styles["chart-title"]}>
        <div className={`${styles["el-title"]} ${styles["under-el-title"]}`}>
          Doanh thu
        </div>
        <div className={styles["el-title"]}>Time line</div>
        <div className={styles["el-title"]}>Giờ làm</div>
      </div>
      {!isDoneChartData ? (
        <div className={styles["chart-content-loading"]}>
          {" "}
          <BeatLoader
            color="#F86C1D"
            margin={2}
            size={12}
            speedMultiplier={0.5}
          />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Chart;
