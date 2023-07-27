import React from "react";
import styles from "../../assets/css/Navbar/index.module.css";
import { ReactComponent as OpenClose } from "../../assets/svg/Navbar/closeopen.svg";
import { ReactComponent as GoBack } from "../../assets/svg/Navbar/goback.svg";
import { ReactComponent as Reload } from "../../assets/svg/Navbar/reload.svg";
import { ReactComponent as User } from "../../assets/svg/Navbar/user.svg";
import { ReactComponent as Notification } from "../../assets/svg/Navbar/notification.svg";
import { ReactComponent as Setting } from "../../assets/svg/Navbar/setting.svg";
import { ReactComponent as Logout } from "../../assets/svg/Navbar/logout.svg";

const Navbar: React.FC = () => {
  return (
    <nav className={styles["nav-container"]}>
      <div className={styles["content-container-openclose"]}>
        <div className={styles["img-container"]}>
          <OpenClose />
        </div>
      </div>
      <div className={styles["title-container"]}>
        <div className={styles["sub-title"]}>
            <GoBack />
            <Reload />
            <div className={styles["title"]}>Dashboard</div>
        </div>
        <div className={styles["sub-option"]}>
            <User />
            <Notification />
            <Setting />
            <Logout className={styles["test"]}/>
        </div>
      </div>
      <div className={styles["profile-container"]}>

      </div>
    </nav>
  );
};

export default Navbar;
