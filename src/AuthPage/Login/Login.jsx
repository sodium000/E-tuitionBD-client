import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import SocalLogin from '../SocalLogin/SocalLogin';
import { useForm } from 'react-hook-form';
import useAuth from '../../hook/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hook/useAxiosSecure';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser, setLoading } = useAuth()

    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const login = async (data) => {
        try {
            const result = await signInUser(data.Email, data.Password);
            if (result) {
                const loginData = { Email: data.Email };
                const res = await axiosSecure.post('/login', loginData);
                if (res) {
                    navigate(location?.state || '/');
                }

            }

        } catch (error) {

            if (error.code === 'auth/invalid-credential') {
                Swal.fire({
                    title: "User Not Found",
                    text: "Invalid email or password",
                    icon: "error",
                });
            }
        }
        setLoading(false);
    };
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
                            <form action="#" className="space-y-6" method="POST" onSubmit={handleSubmit(login)}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            autoComplete="email"
                                            className="form-input block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            type="email"
                                            {...register('Email', {
                                                required: true
                                            })}
                                        />
                                    </div>
                                    {
                                        errors.Email?.type === "required" && <p className='text-red-500 font-bold'>Email is Required</p>
                                    }
                                </div>
                                <div >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="re-password">
                                            Re-Password <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                autoComplete="new-password"
                                                className="form-input block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                type="password"
                                                {...register('Password', {
                                                    required: true,
                                                })}
                                            />
                                            {
                                                errors.Password?.type === "required" && <p className='text-red-500 font-bold'>Password is Required</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md border border-transparent bg-primary py-3 px-4 text-base font-semibold text-white shadow-sm hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                        >
                                            Login
                                        </button>
                                    </div>
                                    <div>
                                        <SocalLogin></SocalLogin>
                                    </div>
                                </div>
                            </form>
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