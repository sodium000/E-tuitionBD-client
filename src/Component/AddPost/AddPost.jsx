import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { BiBookOpen, BiCalendar } from 'react-icons/bi';
import { CiLocationArrow1, CiLocationOn } from 'react-icons/ci';
import { FaDollarSign, FaGraduationCap, FaUserSecret } from 'react-icons/fa6';
import { GiSparkles } from 'react-icons/gi';
import { IoManSharp } from 'react-icons/io5';
import { TbHomeDot } from 'react-icons/tb';
import { useLoaderData } from 'react-router';
import useAxiosSecure from '../../hook/useAxiosSecure';


const AddPost = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const TuitionRegion = useWatch({ control, name: 'TuitionRegion' });
    const axiosSecure = useAxiosSecure();

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];

    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }


    const handelTution = (data) => {
        console.log(data)
        console.log(typeof(data))
        axiosSecure.post('/post', data)
            .then(res => {
                if (res.data.insertedId) {
                    console.log('user created in the database');
                }
            })

    }
    return (
        <div>
            <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                </div>

                <form onSubmit={handleSubmit(handelTution)} className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-2xl">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-purple-600 via-pink-500 to-indigo-600 rounded-2xl mb-6 shadow-lg transform hover:rotate-6 transition-transform duration-300">
                            <FaGraduationCap className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <GiSparkles className="w-6 h-6 text-purple-600" />
                            <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
                                Tutoring Post
                            </h1>
                            <GiSparkles className="w-6 h-6 text-pink-500" />
                        </div>
                        <p className="text-gray-600 text-lg">Make your personalized tutoring Post</p>
                    </div>
                    <div className="space-y-6">
                        {/*  Medium */}
                        <div className="group">
                            <label className="flex items-center text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                <div className="w-8 h-8 bg-linear-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-3">
                                    <TbHomeDot className="w-4 h-4 text-purple-600" />
                                </div>
                                Medium
                            </label>
                            <select
                                defaultValue=''
                                {...register("Medium", {
                                    required: true
                                })}
                                className="w-full px-5 py-4 bg-linear-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all outline-none text-lg font-medium cursor-pointer"
                            >
                                <option disabled value="">Select  Medium</option>
                                <option >Bangla  Medium</option>
                                <option>English  Medium</option>
                            </select>
                            {errors.Medium && <p className="mt-2 text-sm text-red-500 font-medium">Medium is required</p>}
                        </div>
                        {/* Class Input */}
                        <div className="group">
                            <label className="flex items-center text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                <div className="w-8 h-8 bg-linear-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-3">
                                    <BiBookOpen className="w-4 h-4 text-purple-600" />
                                </div>
                                Class / Grade
                            </label>
                            <input
                                type="text"
                                {...register('Class', {
                                    required: true
                                })}
                                placeholder="e.g., Grade 10, Year 12, Class IX"
                                className="w-full px-5 py-4 bg-linear-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all outline-none text-lg font-medium placeholder:text-gray-400"
                            />
                            {errors.Class && <p className="mt-2 text-sm text-red-500 font-medium">class is required</p>}
                        </div>

                        {/* Salary Input */}
                        <div className="group">
                            <label className="flex items-center text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                <div className="w-8 h-8 bg-linear-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center mr-3">
                                    <FaDollarSign className="w-4 h-4 text-pink-600" />
                                </div>
                                Salary Per Session
                            </label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">৳</span>
                                <input
                                    type="number"
                                    placeholder="500"
                                    {...register("Salary", {
                                        required: true
                                    })}
                                    className="w-full pl-12 pr-5 py-4 bg-linear-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 focus:bg-white transition-all outline-none text-lg font-medium placeholder:text-gray-400"
                                />
                            </div>
                            {errors.Salary && <p className="mt-2 text-sm text-red-500 font-medium">Salary is required</p>}
                        </div>

                        {/* Subject Select */}
                        <div className="group">
                            <label className="flex items-center text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                <div className="w-8 h-8 bg-linear-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center mr-3">
                                    <BiBookOpen className="w-4 h-4 text-indigo-600" />
                                </div>
                                Subject
                            </label>
                            <input
                                placeholder='Name your subject'
                                {...register('Subject', {
                                    required: true
                                })}
                                className="w-full px-5 py-4 bg-linear-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all outline-none text-lg font-medium "
                            >
                            </input>
                            {errors.Subject && <p className="mt-2 text-sm text-red-500 font-medium">Subject is required</p>}
                        </div>

                        {/* Tutoring Type Select */}
                        <div className="group">
                            <label className="flex items-center text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                <div className="w-8 h-8 bg-linear-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-3">
                                    <FaUserSecret className="w-4 h-4 text-purple-600" />
                                </div>
                                Tutoring Type
                            </label>
                            <select
                                defaultValue=''
                                {...register('Tutoring', {
                                    required: true
                                })}
                                className="w-full px-5 py-4 bg-linear-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all outline-none text-lg font-medium cursor-pointer"
                            >
                                <option disabled value="">Select type</option>
                                <option > Online</option>
                                <option > In-Person</option>
                            </select>
                            {errors.Tutoring && <p className="mt-2 text-sm text-red-500 font-medium">Tutoring is required </p>}
                        </div>

                        {/* Gender */}
                        <div className="group">
                            <label className="flex items-center text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                <div className="w-8 h-8 bg-linear-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-3">
                                    <IoManSharp className="w-4 h-4 text-purple-600" />
                                </div>
                                Gender
                            </label>
                            <select
                                defaultValue=''
                                {...register('Gender', {
                                    required: true
                                })}
                                className="w-full px-5 py-4 bg-linear-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all outline-none text-lg font-medium cursor-pointer"
                            >
                                <option disabled value="" >Select type</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            {errors.Gender && <p className="mt-2 text-sm text-red-500 font-medium">Gender is required</p>}
                        </div>

                        {/* Location */}
                        <div className="group">
                            <label className="flex items-center text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                <div className="w-8 h-8 bg-linear-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-3">
                                    <CiLocationOn className="w-4 h-4 text-purple-600" />
                                </div>
                                Location
                            </label>
                            <select
                                defaultValue=''
                                className="w-full px-5 py-4 bg-linear-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all outline-none text-lg font-medium cursor-pointer"
                                {...register('TuitionRegion', { required: true })}
                            >
                                <option disabled value="" >Select type</option>
                                {regions.map((r, i) => (
                                    <option key={i} value={r}>{r}</option>
                                ))}
                            </select>
                            {errors.TuitionRegion && <p className="mt-2 text-sm text-red-500 font-medium">Location is required</p>}
                        </div>

                        {/* area */}
                        <div className="group">
                            <label className="flex items-center text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                <div className="w-8 h-8 bg-linear-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-3">
                                    <CiLocationArrow1 className="w-4 h-4 text-purple-600" />
                                </div>
                                Districts
                            </label>
                            <select
                                defaultValue=''
                                className="w-full px-5 py-4 bg-linear-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all outline-none text-lg font-medium cursor-pointer"
                                {...register('selectDistrict', { required: true })}
                            >
                                <option disabled value="" >Select type</option>
                                {
                                    districtsByRegion(TuitionRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                            {errors.selectDistrict && <p className="mt-2 text-sm text-red-500 font-medium">Area is requried</p>}
                        </div>

                        {/* Day Select */}
                        <div className="group">
                            <label className="flex items-center text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                <div className="w-8 h-8 bg-linear-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center mr-3">
                                    <BiCalendar className="w-4 h-4 text-pink-600" />
                                </div>
                                Preferred Day
                            </label>
                            <input
                                placeholder='How many day you need'
                                name="day"
                                {...register('Day', {
                                    required: true
                                })}
                                className="w-full px-5 py-4 bg-linear-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 focus:bg-white transition-all outline-none text-lg font-medium "
                            >
                            </input>
                            {errors.Day && <p className="mt-2 text-sm text-red-500 font-medium">Day is required</p>}
                        </div>

                        <button
                            type='submit'
                            className="w-full bg-linear-to-r from-purple-600 via-pink-500 to-indigo-600 text-white font-bold text-lg py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 active:scale-100 transition-all duration-200 mt-8"
                        >
                            Submit Registration ✨
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPost;