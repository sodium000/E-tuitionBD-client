import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../hook/useAuth';
import Loading from '../../Component/Loading/Loading';
import useAxiosSecure from '../../hook/useAxiosSecure';
import useRole from '../../hook/useRole';
import { MdLogout, MdDashboard, MdPerson, MdSettings } from 'react-icons/md';


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
        `relative px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm ${
            isActive 
                ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 font-semibold" 
                : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
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
                            <li><NavLink to="/dashboard/myapplications" className={navLinkStyles}>Dashboard</NavLink></li>
                        </>
                    )}
                    {!roleLoading && user && role === 'admin' && (
                        <li><NavLink to="/dashboard/TuitionPostReview" className={navLinkStyles}>Admin Panel</NavLink></li>
                    )}
                    {!roleLoading && user && role === 'student' && (
                        <li><NavLink to="/dashboard/PostTable" className={navLinkStyles}>Dashboard</NavLink></li>
                    )}
                </>
            )}
            <li><NavLink to='/contactpage' className={navLinkStyles}>Contact</NavLink></li>
            <li><NavLink to='/location' className={navLinkStyles}>Location</NavLink></li>
        </>
    );

    return (
        <header className='sticky top-0 z-50 w-full backdrop-blur-md rounded-xl bg-white/95 dark:bg-gray-900/95 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm'>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo Section */}
                    <div className="flex items-center shrink-0">
                        <div className="dropdown lg:hidden">
                            <div tabIndex={0} role="button" className="btn btn-ghost p-2 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-60 p-4 shadow-2xl bg-white dark:bg-gray-800 rounded-2xl w-64 border border-gray-200 dark:border-gray-700 space-y-1">
                                {link}
                            </ul>
                        </div>
                        <Link to={'/'} className="flex items-center gap-2.5 group">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-linear-to-br from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg lg:text-xl shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 group-hover:scale-105 transition-all duration-300">
                                eT
                            </div>
                            <span className="text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                                eTuition<span className='text-purple-600 dark:text-purple-400'>Bd</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:items-center lg:space-x-1 flex-1 justify-center">
                        <ul className="flex items-center space-x-1">
                            {link}
                        </ul>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3 lg:gap-4">
                        {loding ? (
                            <div className="flex items-center justify-center w-10 h-10">
                                <Loading />
                            </div>
                        ) : user ? (
                            <div className="flex items-center gap-3">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="avatar cursor-pointer hover:ring-2 hover:ring-purple-500/50 transition-all rounded-full">
                                        <div className="w-10 h-10 rounded-full ring-2 ring-purple-200 dark:ring-purple-800 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                                            <img 
                                                src={user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                                                alt={user.displayName || "User"} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="mt-3 z-60 p-2 shadow-2xl menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-xl w-56 border border-gray-200 dark:border-gray-700">
                                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 mb-2">
                                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Signed in as</p>
                                            <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate mt-1">{user.displayName}</p>
                                            <span className="inline-block mt-2 px-2 py-0.5 text-xs font-bold uppercase bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full">
                                                {role}
                                            </span>
                                        </div>
                                        {!roleLoading && user && role === 'tutor' && (
                                            <li>
                                                <NavLink to="/dashboard/myapplications" className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm ${isActive ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                                                    <MdDashboard className="text-lg" />
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                        )}
                                        {!roleLoading && user && role === 'admin' && (
                                            <li>
                                                <NavLink to="/dashboard/TuitionPostReview" className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm ${isActive ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                                                    <MdDashboard className="text-lg" />
                                                    Admin Panel
                                                </NavLink>
                                            </li>
                                        )}
                                        {!roleLoading && user && role === 'student' && (
                                            <li>
                                                <NavLink to="/dashboard/PostTable" className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm ${isActive ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                                                    <MdDashboard className="text-lg" />
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                        )}
                                        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                                        <li>
                                            <button 
                                                onClick={logout} 
                                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                            >
                                                <MdLogout className="text-lg" />
                                                Log Out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <Link 
                                to='/login' 
                                className="px-4 py-2 lg:px-6 lg:py-2.5 bg-linear-to-r from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;