import React from "react";
import styles from "../../assets/css/dashboard.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from 'react-hot-toast';

const BoardMeeting: React.FC = () => {
//   const categoryData = useAppSelector((state) => state.dashboard.categoryData);

  return (
    <div className={styles["boardmeeting-container"]}>
        aaa
    </div>
  );
};

export default BoardMeeting;
