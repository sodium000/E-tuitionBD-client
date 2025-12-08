import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../ShearePage/NavBar/Navbar';

const AuthPageLayout = () => {
    return (
        <div className='container mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthPageLayout;