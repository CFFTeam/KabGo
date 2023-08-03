import React from "react";
import styles from "./sidebar.module.css";
import { ReactComponent as KabGoIcon } from "../../assets/svg/Sidebar/kabgoLogo.svg";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { sidebarActions } from "@store/reducers/sidebarSlice";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ReactComponent as FooterKabgo } from "@assets/svg/Sidebar/footerLogo.svg";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mainMenuData = useAppSelector((state) => state.sidebar.mainMenuData);
  const preferenceData = useAppSelector((state) => state.sidebar.preferencesData);

  const onChangeActive = (para: any[]) => {
      dispatch(sidebarActions.updateActive([para[0], para[1]]));
  }
  return (
    <div className={styles["sidebar-container"]}>
      <KabGoIcon className={styles["logo"]} />  
      <div className={styles["sidebar-title"]}>Main Menu</div>
      <div className={styles["sidebar-sub-container"]}>
        {mainMenuData.map((data, index) => (
            <NavLink to= {data.link} onClick={()=>onChangeActive([index, "main-menu"])} className={`${styles["sidebar-el-container"]} ${data.active ? styles["change-border-color"] : ''}`} key={index}>
              <div className={styles["sidebar-img"]}> <img src={data.active ? data.imgFill : data.img} /></div>
              <div className={`${styles["sidebar-content-arrow"]} ${data.active ? styles["change-text-color"] : ''}`}>{data.name}</div>
            </NavLink>
          )
        )}  
      </div>

      <div className={styles["preferences-title"]}>Doanh Nghiệp</div>
      <div className={styles["sidebar-sub-container"]}>
        {preferenceData.map((data, index) => (
            <NavLink to={data.link} onClick={()=>onChangeActive([index, "business-section"])} className={`${styles["sidebar-el-container"]} ${data.active ? styles["change-border-color"] : ''}`} key={index}>
              <div className={styles["sidebar-img"]}> <img src={data.active ? data.imgFill : data.img} /></div>
              <div className={`${styles["sidebar-content-arrow"]} ${data.active ? styles["change-text-color"] : ''}`}>{data.name}</div>
            </NavLink>
          )
        )}
      </div>
      <FooterKabgo className={styles["sidebar-footer-logo"]}/>
    </div>
  );
};

export default Sidebar;