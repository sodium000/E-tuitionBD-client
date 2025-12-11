import React from 'react';
import { NavLink } from 'react-router';
import useAuth from '../../hook/useAuth';
import Loading from '../../Component/Loading/Loading';

const Navbar = () => {
    const { user, loding, GoogleSignOut } = useAuth()
    const Link = <>
        <li><NavLink to='TutionPost'>Tuitions</NavLink></li>
        <li><NavLink to='Tutors'>Tutors</NavLink></li>
        {
            user? <li><NavLink to='AddPost'>Add Tution</NavLink></li> : ""
        }
        <li><NavLink>About</NavLink></li>
        <li><NavLink>Contact</NavLink></li>
        <li><NavLink>Office Location</NavLink></li>
    </>
    return (
        <div className='sticky top-0 z-50'>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                Link
                            }
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">eTuitionBd</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            Link
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        loding ? <><Loading></Loading></>
                            :
                            user ? <><NavLink onClick={() => GoogleSignOut()} className="btn bg-purple-300">Log Out</NavLink></>
                                :
                                <NavLink to='/login' className="btn bg-purple-300">Login</NavLink>
                    }
                    {
                        user ? <div className="dropdown dropdown-end ml-5">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user.photoURL} />
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        {user.displayName}
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                            </ul>
                        </div>
                            :
                            <></>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;