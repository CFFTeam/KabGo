import React from "react";
import styles from "../../assets/css/sidebar.module.css";
import { ReactComponent as Kabgo } from "../../assets/svg/Sidebar/kabgo.svg";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { sidebarActions } from "@store/sidebar";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const mainMenuData = useAppSelector((state) => state.sidebar.mainMenuData);
  const onChangeActive = (index: number) => {
    dispatch(sidebarActions.updateActive(index));
  }
  return (
    <div className={styles["sidebar-container"]}>
      <Kabgo className={styles["logo"]} />
      <div className={styles["main-menu-title"]}>Main Menu</div>
      <div className={styles["main-menu-container"]}>
        {mainMenuData.map((data, index) => (
            <NavLink to="/" onClick={()=>onChangeActive(index)} className={`${styles["main-menu-el-container"]} ${data.active ? styles["change-border-color"] : ''}`} key={index}>
              <div className={styles["main-menu-img"]}> <img src={data.active ? data.imgFill : data.img} /></div>
              <div className={`${styles["main-menu-content-arrow"]} ${data.active ? styles["change-text-color"] : ''}`}>{data.name}</div>
            </NavLink>
          )
        )}
      </div>

      <div className={styles["preferences-title"]}>Preferences</div>
      <div className={styles["main-menu-container"]}>
        {mainMenuData.map((data, index) => (
            <NavLink to="/" onClick={()=>onChangeActive(index)} className={`${styles["main-menu-el-container"]} ${data.active ? styles["change-border-color"] : ''}`} key={index}>
              <div className={styles["main-menu-img"]}> <img src={data.active ? data.imgFill : data.img} /></div>
              <div className={`${styles["main-menu-content-arrow"]} ${data.active ? styles["change-text-color"] : ''}`}>{data.name}</div>
            </NavLink>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
