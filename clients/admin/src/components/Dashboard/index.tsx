import React from "react";
import styles from "./dashboard.module.css";
import Category from "./Category";
import Chart from "./Chart";
import Tasklist from "./Tasklist";
import TopKPI from "./TopKPI";
import BoardMeeting from "./BoardMeeting";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { dashboardActions } from "@store/dashboard";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    //axios.get<datatype>(...)
    axios
      .get(`${process.env.REACT_APP_API_URI}/dashboard`)
      .then((res) => {
        const statistics: number[] = [
          res.data.data.allCustomers.length,
          res.data.data.allDrivers.length,
          618,
          83,
        ];
        dispatch(dashboardActions.updateCategoryData(statistics));
      })
      .catch((err) => {
        console.log(err);
      });
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
