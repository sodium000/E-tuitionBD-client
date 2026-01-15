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
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        // Height limited to 60-70% of screen height
        <div className="relative h-[65vh] min-h-[550px] bg-white dark:bg-slate-950  transition-colors duration-500 overflow-hidden flex items-center">

            <div className="absolute inset-0 pointer-events-none hidden dark:block">
                <motion.div
                    className="absolute -top-24 -right-24 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-1/2 -left-24 w-72 h-72 bg-indigo-900/10 rounded-full blur-3xl"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.4, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            <section className="w-full relative z-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="hidden lg:block relative group h-[350px]"
                        >
                            <div className="absolute -inset-2 bg-slate-100 dark:bg-linear-to-tr dark:from-purple-500/10 dark:to-indigo-500/10 rounded-3xl -rotate-1 group-hover:rotate-0 transition-transform duration-500 border border-slate-200 dark:border-slate-800" />

                            <div className="relative h-full rounded-3xl overflow-hidden shadow-xl border border-white dark:border-slate-800">
                                <img
                                    alt="Tutoring illustration"
                                    className="w-full h-full object-cover"
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                    <p className="text-white text-sm font-medium italic">"Join our community of expert educators."</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex flex-col items-start space-y-4"
                        >
                            <motion.div variants={itemVariants} className="space-y-3">
                                <h2 className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                                    Opportunities Await
                                </h2>
                                <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                    SEARCH <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">TUTORING JOBS</span>
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
                                    Looking for interesting tuition jobs? We feature over 
                                    <span className="mx-1 font-bold text-indigo-600 dark:text-indigo-400">500+ verified</span> 
                                    postings daily. Find students that fit your skills and location.
                                </p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex gap-6 py-2">
                                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    <div className="w-2 h-2 rounded-full bg-green-500" /> 100% Verified
                                </div>
                                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500" /> Local & Online
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="pt-2">
                                <Link to='/TutionPost'>
                                    <motion.button
                                        className="relative group flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold rounded-xl shadow-lg transition-all overflow-hidden"
                                        whileHover={{ y: -3 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span className="relative z-10 flex items-center gap-3 text-sm">
                                            <GoSearch className="text-lg group-hover:rotate-12 transition-transform" />
                                            SEARCH TUITION
                                            <FaArrowRight className="text-base animate-pulse" />
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