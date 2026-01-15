/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaArrowLeft, FaBookOpen, FaTimes, FaGraduationCap, FaPhoneAlt, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { useNavigate, useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { TbCurrencyTaka } from "react-icons/tb";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import useRole from "../../hook/useRole";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";

const DetailItem = ({ icon: Icon, label, value }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="flex flex-col items-start p-4 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
    >
        <div className="flex items-center text-gray-400 dark:text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-2">
            <Icon className="text-sm mr-1.5 text-blue-500" />
            {label}
        </div>
        <p className="font-bold text-gray-800 dark:text-slate-200 text-sm md:text-base truncate w-full">{value || "N/A"}</p>
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
                const res = await axiosSecure.get(`/tutor/${id}/tutorDetails`);
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
                TutorName: job.displayName,
                TutorEmail: job.Email,
                TutorId: id,
                status: "Paid",
                StudentEmail: user.email,
                StudentName: user.displayName,
                createdAt: new Date().toISOString()
            };
            const response = await axiosSecure.post('/applications/tutor', applicationData);
            if (response.data.message !== 'Already apply') {
                const paymentInfo = {
                    TutorName: job.displayName,
                    TutorEmail: job.Email,
                    TutorFee: job.expectedMinimumSalary,
                    PostORTutorId: id,
                    StudentEmail: user.email,
                    StudentName: user.displayName
                }
                const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
                window.location.assign(res.data.url);
            }
            setIsModalOpen(false);
            reset();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Already applied!",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <Loading />;
    if (!job) return <div className="text-center py-20 font-bold dark:text-white">Job Not Found</div>;

    return (
        <div className="bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-20 pt-6 px-4 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-gray-500 dark:text-slate-400 hover:text-blue-600 transition-colors font-medium">
                    <FaArrowLeft /> Back to Listings
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 dark:border-slate-800">
                            <div className="flex items-center gap-4 mb-6">
                                <img src={job.photoURL} alt={job.displayName} className="w-16 h-16 rounded-2xl object-cover shadow-md border dark:border-slate-700" />
                                <div>
                                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">{job.displayName || job.name}</h1>
                                    <p className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1"><FaGraduationCap /> {job.role?.toUpperCase()}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                <DetailItem icon={FaUserGraduate} label="Target Class" value={job.Class || "Update processing..."} />
                                <DetailItem icon={FaClock} label="Preferred Time" value={job.preferredTime || 'Update processing...'} />
                                <DetailItem icon={FaCalendarAlt} label="Days/Week" value={`${job.daysPerWeek || "Update processing..."} Days`} />
                                <DetailItem icon={FaChalkboardTeacher} label="Medium/Method" value={job.placeOfLearning || "Update processing..."} />
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4">
                                        <FaBookOpen className="text-blue-500" /> Subjects
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {(Array.isArray(job.preferredClass)
                                            ? job.preferredClass
                                            : job.preferredClass?.split(",").map(s => s.trim()) || []
                                        ).map((sub, i) => (
                                            <span
                                                key={i}
                                                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700"
                                            >
                                                {sub}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border-l-4 border-blue-500">
                                        <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Teaching Preferences</h4>
                                        <ul className="text-blue-800/80 dark:text-blue-400/80 space-y-2 text-sm">
                                            <li><strong className="dark:text-blue-300">Preferred Area:</strong> {job.PreferredArea || job.preferredAreaToTeach}</li>
                                            <li><strong className="dark:text-blue-300">Tuition Region:</strong> {job.TuitionRegion}</li>
                                            <li><strong className="dark:text-blue-300">Current Status:</strong> {job.status}</li>
                                        </ul>
                                    </div>
                                    <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border-l-4 border-purple-500">
                                        <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2">Contact Information</h4>
                                        <p className="text-purple-800/80 dark:text-purple-400/80 text-sm flex items-center gap-2"><FaPhoneAlt /> {job.Phone}</p>
                                        <p className="text-purple-800/80 dark:text-purple-400/80 text-sm mt-1">{job.Email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
                        <div className="sticky top-6 space-y-4">
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 text-center transition-all">
                                <span className="text-gray-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">Expected Salary</span>
                                <div className="flex items-center justify-center text-4xl font-black text-pink-600 dark:text-pink-500 my-2">
                                    <TbCurrencyTaka />{job.expectedMinimumSalary || 'Update processing...'}
                                </div>
                                <p className="text-gray-500 dark:text-slate-400 text-xs italic mb-6">Posted: {job.createdAt}</p>

                                {user ? (
                                    role === "student" ? (
                                        <button onClick={() => setIsModalOpen(true)} className="w-full py-4 bg-pink-600 text-white rounded-2xl font-bold hover:bg-pink-700 transition-all shadow-lg shadow-pink-200 dark:shadow-pink-900/20">
                                            Contact Tutor
                                        </button>
                                    ) : (
                                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-xl border border-amber-100 dark:border-amber-900/30">
                                            Only Students/Guardians can contact
                                        </div>
                                    )
                                ) : (
                                    <Link to="/login" className="block w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-center">
                                        Login to Contact
                                    </Link>
                                )}
                            </div>

                            <div className="bg-slate-900 dark:bg-indigo-950 p-6 rounded-3xl text-white">
                                <h4 className="font-bold mb-4 flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-red-500" /> Current District
                                </h4>
                                <p className="text-3xl font-bold text-white mb-2">{job.selectDistrict}</p>
                                <p className="text-slate-400 dark:text-slate-300 text-sm">Available for sessions in {job.PreferredArea}.</p>
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
                            className="bg-white dark:bg-slate-900 rounded-4xl w-full max-w-lg overflow-hidden shadow-2xl border dark:border-slate-800"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="bg-slate-50 dark:bg-slate-800 px-8 py-6 flex justify-between items-center border-b border-gray-100 dark:border-slate-700">
                                <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">Contact Request</h2>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-full transition-colors">
                                    <FaTimes className="text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit(onSubmitApplication)} className="p-8 space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-2">Short Message</label>
                                    <textarea
                                        {...register("comment", { required: true })}
                                        className="w-full p-4 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-pink-500 h-24 dark:text-slate-200 outline-none"
                                        placeholder="Briefly describe your requirements..."
                                    />
                                </div>
                                <button disabled={isSubmitting} className="w-full py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-bold hover:bg-black dark:hover:bg-slate-200 transition-all disabled:opacity-50">
                                    {isSubmitting ? "Sending..." : "Confirm Request"}
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