import React from "react";
import styles from "./driver.module.css";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { dashboardActions } from "@store/dashboard";
import Role from "./Role"
import TableContent from "./TableContent"
import { useEffect } from "react";
import axios from "axios";

const Driver: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <React.Fragment>
      <Role />
      <TableContent />
    </React.Fragment>
  );
};

export default Driver;
