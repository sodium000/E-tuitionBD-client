/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUser, FaUsers, FaBookOpen, FaMoneyBillWave, FaArrowLeft, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Loading from "../Loading/Loading";
import useAuth from "../../hook/useAuth";
import { TbCurrencyTaka } from "react-icons/tb";

const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex flex-col items-start p-3 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center text-gray-500 text-xs uppercase tracking-wider mb-1">
            <Icon className="text-base mr-1 text-blue-500" />
            {label}:
        </div>
        <p className="font-bold text-base text-blue-700 mt-1">{value}</p>
    </div>
);

const Tag = ({ text }) => (
    <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
        {text}
    </span>
);

const JobDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate()


    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getTimeAgo = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
        return formatDate(dateString);
    }


    const fetedata = async () => {
        try {
            setLoading(true);
            axiosSecure.get(`/post/${id}`)
                .then(res => {
                    if (res.data) {
                        setJobs(res.data);
                    }
                })
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetedata();
    }, []);

    console.log(jobs)

    const getSubjects = (subject) => {
        if (!subject) return [];
        if (Array.isArray(subject)) return subject;
        if (typeof subject === "string") {
            return subject.split(",").map((s) => s.trim()).filter(Boolean);
        }
        return [subject];
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            {
                loading ? <div className="flex justify-center"><Loading></Loading></div>
                    :
                    <div className="bg-gray-50 min-h-screen font-sans antialiased pb-20">
                        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                            <div className="flex flex-col lg:flex-row gap-8">

                                <div className="lg:w-2/3 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                    <header className="p-6 md:p-8 border-b border-gray-100 text-center">
                                        <h1 className="text-3xl font-extrabold text-blue-800 mb-2 leading-tight">
                                            Tutor Needed For {jobs.Medium}
                                        </h1>
                                        <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
                                            <span>
                                                Job ID: <span className="font-semibold text-gray-700">{jobs._id ? jobs._id.slice(-6).toUpperCase() : "N/A"}</span>
                                            </span>
                                            <span className="text-gray-300">•</span>
                                            <span>
                                                Posted: <span className="font-semibold text-gray-700">{formatDate(jobs.createdAt)}</span>
                                            </span>
                                        </div>

                                        <div className="mt-6 flex flex-col items-center">
                                            <FaMapMarkerAlt className="text-red-500 text-4xl mb-1" />
                                            <h2 className="text-xl font-bold text-gray-800">
                                                {jobs.selectDistrict}
                                            </h2>
                                        </div>
                                    </header>

                                    <section className="p-6 md:p-8">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            <DetailItem icon={FaUserGraduate} label="Medium" value={jobs.Medium} />
                                            <DetailItem icon={FaBookOpen} label="Class" value={jobs.Class} />
                                            <DetailItem icon={FaUser} label="Student Gender" value={jobs.studentgender || "N/A"} />
                                            <DetailItem icon={FaChalkboardTeacher} label="Preferred Tutor" value={jobs.Gender} />
                                            <DetailItem icon={FaCalendarAlt} label="Tutoring Days" value={`${jobs.Day} Days`} />
                                            <DetailItem icon={FaClock} label="Post Time" value={getTimeAgo(jobs.createdAt)} />
                                            <DetailItem icon={FaClock} label="Duration" value="1 Hours" />
                                            <DetailItem icon={FaUsers} label="No of Students" value={`${jobs.numberstudent || "N/A"} Days`} />
                                        </div>

                                        <div className="w-full h-px bg-gray-100 my-8"></div>

                                        {/* Subjects */}
                                        <div className="mb-8">
                                            <div className="flex items-center text-sm font-semibold text-gray-600 mb-3">
                                                <FaBookOpen className="text-lg mr-2 text-teal-600" />
                                                Required Subjects:
                                            </div>
                                            <div className="flex flex-wrap gap-3">
                                                {getSubjects(jobs.Subject).length > 0 ? (
                                                    getSubjects(jobs.Subject).map((subject, index) => (
                                                        <Tag key={index} text={subject} />
                                                    ))
                                                ) : (
                                                    <span className="text-text-secondary-light text-xs">N/A</span>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center font-bold text-gray-700 mb-3">
                                                <FaBookOpen className="text-xl mr-2 text-blue-700" />
                                                Other Requirements:
                                            </div>
                                            <p className="text-base text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                                                **Highly experienced tutors (PUBLIC) are requested to apply.** Location details: Sector - 10, Road - 21.
                                            </p>
                                        </div>
                                    </section>
                                </div>

                                {/* Sidebar */}
                                <div className="lg:w-1/3 flex flex-col gap-6">
                                    <div className="lg:sticky lg:top-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
                                        <div className="flex items-center justify-center text-lg font-bold text-gray-700 mb-2">
                                            <FaMoneyBillWave className="text-2xl mr-2 text-pink-600" /> Monthly Salary:
                                        </div>
                                        <p className="flex items-center text-4xl font-extrabold text-pink-600 mt-2">
                                            <TbCurrencyTaka />{jobs.Salary}
                                            <span className="text-lg font-normal text-gray-500 ml-1">/Month</span>
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        {
                                            user ? <button className="w-full bg-pink-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-pink-700 transition transform hover:scale-105 flex items-center justify-center gap-2 text-lg">
                                                Apply for this job
                                            </button> :
                                                <Link to='/login'>
                                                    <button className="w-full bg-pink-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-pink-700 transition transform hover:scale-105 flex items-center justify-center gap-2 text-lg">
                                                        Login Fast For Apply 
                                                    </button>
                                                </Link>
                                        }

                                        <button onClick={() => navigate(-1)} className="w-full bg-white text-gray-600 border border-gray-300 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-2">
                                            <FaArrowLeft /> Go Back to All Jobs
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>

    );
};



export default JobDetails;

