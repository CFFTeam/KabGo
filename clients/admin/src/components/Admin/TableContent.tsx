import React from "react";
import styles from "./admin.module.css";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { dashboardActions } from "@store/dashboard";

import { useEffect } from "react";
import axios from "axios";

const Admin: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles['table-content-container']}>
        aaa
    </div>
  );
};

export default Admin;
