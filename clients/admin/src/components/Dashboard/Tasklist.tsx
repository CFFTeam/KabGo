import React from "react";
import styles from "../../assets/css/dashboard.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from "react-hot-toast";
import { ReactComponent as Untick } from "../../assets/svg/Dashboard/untick.svg";
import { ReactComponent as Tick } from "../../assets/svg/Dashboard/tick.svg";
import { ReactComponent as Calendar } from "../../assets/svg/Dashboard/calendar.svg";
import { dashboardActions } from "@store/dashboard";

const Tasklist: React.FC = () => {
  const tasklistData = useAppSelector((state) => state.dashboard.tasklistData);
  const dispatch = useAppDispatch();

  const onChangeClickState = (index: number) => {
    dispatch(dashboardActions.updateTasklistData(index));
  }

  return (
    <div className={styles["tasklist-container"]}>
      <div className={styles["title-tasklist"]}>TASK LIST</div>
      <div className={styles["number-tasks"]}>{tasklistData.numberOfTasks} tasks</div>
      <div className={styles["tasks-container"]}>
        {tasklistData.tasklistChild.map((data, index) => (
          <div className={styles["tasks"]} key={index}>
            <img src={data.img} />
            <div className={styles["content"]}>
              <div className={styles["content-title"]}>
                <div className={styles["content-title-text"]}>{data.name}</div>
                {data.check? (
                  <Tick className={styles["tasklist-tick"]} onClick={() => onChangeClickState(index)}/>
                ) : (
                  <Untick className={styles["tasklist-untick"]} onClick={() => onChangeClickState(index)}/>
                )}
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
