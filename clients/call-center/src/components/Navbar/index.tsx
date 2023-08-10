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
import KhoaImg from "@assets/images/Khoa.jpg";
 
const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const urlData: string[] = ['/', '/dashboard', '/call-receipt-handle', '/booking-page', '/statistic', '/report', 'team-member', 'contact', 'feedback'];
    const titleData: string[] = ['Dashboard', 'Dashboard', 'Xử lý cuộc gọi', 'Xử lý điều phối', 'Thống kê', 'Báo cáo', 'Thành viên', 'Liên hệ', 'Đánh giá']
    
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
                <span className={styles["log-out-section"]}>
                    <LogoutIcon className = {styles["logout-icn"]}/>
                </span>
            </div>
           
           <div className={styles["authenticate-section"]}>
                <div className={styles["info"]}>
                    <span className={styles["name"]}>
                        Khoa Nguyen
                    </span>
                    <span className={styles["role"]}>
                        Điều phối viên
                    </span>
                </div>
                <span className={styles["avatar"]}>
                    {/* <img src= {KhoaImg} alt= "avatar-img" /> */}
                </span>
           </div>
        </nav>
    );
}

export default Navbar;