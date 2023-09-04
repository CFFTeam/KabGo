import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Sidebar from "@components/Sidebar";
import styles from "./CallReceiptHandlerLayout.module.css";
import toast, { Toaster } from "react-hot-toast";

const CallReceiptHandlerLayout: React.FC = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className={styles["layout-division"]}>
        <Sidebar />
        <Outlet />
      </div>
      <Toaster position="top-right" />
    </React.Fragment>
  );
};

export default CallReceiptHandlerLayout;
