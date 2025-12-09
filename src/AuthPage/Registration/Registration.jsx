
import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import SocalLogin from '../SocalLogin/SocalLogin';
import { useForm, useWatch } from 'react-hook-form';
// import useAxiosSecure from '../../hook/useAxiosSecure';

const Registration = () => {

    const [userType, setUserType] = useState('tutor');
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    // const axiosSecure = useAxiosSecure();

    const TuitionRegion = useWatch({ control, name: 'TuitionRegion' });

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];

    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    const passwordValue = useWatch({ control, name: "password" });

    const handelRegiester = (data) => {

        const ProfilImage = data.PhotoUrl[0];

        const fromData = new FormData()
        fromData.append('image', ProfilImage);
        const image_Api_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`
        console.log(image_Api_Url);
        if (userType === 'tutor') {
            console.log(data)
        }

        // registerUser(data.Email, data.Password)
        //     .then(() => {
        //         // Store the image in from data 
        //         const fromData = new FormData()
        //         fromData.append('image', ProfilImage);





        //         axios.post(image_Api_Url, fromData)
        //             .then(res => {

        //                 const photoURL = res.data.data.url;
        //                 // create user in the database
        //                 const userInfo = {
        //                     email: data.email,
        //                     displayName: data.name,
        //                     photoURL: photoURL
        //                 }
        //                 axiosSecure.post('/users', userInfo)
        //                     .then(res => {
        //                         if (res.data.insertedId) {
        //                             console.log('user created in the database');
        //                         }
        //                     })

        //                 // update user profile
        //                 const UserProfile = {
        //                     displayName: data.Name,
        //                     photoURL: photoURL
        //                 }
        //                 Updateprofile(UserProfile)
        //                     .then(() => {
        //                         navigate(location?.state || '/')
        //                     })
        //             })
        //     })
        //     .catch(error => console.log(error))
    }

    return (
        <div className='grid grid-cols-2 '>
            <div className=' justify-center items-center flex'>
                <img src='./Mobilelogin.svg' alt="" className='max-h-150' />
            </div>
            <div >
                <div className=" flex flex-col justify-center bg-background-light dark:bg-background-dark">
                    <div className="sm:mx-auto sm:w-full sm:max-w-10/12">
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
                            Register
                        </h2>
                        <div className="mt-2 w-40 h-1 bg-primary mx-auto"></div>
                    </div>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-10/12">
                        <div className="bg-background-light dark:bg-gray-800 py-8 px-4 shadow-sm rounded-lg sm:px-10">
                            <form className="space-y-6" method="POST" onSubmit={handleSubmit(handelRegiester)}>
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
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">
                                                    Name <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type='text'
                                                        className="form-input block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        placeholder="Your Name"
                                                        {...register('Name', {
                                                            required: true,
                                                            maxLength: 20
                                                        })}
                                                    />
                                                </div>
                                                {
                                                    errors.Name?.type === "required" && <p className='text-red-500 font-bold'>Name is Required</p>
                                                }
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="gender">
                                                    Gender <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1">
                                                    <select defaultValue=''
                                                        className="form-select block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        {...register('genderOption', {
                                                            required: true
                                                        })}
                                                    >
                                                        <option disabled value="">
                                                            Choose One
                                                        </option>
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                        <option>Other</option>
                                                    </select>
                                                    {
                                                        errors.genderOption?.type === "required" && <p className='text-red-500 font-bold'>Gender is Required</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        {/* Email Field */}
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

                                        {/* Photo Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                                                PhotoURL<span className="text-red-500">*</span>
                                            </label>
                                            <div className="mt-1">
                                                <input type="file"
                                                    {...register('PhotoUrl', {
                                                        required: true
                                                    })}
                                                    className="file-input file-input-ghost file-input-info w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                            </div>
                                            {
                                                errors.PhotoUrl?.type === "required" && <p className='text-red-500 font-bold'>Photo is Required</p>
                                            }
                                        </div>

                                        {/* Phone Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="phone">
                                                Phone <span className="text-red-500">*</span>
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    className="form-input block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    placeholder="ex: 01..."
                                                    type="tel"
                                                    {...register('Phone', {
                                                        required: true,
                                                        minLength: 11,
                                                        maxLength: 11
                                                    })}
                                                />
                                                {
                                                    errors.Phone?.type === "required" && <p className='text-red-500 font-bold'>Phone number require</p>
                                                }
                                                {
                                                    errors.Phone?.type === "minLength" && <p className='text-red-500 font-bold'>Phone number not less than 11</p>
                                                }
                                                {
                                                    errors.Phone?.type === "maxLength" && <p className='text-red-500 font-bold'>Phone number not more than 11</p>
                                                }
                                            </div>
                                        </div>

                                        {/* Tuition District and Your Location */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="tuition-district">
                                                    Tuition District <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1">
                                                    <select
                                                        defaultValue=""
                                                        className="form-select block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        {...register('TuitionRegion', { required: true })}
                                                    >
                                                        <option disabled value="">Select District</option>
                                                        {regions.map((r, i) => (
                                                            <option key={i} value={r}>{r}</option>
                                                        ))}
                                                    </select>

                                                    {errors.TuitionRegion?.type === "required" && (
                                                        <p className="text-red-500 font-bold">District is Required</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="your-location">
                                                    Your Location <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1">
                                                    <select
                                                        className="form-select block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        {...register('selectDistrict', { required: true })} defaultValue="Pick a Area"

                                                    >
                                                        <option>Select Area</option>
                                                        {
                                                            districtsByRegion(TuitionRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                                        }
                                                    </select>
                                                </div>
                                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Set your current location.</p>
                                                {
                                                    errors.selectDistrict?.type === "required" && <p className='text-red-500 font-bold'>Location is Required</p>
                                                }
                                            </div>

                                        </div>

                                        {/* Preferred Tuition Area */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="preferred-area">
                                                Preferred Tuition Area <span className="text-red-500">*</span>
                                            </label>
                                            <div className="mt-1">
                                                <select
                                                    className="form-select block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    {...register('PreferredArea', { required: true })} defaultValue="Pick a Area"
                                                >
                                                    <option>Select...</option>
                                                    {
                                                        districtsByRegion(TuitionRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Set your preferred tuition area.</p>
                                            {
                                                errors.selectDistrict?.type === "required" && <p className='text-red-500 font-bold'>Tuition Area is Required</p>
                                            }
                                        </div>

                                        {/* Password Fields */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                                                    Password <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        autoComplete="new-password"
                                                        className="form-input block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        type="password"
                                                        {...register('password', {
                                                            required: true,
                                                            minLength: 6,
                                                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                                                        })}
                                                    />
                                                    {
                                                        errors.password?.type === "required" && <p className='text-red-500 font-bold'>Password is Required</p>
                                                    }
                                                    {
                                                        errors.password?.type === "minLength" && <p className='text-red-500 font-bold'>Password not less then 6 digit</p>
                                                    }
                                                    {
                                                        errors.password?.type === "pattern" && <p className='text-red-500 font-bold'>Password must have at least one uppercase letter, at least one lowercase letter,<br /> at least one number,  and at least one special character</p>
                                                    }
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
                                                        type="password"
                                                        {...register('ConfPassword', {
                                                            required: true,
                                                            validate: (value) => value === passwordValue || "Passwords do not match",
                                                        })}
                                                    />
                                                    {errors.ConfPassword && (
                                                        <p className="text-red-500 font-bold">
                                                            {errors.ConfPassword.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <button
                                                    type="submit"
                                                    className="flex w-full justify-center rounded-md border border-transparent bg-primary py-3 px-4 text-base font-semibold text-white shadow-sm hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                                >
                                                    Registration
                                                </button>
                                            </div>
                                            <div>
                                                <SocalLogin></SocalLogin>
                                            </div>
                                        </div>
                                    </>
                                        :
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">
                                                        Name <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type='text'
                                                            className="form-input block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                            placeholder="Your Name"
                                                            {...register('Name', {
                                                                required: true,
                                                                maxLength: 20
                                                            })}
                                                        />
                                                    </div>
                                                    {
                                                        errors.Name?.type === "required" && <p className='text-red-500 font-bold'>Name is Required</p>
                                                    }
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="gender">
                                                        Gender <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="mt-1">
                                                        <select defaultValue=''
                                                            className="form-select block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                            {...register('genderOption', {
                                                                required: true
                                                            })}
                                                        >
                                                            <option disabled value="">
                                                                Choose One
                                                            </option>
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                            <option>Other</option>
                                                        </select>
                                                        {
                                                            errors.genderOption?.type === "required" && <p className='text-red-500 font-bold'>Gender is Required</p>
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Email Field */}
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

                                            {/* Photo Field */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="phone">
                                                    Phone <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        className="form-input block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        placeholder="ex: 01..."
                                                        type="tel"
                                                        {...register('Phone', {
                                                            required: true,
                                                            minLength: 11,
                                                            maxLength: 11
                                                        })}
                                                    />
                                                    {
                                                        errors.Phone?.type === "required" && <p className='text-red-500 font-bold'>Phone number require</p>
                                                    }
                                                    {
                                                        errors.Phone?.type === "minLength" && <p className='text-red-500 font-bold'>Phone number not less than 11</p>
                                                    }
                                                    {
                                                        errors.Phone?.type === "maxLength" && <p className='text-red-500 font-bold'>Phone number not more than 11</p>
                                                    }
                                                </div>
                                            </div>

                                            {/* Photo Field */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                                                    PhotoURL<span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1">
                                                    <input type="file"
                                                        {...register('PhotoUrl', {
                                                            required: true
                                                        })}
                                                        className="file-input file-input-ghost file-input-info w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                                </div>
                                                {
                                                    errors.PhotoUrl?.type === "required" && <p className='text-red-500 font-bold'>Photo is Required</p>
                                                }
                                            </div>

                                            {/* Phone Field */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="phone">
                                                    Phone <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        className="form-input block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        placeholder="ex: 01..."
                                                        type="tel"
                                                        {...register('Phone', {
                                                            required: true,
                                                            minLength: 11,
                                                            maxLength: 11
                                                        })}
                                                    />
                                                    {
                                                        errors.Phone?.type === "required" && <p className='text-red-500 font-bold'>Phone number require</p>
                                                    }
                                                    {
                                                        errors.Phone?.type === "minLength" && <p className='text-red-500 font-bold'>Phone number not less than 11</p>
                                                    }
                                                    {
                                                        errors.Phone?.type === "maxLength" && <p className='text-red-500 font-bold'>Phone number not more than 11</p>
                                                    }
                                                </div>
                                            </div>

                                            {/* Password Fields */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                                                        Password <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            autoComplete="new-password"
                                                            className="form-input block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                            type="password"
                                                            {...register('password', {
                                                                required: true,
                                                                minLength: 6,
                                                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                                                            })}
                                                        />
                                                        {
                                                            errors.password?.type === "required" && <p className='text-red-500 font-bold'>Password is Required</p>
                                                        }
                                                        {
                                                            errors.password?.type === "minLength" && <p className='text-red-500 font-bold'>Password not less then 6 digit</p>
                                                        }
                                                        {
                                                            errors.password?.type === "pattern" && <p className='text-red-500 font-bold'>Password must have at least one uppercase letter, at least one lowercase letter,<br /> at least one number,  and at least one special character</p>
                                                        }
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
                                                            type="password"
                                                            {...register('ConfPassword', {
                                                                required: true,
                                                                validate: (value) => value === passwordValue || "Passwords do not match",
                                                            })}
                                                        />
                                                        {errors.ConfPassword && (
                                                            <p className="text-red-500 font-bold">
                                                                {errors.ConfPassword.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="flex w-full justify-center rounded-md border border-transparent bg-primary py-3 px-4 text-base font-semibold text-white shadow-sm hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                                    >
                                                        Registration
                                                    </button>
                                                </div>
                                                <div>
                                                    <SocalLogin></SocalLogin>
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
                                            Already have an account?
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Link
                                        to='/login'
                                        className="flex w-full justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 py-3 px-4 text-base font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        Sign In
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

export default Registration;