import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';

const BaseLayout: React.FC = () => {
    return <React.Fragment>
        <Navbar />
        <Outlet />
        <Footer />
    </React.Fragment>
}

export default BaseLayout;