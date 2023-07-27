import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import styles from '../assets/css/index.module.css'
// import {ReactComponent as UserIcon} from '../assets/svg/Navbar/user.svg'

const BaseLayout: React.FC = () => {
    return <div className={styles["base-layout-container"]}>
        <Sidebar />
        <div className={styles["content-container"]}>
          <Navbar />
          {/* <UserIcon className={styles['test']}/> */}
          <Outlet />
        </div>
    </div>
}

export default BaseLayout;