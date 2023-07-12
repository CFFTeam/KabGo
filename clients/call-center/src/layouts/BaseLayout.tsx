import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';

const BaseLayout = () => {
    return <React.Fragment>
        <Navbar />
        <Outlet />
        <Footer />
    </React.Fragment>
}

export default BaseLayout;