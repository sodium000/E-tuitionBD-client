import React from 'react';
import Navbar from '../ShearePage/NavBar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../ShearePage/Footer/Footer';

const HomePageLayout = () => {
    return (
        <div className='min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-x-hidden'>
            <Navbar />
            <main className='flex-1 w-full'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default HomePageLayout;