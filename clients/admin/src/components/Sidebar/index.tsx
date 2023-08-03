import React from "react";
import styles from "../../assets/css/sidebar.module.css";
import { ReactComponent as Kabgo } from "../../assets/svg/Sidebar/kabgo.svg";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { sidebarActions } from "@store/sidebar";
import { NavLink } from "react-router-dom";
import {ReactComponent as Test} from "../../assets/svg/Sidebar/admin.svg"
const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const test: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}> = Test;
console.log(test);
  const mainMenuData = useAppSelector((state) => state.sidebar.mainMenuData);
  return (
    <div className={styles["sidebar-container"]}>
      <Kabgo className={styles["logo"]}/>
      <div className={styles["main-menu-title"]}>Main Menu</div>
      <div className={styles["main-menu-container"]}>
        {mainMenuData.map((data, index)=>(
          <NavLink to="/" className={styles["el-container"]} key={index}>
            <img src={data.img} className={styles["test"]}/>
          </NavLink>
        ))}
      </div>  
    </div>
  );
};

export default Sidebar;
