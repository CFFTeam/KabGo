import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import Sidebar from '@components/Sidebar';
import styles from "./CallReceiptHandlerLayout.module.css";

const CallReceiptHandlerLayout = () => {
    return <React.Fragment>
        <Navbar/>
        <div className={styles["layout-division"]}>
            <Sidebar/>
            <Outlet/>
        </div>
    </React.Fragment>
}

export default CallReceiptHandlerLayout;