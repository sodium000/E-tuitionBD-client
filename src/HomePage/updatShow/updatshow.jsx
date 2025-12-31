/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { MdArrowForward, MdClass, MdLocationPin, MdSchool, MdVerified } from 'react-icons/md';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Loading from '../../Component/Loading/Loading';
import useAxiosSecure from '../../hook/useAxiosSecure';

const updatshow = () => {
    const axiosSecure = useAxiosSecure();
    const { data: tutor, isLoading } = useQuery({
        queryKey: ['tutor'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tutor/data`);
            return res.data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1 // Cards will appear one by one
            }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const displayedTutors = tutor?.slice(0, 8);
    return (
        <div className='my-30'>
            <div className=' text-center font-bold text-5xl '>
                Our Pop<span className='text-purple-800'>ular Tutors</span>
                <p className='text-xl font-bold mt-6'>Find Our Best Tutor</p>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayedTutors?.map((tutordata, index) => (
                        <motion.div
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            key={tutordata._id || index}
                            className="group bg-white rounded-3xl border border-slate-200 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col h-full relative overflow-hidden"
                        >
                            <div className="p-5 flex flex-col items-center text-center">
                                <div className="relative mb-4">
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-slate-50 group-hover:ring-blue-50 transition-all">
                                        <img
                                            alt={tutordata.displayName}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            src={tutordata.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${tutordata.displayName}`}
                                        />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-blue-600 p-1 rounded-lg shadow-lg border-2 border-white">
                                        <MdVerified className="text-white text-[10px]" />
                                    </div>
                                </div>

                                <h2 className="text-base font-bold text-slate-900 line-clamp-1">
                                    {tutordata.displayName}
                                </h2>
                                <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-tight mt-1 line-clamp-1">
                                    {tutordata.education?.institution || 'Update processing...'}
                                </p>
                                <div className="w-full mt-4 grid grid-cols-2 gap-2">
                                    <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                                        <MdClass className="text-slate-400 text-sm shrink-0" />
                                        <span className="text-[10px] font-bold text-slate-600 truncate">
                                            {tutordata?.preferredClass || "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                                        <MdLocationPin className="text-rose-400 text-sm shrink-0" />
                                        <span className="text-[10px] font-bold text-slate-600 truncate">
                                            {tutordata.PreferredArea || "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="px-5 pb-5 mt-auto">
                                <Link to={`/TutorDetails/${tutordata._id}/tutor`}>
                                    <button className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.97] shadow-sm">
                                        View Profile
                                        <MdArrowForward className="text-lg transition-transform group-hover:translate-x-1" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Link to='/Tutors'>
                <div className="mt-10 text-center">
                    <button className="bg-[#8E44AD] hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-[0_0_15px_rgba(142,68,173,0.4)] transition-all duration-300 transform hover:-translate-y-1">
                        View all Tutor
                    </button>
                </div>
            </Link>
        </div>
    );
};

export default updatshow;