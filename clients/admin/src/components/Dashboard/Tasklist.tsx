import React from "react";
import styles from "../../assets/css/dashboard.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from "react-hot-toast";
import { ReactComponent as Tick } from "../../assets/svg/Dashboard/tick.svg";
import { ReactComponent as Calendar } from "../../assets/svg/Dashboard/calendar.svg";

const Tasklist: React.FC = () => {
  const tasklistData = useAppSelector((state) => state.dashboard.tasklistData);
  return (
    <div className={styles["tasklist-container"]}>
      <div className={styles["title-tasklist"]}>TASK LIST</div>
      <div className={styles["number-tasks"]}>4 tasks</div>
      <div className={styles["tasks-container"]}>
        {tasklistData.map((data, index) => (
          <div className={styles["tasks"]}>
            <img src={data.img} />
            <div className={styles["content"]}>
              <div className={styles["content-title"]}>
                <div className={styles["content-title-text"]}>{data.name}</div>
                <Tick className={styles["tick"]}/>
              </div>
              <div className={styles["time-title"]}>
                <Calendar />
                <div className={styles["time-title-text"]}>{data.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasklist;
