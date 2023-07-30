import React from "react";
import styles from "../../assets/css/dashboard.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from "react-hot-toast";

const TopKPI: React.FC = () => {
  const topKpiData = useAppSelector((state) => state.dashboard.topKpiData);

  return (
    <div className={styles["topkpi-container"]}>
      <div className={styles["topkpi-title"]}>TOP 3 NHÂN VIÊN KPI CAO NHẤT</div>
      <div className={styles["topkpi-content-container"]}>
        {topKpiData.map((data, index) => (
          <div className={styles["topkpi-content"]} key={index}>
            <img src={data.img} />
            <div className={styles["topkpi-name-role-container"]}>
              <div className={styles["topkpi-name"]}>{data.name}</div>
              <div className={styles["topkpi-role"]}>{data.role}</div>
            </div>
            <img src={data.medal} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopKPI;
