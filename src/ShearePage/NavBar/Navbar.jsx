import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../hook/useAuth';
import Loading from '../../Component/Loading/Loading';
import useAxiosSecure from '../../hook/useAxiosSecure';
import useRole from '../../hook/useRole';
import { MdLogout, MdDashboard, MdKeyboardArrowDown } from 'react-icons/md';

const Navbar = () => {
    const { user, loding, GoogleSignOut } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { role } = useRole();

    const logout = () => {
        GoogleSignOut();
        axiosSecure.post('/logout')
            .then(res => {
                if (res) console.log('Session ended');
            });
    };

    const navLinkStyles = ({ isActive }) =>
        `relative px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm ${
            isActive 
                ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 font-semibold" 
                : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
        }`;

    const getDashboardPath = () => {
        if (role === 'tutor') return "/dashboard/myapplications";
        if (role === 'admin') return "/dashboard/TuitionPostReview";
        if (role === 'student') return "/dashboard/PostTable";
        return "/dashboard";
    };

    const navLinks = (
        <>
            <li><NavLink to='/' className={navLinkStyles}>Home</NavLink></li>
            <li><NavLink to='/about' className={navLinkStyles}>About</NavLink></li>
            <li><NavLink to='/Tutors' className={navLinkStyles}>Tutors</NavLink></li>
            <li><NavLink to='/TutionPost' className={navLinkStyles}>Tuitions</NavLink></li>
            <li><NavLink to='/contactpage' className={navLinkStyles}>Contact</NavLink></li>
            <li><NavLink to='/location' className={navLinkStyles}>Location</NavLink></li>
        </>
    );

    return (
        <header className='sticky top-0 z-50 w-full backdrop-blur-md bg-white/95 dark:bg-slate-950/95 border-b border-gray-200 dark:border-slate-800 shadow-sm transition-colors duration-500'>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    
                    {/* Left: Logo */}
                    <div className="flex items-center gap-4">
                        <div className="dropdown lg:hidden">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm px-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-60 p-2 shadow-xl bg-white dark:bg-slate-900 rounded-2xl w-52 border dark:border-slate-800">
                                {navLinks}
                            </ul>
                        </div>
                        <Link to={'/'} className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20 group-hover:rotate-6 transition-transform">eT</div>
                            <span className="text-xl font-bold dark:text-white hidden sm:block">eTuition<span className='text-purple-600'>Bd</span></span>
                        </Link>
                    </div>

                    {/* Center: Desktop Links */}
                    <div className="hidden lg:flex items-center">
                        <ul className="flex items-center space-x-1">
                            {navLinks}
                        </ul>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex items-center gap-3">
                        {loding ? (
                            <span className="loading loading-spinner text-purple-600"></span>
                        ) : user ? (
                            <div className="flex items-center gap-3">
                                
                                {/* Dashboard Button - Main Navbar */}
                                <Link 
                                    to={getDashboardPath()} 
                                    className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all active:scale-95"
                                >
                                    <MdDashboard size={18} />
                                    <span>Dashboard</span>
                                </Link>

                                {/* Profile Dropdown */}
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="flex items-center gap-1 p-0.5 rounded-full hover:ring-2 hover:ring-purple-500/30 transition-all">
                                        <div className="w-10 h-10 rounded-full border-2 border-purple-500 p-0.5 shadow-md">
                                            <img 
                                                src={user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                                                alt="User" 
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        </div>
                                        <MdKeyboardArrowDown className="text-gray-400" />
                                    </div>

                                    <ul tabIndex={0} className="mt-4 z-100 p-3 shadow-2xl menu dropdown-content bg-white dark:bg-slate-900 rounded-2xl w-64 border border-gray-100 dark:border-slate-800 space-y-2">
                                        {/* Profile Card Section */}
                                        <li className="px-4 py-4 mb-1 bg-gray-50/50 dark:bg-slate-800/50 rounded-xl">
                                            <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Signed in as</p>
                                            <p className="text-sm font-bold truncate dark:text-white">{user.displayName}</p>
                                            <div className="mt-2">
                                                <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-[10px] font-bold rounded-md uppercase">
                                                    {role}
                                                </span>
                                            </div>
                                        </li>

                                        {/* Dashboard (Mobile only) */}
                                        <li className="sm:hidden">
                                            <Link to={getDashboardPath()} className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 font-bold">
                                                <MdDashboard size={20} /> Dashboard
                                            </Link>
                                        </li>

                                        {/* Logout Button */}
                                        <li className="pt-2">
                                            <button 
                                                onClick={logout}
                                                className="flex items-center justify-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold hover:bg-red-600 hover:text-white transition-all w-full border border-red-100 dark:border-red-900/30 shadow-sm hover:shadow-red-500/20"
                                            >
                                                <MdLogout size={20} /> Log Out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <Link 
                                to='/login' 
                                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-purple-500/30 transition-all active:scale-95"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;