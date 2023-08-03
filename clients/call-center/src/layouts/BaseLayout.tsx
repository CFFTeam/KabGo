import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import Sidebar from '@components/Sidebar';

const BaseLayout = () => {
    return <React.Fragment>
        <Navbar />
        <Sidebar/>
        <Outlet />
        <Footer />
    </React.Fragment>
}

export default BaseLayout;