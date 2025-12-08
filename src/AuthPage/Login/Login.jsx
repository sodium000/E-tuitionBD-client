import React, { useState } from 'react';
import { Link } from 'react-router';

const Login = () => {
    const [userType, setUserType] = useState('tutor');
    return (
        <div className='grid grid-cols-2 mt-20'>
            <div className=' justify-center items-center flex'>
                <img src='./Computerlogin.svg' alt="" className='max-h-150' />
            </div>
            <div >
                <div className=" flex flex-col justify-center bg-background-light dark:bg-background-dark">
                    <div className="sm:mx-auto sm:w-full sm:max-w-10/12">
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
                            Login
                        </h2>
                        <div className="mt-2 w-30 h-1 bg-primary mx-auto"></div>
                    </div>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-10/12">
                        <div className="bg-background-light dark:bg-gray-800 py-8 px-4 shadow-sm rounded-lg sm:px-10">
                            <form action="#" className="space-y-6" method="POST" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-2 gap-4 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                                    <button
                                        type="button"
                                        onClick={() => setUserType('tutor')}
                                        className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-lg shadow-sm transition-colors ${userType === 'tutor'
                                            ? 'text-white bg-primary'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        <img
                                            alt="Tutor avatar"
                                            className="w-6 h-6 rounded-full"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAuA_rQ3J61QLLZ24Qfgt45Mh1-wULWwM6a73TKeMO4Gx1u4uWBRkMPOnPAP9d9JX2aEhROB8Rb56OnSPdNpyUPPw_h0ine_S73QIc7WDMUxzt7xmEV0dh4LFBW_qgmWc84EBD5iSxZj3g8bgp4nAbCjJx7F9LsQJjJ_I8PUfsxcHTeH5IDmqmurSoUHajKa2-LlfBPWFViTwUTvDIDhYge4kgjiLKhsOf4S-ProjwZA85WJG4kPzoJ6p9-OzVY_Pko_vyfsiJxyk"
                                        />
                                        Tutor
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setUserType('student')}
                                        className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-lg transition-colors ${userType === 'student'
                                            ? 'text-white bg-primary shadow-sm'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        <img
                                            alt="Student avatar"
                                            className="w-6 h-6 rounded-full"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo34wg1g3pasCZf4aAa_fgsEIeOJStK_zhnDw0h1nqJr6MfFYpxG1TX9ukqkw3eHiYsx74U-r9_rOk1NgDGSJDZCzokv1B-lgdhwDmFA570ZUx4fjoUjzIj5-eogAGEpYiXsUbQ2WqHA15NVJ-5Ixfd2sG9AY0yp4mvhY1vpjeYZk5HFeT9ow3adyCCGyOS4A2xyLPzPNteewOF-iMBf82oJBZaectYt-c8O4Z8UiUiuqL6IaOQbVtpzYRiUpb1zrQHLFGcLT1ALI"
                                        />
                                        Student
                                    </button>
                                </div>
                                {
                                    userType === "tutor" ? <>
                                        {/* Email Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    autoComplete="email"
                                                    className="form-input block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    id="email"
                                                    name="email"
                                                    placeholder="ex: user@gmail.com"
                                                    required
                                                    type="email"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                                                    Password <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        autoComplete="new-password"
                                                        className="form-input block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        id="password"
                                                        name="password"
                                                        placeholder="Password"
                                                        required
                                                        type="password"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="re-password">
                                                    Re-Password <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        autoComplete="new-password"
                                                        className="form-input block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        id="re-password"
                                                        name="re-password"
                                                        placeholder="Re-enter Password"
                                                        required
                                                        type="password"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="flex w-full justify-center rounded-md border border-transparent bg-primary py-3 px-4 text-base font-semibold text-white shadow-sm hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                                    >
                                                        Login in as a Tutor
                                                    </button>
                                                </div>
                                                <div>
                                                    <button className=" flex items-center gap-2 w-full justify-center rounded-md border border-transparent bg-primary py-3 px-4 text-base font-semibold text-white shadow-sm hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                                                        <svg className='rounded-full' aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                                        Login with Google
                                                    </button>
                                                </div>
                                            </div>
                                    </>
                                        :
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                                                    Email <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        autoComplete="email"
                                                        className="form-input block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        id="email"
                                                        name="email"
                                                        placeholder="ex: user@gmail.com"
                                                        required
                                                        type="email"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                                                        Password <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            autoComplete="new-password"
                                                            className="form-input block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                            id="password"
                                                            name="password"
                                                            placeholder="Password"
                                                            required
                                                            type="password"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="re-password">
                                                        Re-Password <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            autoComplete="new-password"
                                                            className="form-input block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                            id="re-password"
                                                            name="re-password"
                                                            placeholder="Re-enter Password"
                                                            required
                                                            type="password"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="flex w-full justify-center rounded-md border border-transparent bg-primary py-3 px-4 text-base font-semibold text-white shadow-sm hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                                    >
                                                        Login in as a Student
                                                    </button>
                                                </div>
                                                <div>
                                                    <button className=" flex items-center gap-2 w-full justify-center rounded-md border border-transparent bg-primary py-3 px-4 text-base font-semibold text-white shadow-sm hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                                                        <svg className='rounded-full' aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                                        Login with Google
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                }
                            </form>
                            {/* Sign In Link Section */}
                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-background-light dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                                            Don't  have an account
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Link
                                        to='/registration'
                                        className="flex w-full justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 py-3 px-4 text-base font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;