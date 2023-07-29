import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";
import styles from "../assets/css/layout.module.css";
import toast, { Toaster } from 'react-hot-toast';

const BaseLayout: React.FC = () => {
  return (
    <div className={styles["base-layout-container"]}>
      <Sidebar />
      <div className={styles["content-container"]}>
        <Navbar />
        <Outlet />
      </div>
      <Toaster position="top-right"/>
    </div>
  );
};

export default BaseLayout;
