import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../ShearePage/NavBar/Navbar';
import Footer from '../ShearePage/Footer/Footer';

const AuthPageLayout = () => {
    return (
        <div className='container mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default AuthPageLayout;