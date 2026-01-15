/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaArrowRight, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';

const CTA = () => {
    return (
        <section className="relative py-5 bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-50 dark:bg-purple-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-8 md:p-20">
                    <div className="absolute top-0 right-0 mt-[-50px] mr-[-50px] w-64 h-64 bg-linear-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-left space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">
                                    Join the Community
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                                Empowering Your <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                                    Academic Success
                                </span>
                            </h2>

                            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed font-medium">
                                Whether you're a student looking for guidance or a tutor ready to share knowledge, eTuitionBd is your gateway to excellence.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link to="/Tutors">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all flex items-center gap-3"
                                    >
                                        Find a Tutor <FaArrowRight />
                                    </motion.button>
                                </Link>
                                <Link to="/TutionPost">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-black rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                                    >
                                        Post a Job
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="space-y-4">
                                <div className="p-6 bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 group">
                                    <div className="w-12 h-12 mb-4 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <FaGraduationCap size={24} />
                                    </div>
                                    <div className="text-3xl font-black text-slate-900 dark:text-white">10k+</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Students</div>
                                </div>
                                <div className="p-6 bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm translate-x-6">
                                    <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">98%</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Success Rate</div>
                                </div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="p-6 bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <div className="w-12 h-12 mb-4 rounded-xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                        <FaChalkboardTeacher size={24} />
                                    </div>
                                    <div className="text-3xl font-black text-slate-900 dark:text-white">5k+</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Expert Tutors</div>
                                </div>
                                <div className="p-6 bg-indigo-600 rounded-4xl text-white shadow-xl shadow-indigo-500/20 group cursor-default">
                                    <div className="text-2xl font-black leading-tight">Start Today.</div>
                                    <p className="text-[10px] opacity-80 mt-1">Join the future of learning.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;