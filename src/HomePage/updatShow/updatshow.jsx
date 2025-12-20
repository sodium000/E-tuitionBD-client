/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { MdArrowForward, MdLocationPin, MdSchool } from 'react-icons/md';
import { Link } from 'react-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Loading from '../../Component/Loading/Loading';

const updatshow = () => {
    const { data: tutor, isLoading } = useQuery({
        queryKey: ['tutor'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/tutor/data`, {
                withCredentials: false,
            });
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
    return (
        <div className='my-30'>
            <div className=' text-center font-bold text-5xl '>
                Our Pop<span className='text-purple-800'>ular Tutors</span>
                <p className='text-xl font-bold mt-6'>Find Our Best Tutor</p>
            </div>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center "
            >
                {tutor?.slice(0, 6).map((tutordata, index) => {
                    return (
                        <motion.div
                            variants={cardVariants}
                            key={tutordata._id || index}
                            className="w-full mt-10 max-w-xs sm:max-w-sm  rounded-3xl shadow-3xl  border border-purple-700 overflow-hidden relative group transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl dark:hover:shadow-primary/40"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="flex flex-col items-center pt-10 px-8 pb-25">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-[6px] border-purple-400/40 shadow-2xl">
                                        <img
                                            alt={`Profile of ${tutordata.displayName}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            src={tutordata.photoURL || "https://via.placeholder.com/128/8B006D/FFFFFF?text=RH"}
                                        />
                                    </div>
                                </div>

                                <h2 className="text-2xl font-black  tracking-tight mb-2 text-center">
                                    {tutordata.displayName}
                                </h2>

                                <div className="flex items-center gap-2 text-white text-sm mb-3 bg-pink-400 px-4 py-1 rounded-full">
                                    <MdSchool className="text-primary text-lg" />
                                    <span className="font-medium truncate max-w-[200px]">
                                        {tutordata.education?.institution || 'updating tutor...'}
                                    </span>
                                </div>

                                <div className="w-full space-y-3">
                                    <div className="flex items-center justify-between bg-primary/30 py-2 px-5 mx-4 rounded-2xl border border-primary/10">
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Class</span>
                                        <span className="text-sm font-extrabold text-primary uppercase">
                                            {tutordata?.preferredClass || "updating tutor..."}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between bg-slate-400 p-2 px-5 rounded-2xl border border-slate-100">
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Location</span>
                                        <div className="flex items-center text-slate-900 dark:text-slate-200">
                                            <MdLocationPin className="text-primary mr-1" />
                                            <span className="text-sm font-bold uppercase">{tutordata.PreferredArea}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-linear-to-t from-purple-700 via-pink-300/90  to-transparent">
                                <Link to={`/TutorDetails/${tutordata._id}/tutor`}>
                                    <button className="w-full h-12 dark:bg-primary text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:gap-5 hover:bg-primary dark:hover:bg-white dark:hover:text-primary shadow-lg active:scale-95">
                                        View Profile
                                        <MdArrowForward className="text-2xl" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
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