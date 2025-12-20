
/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    FaUser,
    FaGraduationCap,
    FaClock,
    FaBookOpen,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaGlobe,
} from 'react-icons/fa';
import { SiGoogleclassroom } from "react-icons/si";
import useAuth from '../../hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hook/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const TutorApplicationForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm({
        defaultValues: {
            education: [{ degree: '', institution: '', year: '' }]
        }
    });

    const educationFields = watch('education');
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: tutorData } = useQuery({
        queryKey: ['tutorData', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/tutor/${user.email}/data`);
            return res.data;
        },
    });



    useEffect(() => {
        if (tutorData) {
            reset({
                name: tutorData.displayName || '',
                preferredAreaToTeach: tutorData.PreferredArea || ''
            });
        }
    }, [reset, tutorData]);


    const onSubmit = (data) => {
        console.log('tonmoy')
        axiosSecure.patch(`/tutor/${user.email}/dataupdate`, data)
            .then(res => {
                if (res.data) {
                    Swal.fire({
                        title: "Tutor Update",
                        icon: "success",
                        draggable: true
                    });
                    reset();
                    navigate('/')
                }
            })
    };



    const InputField = ({ icon: Icon, label, value, read, name, type = 'text', required = true, min = null, max = null }) => (
        <div className="flex flex-col space-y-1">
            <label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center">
                <Icon className="mr-2 text-blue-500" />
                {label} {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                id={name}
                type={type}
                value={value}
                readOnly={read}
                {...register(name, {
                    required: required ? `${label} is required` : false,
                    min: min ? { value: min, message: `Minimum value is ${min}` } : {},
                    max: max ? { value: max, message: `Maximum value is ${max}` } : {},
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-6 sm:p-10">

                <h1 className="text-3xl font-extrabold text-gray-900 mb-2 border-b pb-2">
                    Tutor Profile Application
                </h1>
                <p className="text-gray-500 mb-8">
                    Please fill out all required fields to complete your profile.
                </p>

                {/* 1. Personal & General Info Section */}
                <section className="space-y-6 mb-8">
                    <h2 className="text-xl font-bold text-blue-700 flex items-center mb-4">
                        <FaUser className="mr-2" /> Personal & Availability
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Full Name */}
                        <InputField icon={FaUser} read={true} label="Full Name" name="name" />

                        {/* Preferred Area to Teach */}
                        <InputField icon={FaGlobe} read={true} label="Preferred Area to Teach (e.g., Physics, History)" name="preferredAreaToTeach" />

                        {/* Preferred Time */}
                        <InputField icon={FaClock} label="Preferred Time (e.g., 4 PM - 8 PM)" name="preferredTime" />

                        {/* Days Per Week */}
                        <InputField icon={FaCalendarAlt} label="Days Per Week (1-7)" name="daysPerWeek" type="number" min={1} max={7} />

                        {/* Place of Learning */}
                        <InputField icon={FaMapMarkerAlt} label="Place of Learning (e.g., Online, Student's Home)" name="placeOfLearning" />

                        {/* Expected Minimum Salary */}
                        <InputField icon={FaMoneyBillWave} label="Expected Minimum Salary (e.g., $50/hour)" name="expectedMinimumSalary" />

                        <InputField icon={SiGoogleclassroom} label="Which class" name="Class" />

                    </div>
                </section>

                <section className="space-y-4 mb-8">
                    <h2 className="text-xl font-bold text-blue-700 flex items-center mb-4 border-t pt-4">
                        <FaBookOpen className="mr-2" /> Subjects of Expertise
                    </h2>

                    <div className="flex flex-col space-y-1">
                        <label htmlFor="preferredClass" className="text-sm font-medium text-gray-700 flex items-center">
                            Preferred Class/Subjects <span className="text-red-500 ml-1">*</span>
                        </label>
                        <textarea
                            id="preferredClass"
                            {...register("preferredClass", { required: "Preferred classes/subjects are required" })}
                            rows="3"
                            placeholder="List your subjects and grade levels, e.g., High School AP Calculus, Middle School Science, SAT Math Prep."
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${errors.preferredClass ? 'border-red-500' : 'border-gray-300'}`}
                        ></textarea>
                        {errors.preferredClass && <p className="text-red-500 text-xs mt-1">{errors.preferredClass.message}</p>}
                    </div>
                </section>

                <section className="space-y-4 mb-8">
                    <h2 className="text-xl font-bold text-blue-700 flex items-center mb-4 border-t pt-4">
                        <FaGraduationCap className="mr-2" /> Education Background
                    </h2>

                    <div className="border border-blue-200 p-4 rounded-lg bg-blue-50">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Highest Degree
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div>
                                <label className="text-xs font-medium text-gray-600">
                                    Degree Name*
                                </label>
                                <input
                                    {...register('education.degree', { required: "Degree is required" })}
                                    placeholder="e.g., BSc in Mathematics"
                                    className={`w-full px-3 py-2 border rounded-lg ${errors.education?.degree ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-600">
                                    Institution*
                                </label>
                                <input
                                    {...register('education.institution', { required: "Institution is required" })}
                                    placeholder="e.g., University of Dhaka"
                                    className={`w-full px-3 py-2 border rounded-lg ${errors.education?.institution ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                            </div>

                            {/* Year */}
                            <div>
                                <label className="text-xs font-medium text-gray-600">
                                    Graduation Year*
                                </label>
                                <input
                                    type="number"
                                    {...register('education.year', {
                                        required: "Year is required",
                                        max: {
                                            value: new Date().getFullYear(),
                                            message: "Year cannot be in the future"
                                        }
                                    })}
                                    placeholder="e.g., 2020"
                                    className={`w-full px-3 py-2 border rounded-lg ${errors.education?.year ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                            </div>

                        </div>
                    </div>
                </section>

                {/* Submit Button */}
                <div className="pt-6 border-t mt-8">
                    <button
                        type="submit"
                        className="w-full px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Submit Tutor Application
                    </button>
                </div>

            </form>
        </div>
    );
};

export default TutorApplicationForm;