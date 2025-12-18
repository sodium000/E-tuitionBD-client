/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUser, FaUsers, FaBookOpen, FaMoneyBillWave, FaArrowLeft, FaUserGraduate, FaChalkboardTeacher, FaTimes, FaSearch } from "react-icons/fa";
import { useNavigate, useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion"; // Added for animations
import { useForm } from "react-hook-form";
import { TbCurrencyTaka } from "react-icons/tb";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import useRole from "../../hook/useRole";
import Loading from "../Loading/Loading";

const DetailItem = ({ icon: Icon, label, value }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="flex flex-col items-start p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
    >
        <div className="flex items-center text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-2">
            <Icon className="text-sm mr-1.5 text-blue-500" />
            {label}
        </div>
        <p className="font-bold text-gray-800 text-sm md:text-base truncate w-full">{value}</p>
    </motion.div>
);

const JobDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subjectSearch, setSubjectSearch] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();
    const { role } = useRole();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                const res = await axiosSecure.get(`/post/${id}`);
                setJob(res.data);
            } catch (error) {
                console.error("Error fetching job:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const onSubmitApplication = async (data) => {
        try {
            setIsSubmitting(true);
            const applicationData = {
                ...data,
                tutorName: user.displayName,
                tutorEmail: user.email,
                postId: id,
                status: "Pending",
                createdAt: new Date().toISOString()
            };
            const response = await axiosSecure.post('/applications', applicationData);
            if (response.data.insertedId) {
                alert("Application Sent!");
                setIsModalOpen(false);
                reset();
            }
        }  finally {
            setIsSubmitting(false);
        }
    };

    const getFilteredSubjects = () => {
        if (!job?.Subject) return [];
        const subjects = Array.isArray(job.Subject) ? job.Subject : job.Subject.split(",").map(s => s.trim());
        return subjects.filter(s => s.toLowerCase().includes(subjectSearch.toLowerCase()));
    };

    if (loading) return <Loading />;
    if (!job) return <div className="text-center py-20 font-bold">Job Not Found</div>;

    return (
        <div className="bg-slate-50 min-h-screen pb-20 pt-6 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium">
                    <FaArrowLeft /> Back to Listings
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                                    {job.Medium} Medium
                                </span>
                                <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                                    {job._id.slice(-6).toUpperCase()}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                                Tutor Needed for <span className="text-blue-600 font-black">{job.Class}</span> Students
                            </h1>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                <DetailItem icon={FaUserGraduate} label="Class" value={job.Class} />
                                <DetailItem icon={FaChalkboardTeacher} label="Tutor Gender" value={job.Gender} />
                                <DetailItem icon={FaCalendarAlt} label="Days/Week" value={`${job.Day} Days`} />
                                <DetailItem icon={FaUsers} label="Students" value={job.numberstudent || "1"} />
                            </div>

                            <div className="space-y-8">
                                {/* Subjects with Search */}
                                <div>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            <FaBookOpen className="text-blue-500" /> Required Subjects
                                        </h3>
                                        <div className="relative">
                                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                            <input
                                                type="text"
                                                placeholder="Search subjects..."
                                                className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
                                                onChange={(e) => setSubjectSearch(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {getFilteredSubjects().map((sub, i) => (
                                            <motion.span
                                                initial={{ scale: 0.9 }}
                                                animate={{ scale: 1 }}
                                                key={i}
                                                className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200"
                                            >
                                                {sub}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 bg-blue-50 rounded-2xl border-l-4 border-blue-500">
                                    <h4 className="font-bold text-blue-900 mb-2">Requirement Details</h4>
                                    <p className="text-blue-800/80 leading-relaxed text-sm md:text-base">
                                        Highly experienced tutors are requested to apply. Preferred location: <span className="font-bold">{job.selectDistrict}</span>.
                                        {job.Requirements || "Please be punctual and professional."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sticky Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="sticky top-6 space-y-4">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Monthly Salary</span>
                                <div className="flex items-center justify-center text-5xl font-black text-pink-600 my-2">
                                    <TbCurrencyTaka />{job.Salary}
                                </div>
                                <p className="text-gray-500 text-sm">Negotiable based on experience</p>

                                <div className="mt-8 space-y-3">
                                    {user ? (
                                        role === "tutor" ? (
                                            <button onClick={() => setIsModalOpen(true)} className="w-full py-4 bg-pink-600 text-white rounded-2xl font-bold text-lg hover:bg-pink-700 transition-all shadow-lg shadow-pink-200 active:scale-95">
                                                Apply Now
                                            </button>
                                        ) : (
                                            <div className="p-3 bg-amber-50 text-amber-700 text-xs font-bold rounded-xl border border-amber-100">
                                                Only Tutor accounts can apply
                                            </div>
                                        )
                                    ) : (
                                        <Link to="/login" className="block w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg text-center">
                                            Login to Apply
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div className="bg-slate-900 p-6 rounded-3xl text-white">
                                <h4 className="font-bold mb-4 flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-red-500" /> Location Info
                                </h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Located in {job.selectDistrict}. More specific details like road/house number will be shared once your application is shortlisted.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-4xl w-full max-w-lg overflow-hidden shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="bg-slate-50 px-8 py-6 flex justify-between items-center border-b border-gray-100">
                                <h2 className="text-xl font-black text-slate-800">Quick Application</h2>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors">
                                    <FaTimes className="text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit(onSubmitApplication)} className="p-8 space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Qualifications</label>
                                    <textarea
                                        {...register("qualifications", { required: true })}
                                        className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500 h-24"
                                        placeholder="Major, University, Current Status..."
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Exp. (Years)</label>
                                        <input type="number" {...register("experience", { required: true })} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Exp. Salary</label>
                                        <input type="number" {...register("expectedSalary", { required: true })} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500" />
                                    </div>
                                </div>
                                <button disabled={isSubmitting} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all disabled:opacity-50">
                                    {isSubmitting ? "Sending..." : "Confirm Application"}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default JobDetails;