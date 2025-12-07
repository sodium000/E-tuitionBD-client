import React from 'react';
import Navbar from '../ShearePage/NavBar/Navbar';
import { Outlet } from 'react-router';

const HomePageLayout = () => {
    return (
        <div className='container mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default HomePageLayout;