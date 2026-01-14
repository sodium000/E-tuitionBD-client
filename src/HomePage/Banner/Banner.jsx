/* eslint-disable no-unused-vars */
import React from 'react';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Banner = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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

    const cities = [
        { name: "Dhaka", count: 1200 }, { name: "Chittagong", count: 1600 },
        { name: "Rajshahi", count: 1900 }, { name: "Sylhet", count: 860 },
        { name: "Khulna", count: 280 }, { name: "Barishal", count: 468 },
        { name: "Cumilla", count: 1423 }, { name: "Rangpur", count: 136 }
    ];

    return (
        <section className="relative h-[60vh] md:h-[65vh] min-h-[500px] flex items-center overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
            
            {/* --- DARK MODE BLOBS (Hidden in Light Mode) --- */}
            <div className="absolute inset-0 z-0 hidden dark:block">
                <div className="absolute top-0 -left-20 w-72 h-72 bg-purple-900/30 rounded-full blur-[80px] opacity-50"></div>
                <div className="absolute bottom-0 -right-20 w-72 h-72 bg-indigo-900/20 rounded-full blur-[80px] opacity-50"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    
                    {/* --- TEXT CONTENT --- */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center lg:text-left space-y-4"
                    >
                        {/* Status Badge */}
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse"></span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                Trusted by 5000+ Students
                            </span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                            Find The Best <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                                Private Tutors
                            </span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto lg:mx-0">
                            Personalized learning at your doorstep. We connect you with qualified educators for excellence.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center lg:justify-start">
                            <Link to='/Tutors' className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold shadow-sm dark:shadow-indigo-900/50 transition-all hover:scale-105">
                                Find a Tutor
                            </Link>
                            <Link to='/login' className="px-6 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-800 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                Become a Tutor
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden lg:flex relative h-[350px] items-center justify-center"
                    >
                        <div className="absolute inset-0 border-2 border-slate-100 dark:border-transparent dark:bg-linear-to-tr dark:from-indigo-500/20 dark:to-purple-500/20 rounded-3xl rotate-2 -z-10"></div>
                        
                        <div className="relative bg-white dark:bg-slate-900 p-2 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop" 
                                alt="Tutoring session"
                                className="rounded-2xl object-cover h-[300px] w-[400px] transition-opacity duration-500"
                            />
                        </div>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-10 border-t border-slate-100 dark:border-slate-900 pt-6"
                >
                    <Marquee gradient={false} speed={40}>
                        {cities.map((city) => (
                            <div key={city.name} className="mx-3 flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors">
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{city.name}</span>
                                <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-1.5 py-0.5 rounded">
                                    {city.count}
                                </span>
                            </div>
                        ))}
                    </Marquee>
                </motion.div>
            </div>
        </section>
    );
};

export default Banner;