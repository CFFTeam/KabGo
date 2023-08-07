import React from "react";
import styles from "./createAdmin.module.css";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { dashboardActions } from "@store/dashboard";
import { useEffect } from "react";
import axios from "axios";

const CreateAdmin: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles["a"]}>
        aaaa
    </div>
  );
};

export default CreateAdmin;
