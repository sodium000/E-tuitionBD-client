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
        <div className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-purple-50/50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 -z-10"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center lg:text-left space-y-6"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-sm font-semibold text-purple-700 dark:text-purple-300"
                        >
                            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                            Trusted by 5000+ Students
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight tracking-tight"
                        >
                            Best Tutoring Platform for{' '}
                            <span className='relative inline-block'>
                                <span className='relative z-10 text-purple-800 dark:text-purple-400'>Home & Online Tuitions</span>
                                <span className='absolute bottom-2 left-0 right-0 h-3 bg-purple-200/50 dark:bg-purple-800/50 -z-0 rounded-lg'></span>
                            </span>
                        </motion.h1>
                        <motion.p
                            variants={itemVariants}
                            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0"
                        >
                            Find the perfect tutor in your area. Connect with experienced educators for personalized learning experiences.
                        </motion.p>
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
                        >
                            <Link to='/Tutors'
                                className="group relative inline-flex items-center justify-center gap-x-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-800 px-8 py-4 text-base font-bold text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 dark:hover:shadow-purple-600/50 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-purple-600 dark:focus-visible:outline-purple-400 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-linear-to-r from-purple-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="relative flex items-center gap-x-2">
                                    <motion.svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                        />
                                    </motion.svg>
                                    FIND A TUTOR
                                    <motion.svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                                        />
                                    </motion.svg>
                                </span>
                            </Link>
                        </motion.div>
                        
                        {/* Stats Section */}
                        <motion.div
                            variants={itemVariants}
                            className="pt-6 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
                        >
                            {[
                                { label: 'Tutors', value: '500+' },
                                { label: 'Students', value: '5K+' },
                                { label: 'Cities', value: '64+' }
                            ].map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    className="text-center lg:text-left"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">{stat.value}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Divisional Tutors Section */}
                        <motion.div
                            variants={itemVariants}
                            className="pt-8 border-t border-gray-200 dark:border-gray-700"
                        >
                            <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">Available in:</h2>
                            <div className="relative">
                                <Marquee
                                    autoFill={true}
                                    speed={40}
                                    pauseOnHover={true}
                                    gradient={true}
                                    gradientColor="rgba(255,255,255,0)"
                                    gradientWidth={60}
                                >
                                    {[{ name: "Barishal", count: 468 },
                                    { name: "Khulna", count: 280 },
                                    { name: "Mymenshing", count: 120 },
                                    { name: "Dhaka", count: 1200 },
                                    { name: "Chittogram", count: 1600 },
                                    { name: "Rongpur", count: 136 },
                                    { name: "Rajshahi", count: 1900 },
                                    { name: "Cumilla", count: 1423 },
                                    { name: "Sylhet", count: 860 }].map((item) => (
                                        <motion.div
                                            key={item.name}
                                            className="bg-white dark:bg-gray-800 mx-2 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-md cursor-pointer transition-all duration-300"
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                                <span className="font-semibold">{item.name}</span>: <span className="font-bold text-purple-600 dark:text-purple-400">{item.count}</span>
                                            </p>
                                        </motion.div>
                                    ))}
                                </Marquee>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Image Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative lg:pl-8"
                    >
                        {/* Enhanced background effects */}
                        <div className="absolute inset-0 z-0">
                            <motion.div
                                className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 dark:bg-purple-900/40 rounded-full opacity-40 dark:opacity-30 blur-3xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            ></motion.div>
                            <motion.div
                                className="absolute top-1/2 -left-12 w-80 h-80 bg-blue-200 dark:bg-blue-900/40 rounded-full opacity-30 dark:opacity-20 blur-3xl"
                                animate={{
                                    scale: [1, 1.15, 1],
                                    opacity: [0.2, 0.4, 0.2],
                                    x: [0, 20, 0]
                                }}
                                transition={{
                                    duration: 7,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                            ></motion.div>
                        </div>
                        
                        {/* Image container with modern styling */}
                        <motion.div
                            className="relative z-10"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-4 shadow-2xl">
                                <div className="absolute inset-0 bg-linear-to-br from-purple-100/20 to-transparent dark:from-purple-900/20"></div>
                                <img
                                    className="w-full h-auto max-h-[500px] object-contain relative z-10"
                                    alt="Friendly teacher illustration"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuALFfgz1snxFaD82G-KrntJAnqseGfS5coScWqHpTybT0IUoVbOhjZdAYiWirrlGznY2yYS8r3YxmfOd59A08DYN9RI-RHFGEw3IIs_TMAKzdPmzxyEOtgDrD1R_mD82gzKNpck6F7kHIcStph1S61WkGoLS6FloBeertYUowvYjZfsX4NL-FoskOBLLpAUXELmqpDPrsH1QsAVjSj090HnriLIa9sqjqQeB17bQH5ISTXyDWTRd5J1pkw3-K0c_-_veUsIvNQqe4I"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Banner;