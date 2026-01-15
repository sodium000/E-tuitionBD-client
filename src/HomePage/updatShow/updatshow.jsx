/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { MdArrowForward, MdClass, MdLocationPin, MdVerified } from 'react-icons/md';
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

    if (isLoading) return <Loading />;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
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
        <section className="relative pb-15 bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
            <div className="absolute inset-0 z-0 hidden dark:block pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] opacity-50"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                
                <div className="text-center mb-16 space-y-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase"
                    >
                        Expert Educators
                    </motion.h2>
                    <motion.h1 
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white"
                    >
                        Our Pop<span className="text-purple-600 dark:text-purple-400">ular Tutors</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto"
                    >
                        Connect with highly qualified and verified tutors near your area for personalized learning.
                    </motion.p>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {displayedTutors?.map((tutordata, index) => (
                        <motion.div
                            key={tutordata._id || index}
                            variants={cardVariants}
                            className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 dark:hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col h-full overflow-hidden"
                        >
                            <div className="p-6 flex flex-col items-center text-center">
                                <div className="relative mb-4">
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-slate-50 dark:ring-slate-800 group-hover:ring-indigo-50 dark:group-hover:ring-indigo-900/30 transition-all">
                                        <img
                                            alt={tutordata.displayName}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            src={tutordata.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${tutordata.displayName}`}
                                        />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-indigo-600 p-1.5 rounded-lg shadow-lg border-2 border-white dark:border-slate-900">
                                        <MdVerified className="text-white text-xs" />
                                    </div>
                                </div>

                                <h2 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                                    {tutordata.displayName}
                                </h2>
                                <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mt-1 line-clamp-1">
                                    {tutordata.education?.institution || 'Academic Professional'}
                                </p>

                                <div className="w-full mt-5 grid grid-cols-2 gap-2">
                                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-100 dark:border-slate-700">
                                        <MdClass className="text-slate-400 text-sm shrink-0" />
                                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 truncate">
                                            {tutordata?.preferredClass || "General"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-100 dark:border-slate-700">
                                        <MdLocationPin className="text-rose-500 text-sm shrink-0" />
                                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 truncate">
                                            {tutordata.PreferredArea || "Online"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 pb-6 mt-auto">
                                <Link to={`/TutorDetails/${tutordata._id}/tutor`}>
                                    <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.97] hover:bg-indigo-600 dark:hover:bg-indigo-50">
                                        View Profile
                                        <MdArrowForward className="text-lg transition-transform group-hover:translate-x-1" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-16 text-center">
                    <Link to='/Tutors'>
                        <button className="relative px-10 py-4 bg-indigo-600 text-white font-bold rounded-full shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all transform hover:-translate-y-1">
                            Explore All Tutors
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default updatshow;