import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../ShearePage/NavBar/Navbar';
import Footer from '../ShearePage/Footer/Footer';

const AuthPageLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
            <Navbar></Navbar>
            <main className="flex-1 w-full">
                <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 lg:py-8">
                    <Outlet></Outlet>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default AuthPageLayout;