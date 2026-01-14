/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaArrowRight, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';

const CTA = () => {
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
        <div className="relative py-20 overflow-hidden bg-linear-to-br from-purple-600 via-purple-700 to-indigo-800 dark:from-purple-900 dark:via-indigo-900 dark:to-gray-900">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.5, 1],
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -80, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center"
                >
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center mb-6"
                    >
                        <motion.div
                            className="flex gap-4"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <FaGraduationCap className="text-4xl text-white/90" />
                            <FaChalkboardTeacher className="text-4xl text-white/90" />
                        </motion.div>
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6"
                    >
                        Ready to Start Your
                        <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-200 to-yellow-400 dark:from-yellow-300 dark:to-yellow-500">
                            Learning Journey?
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-white/90 mb-10 max-w-3xl mx-auto"
                    >
                        Join thousands of students and tutors who trust eTuitionBd for quality education.
                        Find your perfect match today!
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link to="/Tutors">
                            <motion.button
                                className="group relative px-8 py-4 bg-white dark:bg-gray-100 text-purple-700 dark:text-purple-800 font-bold text-lg rounded-full shadow-2xl overflow-hidden"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <motion.span
                                    className="absolute inset-0 bg-linear-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={false}
                                />
                                <span className="relative flex items-center gap-3">
                                    Find a Tutor
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <FaArrowRight />
                                    </motion.span>
                                </span>
                            </motion.button>
                        </Link>

                        <Link to="/TutionPost">
                            <motion.button
                                className="group px-8 py-4 bg-transparent border-2 border-white dark:border-gray-300 text-white dark:text-gray-100 font-bold text-lg rounded-full hover:bg-white dark:hover:bg-gray-100 hover:text-purple-700 dark:hover:text-purple-800 transition-all duration-300"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                Post a Tuition Job
                            </motion.button>
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-12 flex flex-wrap justify-center gap-8 text-white/80"
                    >
                        <motion.div
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.1 }}
                        >
                            <div className="text-3xl font-bold text-yellow-300">500+</div>
                            <div className="text-sm">Active Tutors</div>
                        </motion.div>
                        <motion.div
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.1 }}
                        >
                            <div className="text-3xl font-bold text-yellow-300">1000+</div>
                            <div className="text-sm">Happy Students</div>
                        </motion.div>
                        <motion.div
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.1 }}
                        >
                            <div className="text-3xl font-bold text-yellow-300">98%</div>
                            <div className="text-sm">Satisfaction Rate</div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default CTA;

