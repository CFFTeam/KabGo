import React from "react";
import styles from "../../assets/css/dashboard.module.css";
import Category from "./Category";
import Chart from"./Chart";
import Tasklist from "./Tasklist";
import TopKPI from "./TopKPI";
import BoardMeeting from "./BoardMeeting";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { dashboardActions } from "@store/dashboard";
import { useEffect } from "react";
import axios from "axios";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    //axios.get<datatype>(...)
    const statistics: number[] = [2.152, 1.135, 618, 83];
    dispatch(dashboardActions.updateCategoryData(statistics));
  }, []);

  return (
    <div className={styles["dashboard-container"]}>
      <Category />
      <div className={styles["middle-container"]}>
        <Chart />
        <Tasklist />
      </div>
      <div className={styles["last-container"]}>
        <TopKPI />
        <BoardMeeting />
      </div>
    </div>
  );
};

export default Dashboard;
