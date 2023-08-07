import React from "react";
import styles from "./dashboard.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from "react-hot-toast";
import { ReactComponent as InfoBoardMeeting } from "../../assets/svg/Dashboard/infoboardmeeting.svg";
import { ReactComponent as BoardMeetingActive } from "../../assets/svg/Dashboard/boardmeetingactive.svg";

const BoardMeeting: React.FC = () => {
  //   const categoryData = useAppSelector((state) => state.dashboard.categoryData);

  return (
    <div className={styles["boardmeeting-container"]}>
      <div className={styles["boardmeeting-title-container"]}>
        <div className={styles["boardmeeting-title"]}>BOARD MEETING</div>
        <InfoBoardMeeting />
      </div>
      <div className={styles["boardmeeting-time"]}>
        <span className={styles["boardmeeting-time-bold"]}>8h30 AM </span> - T.6
        Ngày 14 tháng 07
      </div>
      <div className={styles["boardmeeting-active"]}>
        <BoardMeetingActive />
      </div>
      <div className={styles["boardmeeting-content"]}>
        Bạn được mời tham dự buổi họp hội đồng sắp đến qua Google Meet.
      </div>
    </div>
  );
};

export default BoardMeeting;
