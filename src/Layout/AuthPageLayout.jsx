import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../ShearePage/NavBar/Navbar';
import Footer from '../ShearePage/Footer/Footer';

const AuthPageLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='container mx-auto'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AuthPageLayout;