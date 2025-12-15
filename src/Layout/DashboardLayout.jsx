/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/static-components */
import React from 'react';
import { NavLink, Outlet, Link } from 'react-router';
import { FaMotorcycle, FaUsers, FaHome, FaAlignJustify, FaMoneyCheck } from 'react-icons/fa';
import { MdPostAdd } from "react-icons/md";
import { MdPayments } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { BiSolidInstitution } from 'react-icons/bi';
import { TbFileReport } from "react-icons/tb";
import { CiSquareCheck } from "react-icons/ci";
// import useRole from '../hook/useRole';


const DashboardLayout = () => {
    // const { role } = useRole();
    const role = 'admin'

    const SidebarLink = ({ to, icon: Icon, label, dataTip }) => (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `flex items-center space-x-3 p-4 rounded-lg transition duration-200 
                     hover:bg-blue-500 hover:text-white group
                     ${isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-300'
                    }`
                }
                data-tip={dataTip}
            >
                <div className="text-2xl">
                    <Icon />
                </div>
                <span className="font-medium text-sm">
                    {label}
                </span>
            </NavLink>
        </li>
    );

    return (
        // Using DaisyUI's drawer structure
        <div className="drawer lg:drawer-open min-h-screen bg-gray-50 dark:bg-gray-900">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                <nav className="flex items-center justify-between w-full h-16 bg-white shadow-lg dark:bg-gray-800 p-4">
                    {/* Sidebar Toggle Button */}
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost lg:hidden text-gray-700 dark:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>

                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400 pl-4">
                        eTuitionBd
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400">
                            <FaHome className="inline-block mr-1" /> Back to Home
                        </Link>
                    </div>
                </nav>

                <main className="p-6 grow">
                    <Outlet />
                </main>

            </div>

            <div className="drawer-side z-20">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

                <div className="flex min-h-full flex-col w-64 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700">

                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                            eTuitionBd
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-widest">
                            {role} Panel
                        </p>
                    </div>

                    <ul className="menu p-4 w-full space-y-2 text-base">
                        <SidebarLink to="/" icon={FaHome} label="Homepage" dataTip="Homepage" />
                        {role === 'tutor' && (
                            <div className="space-y-1 pt-4">
                                <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 px-3 pb-1">Tutor Tools</p>
                                <SidebarLink to="/dashboard/myapplications" icon={FaAlignJustify} label="My Applications" dataTip="My Applications" />
                                <SidebarLink to="/dashboard/ongoingtuitions" icon={BiSolidInstitution} label="Tutor Ongoing Tuitions" dataTip="Tutor Ongoing Tuitions" />
                                <SidebarLink to="/dashboard/revenueHistory" icon={FaMoneyCheck} label="Revenue History" dataTip="Revenue History" />
                            </div>
                        )}
                        {role === 'admin' && (
                            <div className="space-y-1 pt-4">
                                <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 px-3 pb-1">Admin Tools</p>
                                <SidebarLink to="/dashboard/TuitionPostReview" icon={CiSquareCheck} label="Approve Post" dataTip="Approve Post" />
                                <SidebarLink to="/dashboard/AdminFinancialDashboard" icon={TbFileReport} label="Reports & Analytics" dataTip="Reports & Analytics" />
                                <SidebarLink to="/dashboard/UserManagementDashboard" icon={FaUsers} label="Users Management" dataTip="Users Management" />
                            </div>
                        )}
                        {role === 'student' && (
                            <div className="space-y-1 pt-4">
                                <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 px-3 pb-1">Student Tools</p>
                                <SidebarLink to="/dashboard/PostTable" icon={GrUserManager} label="My Tuitions" dataTip="My Tuitions" />
                                <SidebarLink to="/dashboard/AddPost" icon={MdPostAdd} label="Post New Tuition" dataTip="Post New Tuition" />
                                <SidebarLink to="/dashboard/applicationTable" icon={GrUserManager} label="Applied Tutors" dataTip="Applied Tutors" />
                                <SidebarLink to="/dashboard/paymentTable" icon={MdPayments} label="Payments" dataTip="Payments" />
                                <SidebarLink to="/dashboard/profileSection" icon={FaUsers} label="Profile Settings" dataTip="Profile Settings" />
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;