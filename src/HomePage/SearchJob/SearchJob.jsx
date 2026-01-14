/* eslint-disable no-unused-vars */
import React from 'react';
import { GoSearch } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const SearchJob = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="relative bg-slate-50 dark:bg-slate-950 mt-10 transition-colors duration-500 overflow-hidden">

            {/* --- BEAUTIFIED BACKGROUND DECORATION --- */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200/40 dark:bg-purple-900/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-1/2 -left-24 w-72 h-72 bg-indigo-200/40 dark:bg-indigo-900/10 rounded-full blur-3xl"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.4, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            <section className="py-16 sm:py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    {/* --- HEADER SECTION --- */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-sm font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-3">
                            Opportunities Await
                        </h2>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                            SEARCH <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">TUTORING JOBS</span>
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Empower your teaching career by connecting with thousands of students looking for your expertise.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* --- IMAGE / ILLUSTRATION --- */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative group"
                        >
                            {/* Decorative Frame */}
                            <div className="absolute -inset-4 bg-linear-to-tr from-purple-500/10 to-indigo-500/10 rounded-[2.5rem] -rotate-2 group-hover:rotate-0 transition-transform duration-500 border border-slate-200 dark:border-slate-800" />

                            <motion.div
                                className="relative rounded-4xl overflow-hidden shadow-2xl border border-white dark:border-slate-800"
                                whileHover={{ scale: 1.02 }}
                            >
                                <img
                                    alt="Tutoring illustration"
                                    className="w-full h-auto object-cover"
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                    <p className="text-white font-medium italic">"Join the community of 500+ educators today."</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* --- CONTENT SECTION --- */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex flex-col items-start space-y-6"
                        >
                            <motion.div variants={itemVariants} className="space-y-4">
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
                                    Looking for interesting tuition jobs to excel your teaching experience?
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                    If teaching interests you, you are in the right place. We feature over
                                    <span className="mx-1 font-bold text-indigo-600 dark:text-indigo-400">500+ verified</span>
                                    home tuition jobs daily.
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                    Whether you are a fresh graduate starting your journey or an expert educator,
                                    we help you find students that fit your skills, location, and preferred subjects perfectly.
                                </p>
                            </motion.div>

                            {/* Features list */}
                            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 w-full py-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    <div className="w-2 h-2 rounded-full bg-green-500" /> 100% Verified
                                </div>
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500" /> Local & Online
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="pt-4">
                                <Link to='/TutionPost'>
                                    <motion.button
                                        className="relative group flex items-center gap-3 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold rounded-2xl shadow-2xl transition-all overflow-hidden"
                                        whileHover={{ y: -4 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Button Background Gradient Animation */}
                                        <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <span className="relative z-10 flex items-center gap-3">
                                            <GoSearch className="text-xl group-hover:rotate-12 transition-transform" />
                                            SEARCH TUITION
                                            <FaArrowRight className="text-lg animate-pulse" />
                                        </span>
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SearchJob;