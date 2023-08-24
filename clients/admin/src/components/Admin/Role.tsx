import React from "react";
import styles from "./admin.module.css";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { dashboardActions } from "@store/dashboard";
import { ReactComponent as Employee } from "@assets/svg/Admin/employee.svg";
import { ReactComponent as Task } from "@assets/svg/Admin/task.svg";
import { ReactComponent as Gantt } from "@assets/svg/Admin/gantt.svg";
import { ReactComponent as Export } from "@assets/svg/Admin/export.svg";
import { ReactComponent as Import } from "@assets/svg/Admin/import.svg";
import { ReactComponent as Add } from "@assets/svg/Admin/add.svg";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

const Role: React.FC = () => {
  const dispatch = useAppDispatch();
  const clickHandle = async () => {
    navigate("/admin/create");
    // await axios.get(`${process.env.REACT_APP_API_URI}/admin/get-data`)
    // .then(res => {
    //   console.log('bbbbb')
    // })

    
    // toast.success('Tạo tài khoản thành công', {
    //   style: {
    //     border: '2px solid #28a745',
    //     padding: '10px',
    //   },
    //   duration: 3000
    // });

  }
  const navigate = useNavigate();
  return (
    <div className={styles["header-container"]}>
      <div className={styles["manage-container"]}>
        <div className={`${styles["each-manage-container"]} ${styles["manage-background"]}`}>
          <Employee />
          <div className={styles["manage-header-content"]}>
            Employee Management
          </div>
        </div>
        <div className={styles["each-manage-container"]}>
          <Task />
          <div className={styles["manage-header-content"]}>Task Management</div>
        </div>
        <div className={styles["each-manage-container"]}>
          <Gantt />
          <div className={styles["manage-header-content"]}>Gantt Chart</div>
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
        <div className={styles["create-button-container"]} onClick={clickHandle}>
          <Add />
          <div className={styles["create-button-header-content"]} >Thêm quản lý</div>
        </div>
      </div>
    </div>
  );
};

export default Role;
