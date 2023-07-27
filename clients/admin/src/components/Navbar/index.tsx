import React from "react";
import styles from "../../assets/css/navbar.module.css";
import { ReactComponent as OpenClose } from "../../assets/svg/Navbar/closeopen.svg";
import { ReactComponent as GoBack } from "../../assets/svg/Navbar/goback.svg";
import { ReactComponent as Reload } from "../../assets/svg/Navbar/reload.svg";
import { ReactComponent as User } from "../../assets/svg/Navbar/user.svg";
import { ReactComponent as Notification } from "../../assets/svg/Navbar/notification.svg";
import { ReactComponent as Setting } from "../../assets/svg/Navbar/setting.svg";
import { ReactComponent as Logout } from "../../assets/svg/Navbar/logout.svg";
import { ReactComponent as Profile } from "../../assets/svg/Navbar/profile.svg";

const Navbar: React.FC = () => {
  return (
    <nav className={styles["nav-container"]}>
      <div className={styles["content-container-openclose"]}>
        <div className={styles["img-container"]}>
          <OpenClose className={styles["custome-svg"]} />
        </div>
      </div>
      <div className={styles["title-container"]}>
        <div className={styles["sub-title"]}>
          <GoBack className={styles["custome-svg"]} />
          <Reload className={styles["custome-svg"]} />
          <div className={styles["title"]}>Dashboard</div>
        </div>
        <div className={styles["sub-option"]}>
          <User className={styles["custome-svg"]} />
          <Notification className={styles["custome-svg"]} />
          <Setting className={styles["custome-svg"]} />
          <Logout className={styles["custome-svg"]} />
        </div>
      </div>
      <div className={styles["profile-container"]}>
        <div className={styles["sub-profile"]}>
          <div className={styles["profile-info"]}>
            <div className={styles["profile-name"]}>Trần Đàm Gia Huy</div>
            <div className={styles["profile-role"]}>Administrator</div>
          </div>
          <div className={styles["profile-img"]}>
            <Profile />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
