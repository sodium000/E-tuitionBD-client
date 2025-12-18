import React from 'react';
import Navbar from '../ShearePage/NavBar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../ShearePage/Footer/Footer';

const HomePageLayout = () => {
    return (
        <div className='container mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomePageLayout;