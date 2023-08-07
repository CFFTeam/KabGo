import React from "react";
import styles from "./driver.module.css";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { dashboardActions } from "@store/dashboard";
import { useEffect } from "react";
import axios from "axios";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles["a"]}>
        aaaa
    </div>
  );
};

export default Dashboard;
