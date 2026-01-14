import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../hook/useAuth';
import Loading from '../../Component/Loading/Loading';
import useAxiosSecure from '../../hook/useAxiosSecure';
import useRole from '../../hook/useRole';
import { MdLogout, MdDashboard, MdPerson, MdSettings } from 'react-icons/md';
import ThemeToggle from '../../Component/ThemeToggle/ThemeToggle';

const Navbar = () => {
    const { user, loding, GoogleSignOut } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { role, roleLoading } = useRole();

    const logout = () => {
        GoogleSignOut();
        axiosSecure.post('/logout')
            .then(res => {
                if (res) console.log('Session ended');
            });
    };

    // Shared NavLink Class
    const navLinkStyles = ({ isActive }) =>
        `relative px-3 py-2 transition-all duration-300 font-medium hover:text-primary ${isActive ? "text-primary border-b-2 border-primary" : "text-gray-600 dark:text-gray-300"
        }`;

    const link = (
        <>
            <li><NavLink to='/' className={navLinkStyles}>Home</NavLink></li>
            <li><NavLink to='/about' className={navLinkStyles}>About</NavLink></li>
            <li><NavLink to='/Tutors' className={navLinkStyles}>Tutors</NavLink></li>
            <li><NavLink to='/TutionPost' className={navLinkStyles}>Tuitions</NavLink></li>

            {loding ? <span className="loading loading-dots loading-xs"></span> : (
                <>
                    {!roleLoading && user && role === 'tutor' && (
                        <>
                            <li><NavLink to='/Tutorapply' className={navLinkStyles}>Update Profile</NavLink></li>
                            <li><NavLink to="/dashboard/myapplications" className={navLinkStyles}> Tutor Dashboard</NavLink></li>
                        </>
                    )}
                    {!roleLoading && user && role === 'admin' && (
                        <li><NavLink to="/dashboard/TuitionPostReview" className={navLinkStyles}>Admin Panel</NavLink></li>
                    )}
                    {!roleLoading && user && role === 'student' && (
                        <li><NavLink to="/dashboard/PostTable" className={navLinkStyles}>Student Dashboard</NavLink></li>
                    )}
                </>
            )}
            <li><NavLink to='/contactpage' className={navLinkStyles}>Contact</NavLink></li>
            <li><NavLink to='/location' className={navLinkStyles}>Office Location</NavLink></li>
        </>
    );

    return (
        <div className='sticky top-0 z-50 transition-all duration-300'>

            <div className="navbar bg-white dark:bg-gray-900/90 rounded-xl border-b border-gray-100 dark:border-gray-800 px-4 md:px-8">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dark:bg-gray-900/90 dropdown-content mt-3 z-1 p-4 shadow-xl bg-base-100 rounded-2xl w-64 space-y-2">
                            {link}
                        </ul>
                    </div>
                    <Link to={'/'} className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform">eT</div>
                        <span className="text-xl font-black tracking-tighter text-slate-800 dark:text-gray-100">eTuition<span className='text-purple-600 dark:text-purple-400'>Bd</span></span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-2 px-1">
                        {link}
                    </ul>
                </div>

                <div className="navbar-end gap-4">
                    <ThemeToggle />
                    {loding ? (
                        <Loading />
                    ) : user ? (
                        <div className="flex items-center gap-3">
                            <button onClick={logout} className="py-3 btn  border border-purple-500 text-red-500 font-bold flex items-center gap-3 hover:bg-red-50">
                                <MdLogout className="text-lg" /> Log Out
                            </button>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="avatar hover:opacity-80 transition-opacity ring-2 ring-primary/20 ring-offset-2 rounded-full">
                                    <div className="w-10 rounded-full">
                                        <img src={user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} alt="User" />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-3 z-1 p-3 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-56 border border-gray-100">
                                    <div className="px-4 py-3 border-b border-gray-50 mb-2">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Signed in as</p>
                                        <p className="text-sm font-bold text-slate-800 truncate">{user.displayName}</p>
                                        <span className="badge badge-primary badge-xs mt-1 uppercase text-[10px] font-bold">{role}</span>
                                    </div>
                                    {
                                        <>
                                            {!roleLoading && user && role === 'tutor' && (
                                                <>
                                                    <li><NavLink to="/dashboard/myapplications" className={navLinkStyles}>Tutor Dashboard</NavLink></li>

                                                </>
                                            )}
                                            {!roleLoading && user && role === 'admin' && (
                                                <li><NavLink to="/dashboard/TuitionPostReview" className={navLinkStyles}>Admin Dashboard</NavLink></li>

                                            )}
                                            {!roleLoading && user && role === 'student' && (
                                                <li><NavLink to="/dashboard/PostTable" className={navLinkStyles}>Student Dashboard</NavLink></li>
                                            )}
                                        </>
                                    }
                                    <hr className='my-1 opacity-50' />
                                    <li>
                                        <button onClick={logout} className="py-3 text-red-500 font-bold flex items-center gap-3 hover:bg-red-50">
                                            <MdLogout className="text-lg" /> Log Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <Link to='/login' className="btn btn-primary rounded-xl px-8 shadow-lg shadow-primary/20 capitalize font-bold">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;