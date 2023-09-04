import React from "react";
import styles from "./DashboardPage.module.css";
import Login from "@components/Login/index";
import toast, { Toaster } from 'react-hot-toast';

const DashboardPage: React.FC = () => {
  return (
    <React.Fragment>
      <Login />
      <Toaster position="top-right" />
    </React.Fragment>
  );
};

export default DashboardPage;
