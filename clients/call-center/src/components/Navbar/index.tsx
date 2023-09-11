import React from 'react';
import styles from "./navbar.module.css";
import { useNavigate, useLocation } from 'react-router-dom';
import {ReactComponent as DockIcon} from "@assets/svg/Navbar/dock-icn.svg";
import {ReactComponent as BackwardIcon} from "@assets/svg/Navbar/backward-icn.svg";
import {ReactComponent as ReloadIcon} from "@assets/svg/Navbar/reload-icn.svg";
import {ReactComponent as ProfileIcon} from "@assets/svg/Navbar/profile-icn.svg";
import {ReactComponent as NotificationIcon} from "@assets/svg/Navbar/notification-icn.svg";
import {ReactComponent as SettingIcon} from "@assets/svg/Navbar/setting-icn.svg";
import {ReactComponent as LogoutIcon} from "@assets/svg/Navbar/logout-icn.svg";
import { authStorage } from '@utils/storage';
import toast, { Toaster } from "react-hot-toast";
import KhoaImg from "@assets/images/Khoa.jpg";
import CaptainImg from "@assets/images/Captain.jpg";
 
const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const urlData: string[] = ['/', '/dashboard', '/call-receipt-handle', '/booking-page', '/statistic', '/report', 'team-member', 'contact', 'feedback'];
    const titleData: string[] = ['Dashboard', 'Dashboard', 'Xử lý cuộc gọi', 'Xử lý điều phối', 'Thống kê', 'Báo cáo', 'Thành viên', 'Liên hệ', 'Đánh giá']
    
    const styleSuccess = {
        style: {
          border: "2px solid #28a745",
          padding: "10px",
          color: "#28a745",
          fontWeight: "500",
        },
        duration: 1500,
      };
    
      const styleError = {
        style: {
          border: "2px solid red",
          padding: "10px",
          color: "red",
          fontWeight: "500",
        },
        duration: 4000,
      };

      
    const findTitleFromLocation = () => {
        const titleIndex = urlData.indexOf(location.pathname);
        if (titleIndex === -1) return 'Dashboard'; // if not found title data
        return titleData[titleIndex];
    }

    const handleBackward = () => {
        navigate(-1);
    }   
    
    const handleReload = () => {
        navigate(0);
    }

    const handleLogout = () => {
        authStorage.logout();
        toast.success("Đăng xuất thành công", styleSuccess);
        setTimeout(() =>  navigate('/'), 1500);
       
    }

    return (
        <nav className = {styles["nav-bar"]}>
            <span className={styles["dock-option"]}>
                <DockIcon className = {styles["dock-icn"]}/>
            </span>

            <div className={styles["navigate-section"]}>
                <span className={styles["backward-section"]} onClick = {handleBackward}>
                    <BackwardIcon className = {styles["backward-icn"]} /> 
                </span>
                <span className={styles["reload-section"]} onClick = {handleReload}>
                    <ReloadIcon className = {styles["reload-icn"]}/>
                </span>
                <span className={styles["text"]}>
                   {findTitleFromLocation()} 
                </span>
                
            </div>
        
            <div className={styles["option-section"]}>
                <span className={styles["profile-section"]}>
                    <ProfileIcon className = {styles["profile-icn"]}/>
                </span>
                <span className={styles["noti-section"]}>
                    <NotificationIcon className = {styles["notification-icn"]}/>
                </span>
                <span className={styles["setting-section"]}>
                    <SettingIcon className = {styles["setting-icn"]}/>
                </span>
                <span className={styles["log-out-section"]} onClick = {handleLogout}>
                    <LogoutIcon className = {styles["logout-icn"]}/>
                </span>
            </div>
           
           <div className={styles["authenticate-section"]}>
                <div className={styles["info"]}>
                    <span className={styles["name"]}>
                       {authStorage?.getAuthData()?.name || 'Khoa Nguyen'}
                    </span>
                    <span className={styles["role"]}>
                        Điều phối viên
                    </span>
                </div>
                <span className={styles["avatar"]}>
                    {authStorage?.getAuthData()?.role === "Coordinator" && <img src= {KhoaImg} alt= "avatar-img" /> }
                    {authStorage?.getAuthData()?.role === "Supervisor" && <img src= {CaptainImg} alt= "avatar-img" /> }
                    {/* <img src= {KhoaImg} alt= "avatar-img" />                                      */}
                </span>
           </div>
        </nav>
    );
}

export default Navbar;