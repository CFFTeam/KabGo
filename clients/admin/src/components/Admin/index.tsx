import React from "react";
import styles from "./admin.module.css";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { dashboardActions } from "@store/dashboard";
import Role from "./Role"
import TableContent from "./TableContent"
import { useEffect } from "react";
import axios from "axios";

const Admin: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <Role />
      <TableContent />
    </div>
  );
};

export default Admin;
