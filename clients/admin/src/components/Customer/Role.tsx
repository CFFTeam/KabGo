import React from "react";
import styles from "./customer.module.css";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { dashboardActions } from "@store/dashboard";
import { ReactComponent as Cus } from "@assets/svg/Customer/cus.svg";
import { ReactComponent as Reward } from "@assets/svg/Driver/reward.svg";
import { ReactComponent as Sub } from "@assets/svg/Driver/sub.svg";
import { ReactComponent as Export } from "@assets/svg/Admin/export.svg";
import { ReactComponent as Import } from "@assets/svg/Admin/import.svg";
import { ReactComponent as Add } from "@assets/svg/Admin/add.svg";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

const Role: React.FC = () => {
  const dispatch = useAppDispatch();
  const clickHandle = () => {
    navigate("/driver/create");
    toast.success('Tạo tài khoản thành công', {
      style: {
        border: '2px solid #28a745',
        padding: '10px',
      },
      duration: 3000
    });

  }
  const navigate = useNavigate();
  return (
    <div className={styles["header-container"]}>
      <div className={styles["manage-container"]}>
        <div className={`${styles["each-manage-container"]} ${styles["manage-background"]}`}>
          <Cus />
          <div className={styles["manage-header-content"]}>
            Customer Management
          </div>
        </div>
        <div className={styles["each-manage-container"]}>
          <Reward />
          <div className={styles["manage-header-content"]}>Rewards Management</div>
        </div>
        <div className={styles["each-manage-container"]}>
          <Sub />
          <div className={styles["manage-header-content"]}>Customer Subscription</div>
        </div>
      </div>
      <div className={styles["create-container"]}>
        <div className={styles["each-create-container"]}>
          <Export />
          <div className={styles["create-header-content"]}>Export</div>
        </div>
        <div className={styles["each-create-container"]}>
          <Import />
          <div className={styles["create-header-content"]}>Import</div>
        </div>
        <div className={styles["create-button-container"]} onClick={()=>{navigate("./create")}}>
          <Add />
          <div className={styles["create-button-header-content"]} >Thêm khách</div>
        </div>
      </div>
    </div>
  );
};

export default Role;
