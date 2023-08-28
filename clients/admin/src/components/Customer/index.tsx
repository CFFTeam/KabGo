import React from "react";
import styles from "./customer.module.css";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { dashboardActions } from "@store/dashboard";
import Role from "./Role"
import TableContent from "./TableContent"
import { useEffect } from "react";
import axios from "axios";

const Customer: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <React.Fragment>
      <Role />
      <TableContent />
    </React.Fragment>
  );
};

export default Customer;
