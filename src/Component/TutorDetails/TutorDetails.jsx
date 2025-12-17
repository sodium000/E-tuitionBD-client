
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
    FaUserGraduate,
    FaClock,
    FaBookOpen,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaChevronLeft,
    FaCheckCircle
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../hook/useAxiosSecure';
import Loading from '../Loading/Loading';
import useAuth from '../../hook/useAuth';

const TutorDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    let navigate = useNavigate();
    const {user} = useAuth();
    console.log(user)



    const { data: tutorDetails, isLoading } = useQuery({
        queryKey: ['tutorDetails'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tutor/${id}/tutorDetails`);
            return res.data;
        }
    });

    console.log(tutorDetails);



    const handleGoBack = () => {    
        navigate(-1)
    };


    const handleApply = async() => {
        const paymentInfo = {
            TutorName : tutorDetails.displayName,
            TutorFee : tutorDetails.expectedMinimumSalary,
            TutorId : tutorDetails._id,
            StudentName : user.displayName,
            StudentEmail : user.email
        }

        const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);

        console.log(res.data);
        
        window.location.assign(res.data.url);
    };

    const renderDetailItem = (Icon, title, value) => (
        <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-xl mr-3 mt-1 text-blue-600">
                <Icon />
            </div>
            <div>
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">{title}</h3>
                <p className="text-gray-700 font-medium">{value}</p>
            </div>
        </div>
    );

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div>
            <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
                <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">

                    {/* Action Buttons Section */}
                    <div className="flex justify-between p-4 border-b border-gray-200">
                        <button
                            onClick={handleGoBack}
                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150"
                        >
                            <FaChevronLeft className="mr-2" /> Go Back
                        </button>
                        <button
                            onClick={handleApply}
                            className="flex items-center px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition duration-150"
                        >
                            <FaCheckCircle className="mr-2" /> Apply Now
                        </button>
                    </div>

                    <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-blue-700 text-white">

                        {/* Image Section */}
                        <div className="md:col-span-1 flex justify-center">
                            <img
                                src={tutorDetails.photoURL}
                                alt={`Profile of ${tutorDetails.photoURL}`}
                                className="w-48 h-48 rounded-full border-4 border-white object-cover shadow-lg"
                            />
                        </div>

                        {/* Name and Title */}
                        <div className="md:col-span-2 text-center md:text-left">
                            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter">
                                {tutorDetails.displayName}
                            </h1>
                            <p className="mt-2 text-blue-200 text-xl font-light">
                                Advanced STEM Educator & Consultant
                            </p>
                        </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-10">


                        <section>
                            <h2 className="text-2xl font-bold mb-5 text-gray-800">🎯 Key Tutoring Preferences</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                                {renderDetailItem(FaClock, "Preferred Time", tutorDetails.preferredTime)}
                                {renderDetailItem(FaMapMarkerAlt, "Learning Place", tutorDetails.placeOfLearning)}
                                {renderDetailItem(FaCalendarAlt, "Days Per Week", `${tutorDetails.daysPerWeek} Days`)}
                                {renderDetailItem(FaMoneyBillWave, "Minimum Salary", tutorDetails.expectedMinimumSalary)}
                                {renderDetailItem(FaBookOpen, "Preferred Class", tutorDetails.preferredClass)}
                                {renderDetailItem(FaMapMarkerAlt, "Area to Teach", tutorDetails.preferredAreaToTeach)}

                            </div>
                        </section>

                        <hr className="border-gray-200" />

                        {/* 2. Education Section */}
                        <section>
                            <h2 className="text-2xl font-bold mb-5 text-gray-800 flex items-center">
                                <FaUserGraduate className="mr-3 text-3xl text-blue-600" />
                                Education Background
                            </h2>
                            <div className="space-y-6">
                                <div className="pl-6 border-l-4 border-blue-400 relative">
                                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full ring-4 ring-white"></div>
                                    <p className="font-bold text-xl text-gray-800">{tutorDetails.education.degree}</p>
                                    <p className="text-base italic text-gray-600">{tutorDetails.education.institution}</p>
                                    <p className="text-sm text-gray-500 mt-1">Graduated: {tutorDetails.education.year}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorDetails;