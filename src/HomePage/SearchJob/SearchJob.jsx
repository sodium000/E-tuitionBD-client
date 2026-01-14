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
        <div className="bg-white dark:bg-gray-900 mt-10">
            <div className="relative w-full overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 w-full h-32 bg-primary/5 dark:bg-primary/10 -skew-y-3 transform -translate-y-16"
                    animate={{
                        x: [0, 20, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>
                <motion.div
                    className="absolute bottom-0 left-0 w-full h-32 bg-primary/5 dark:bg-primary/10 skew-y-3 transform translate-y-16"
                    animate={{
                        x: [0, -20, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                ></motion.div>
                <section className="py-10 sm:py-20 relative">
                    <div className=" px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12 lg:mb-16"
                        >
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                                SEARCH <span className='text-purple-800 dark:text-purple-400'>TUTORING JOBS</span>
                            </h1>
                            <p className="mt-4 text-lg font-bold text-gray-600 dark:text-gray-300">
                                Find Your Tuition Jobs, in your area
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="flex justify-center"
                            >
                                <motion.img
                                    alt="Illustration of a student learning online from a teacher"
                                    className="max-w-full rounded-2xl"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOKaJs_tXInsWfJ9lo7XWVLMyubh9AKxf7ao0qs5tReyo8ji9ixwpOhvKte609UusJ2Bzs9TxeXJUA7-tZknoEdQMEgjkZ_4OrqJHssiBXgQr0g-ARVovGN91NRJecm-EkJgUwbAj3LUS9y7ehOeMckug03W0vGdHkwUyJgZHuIruBZ3-_wTHfaaVmZFRWKxrvueVlkVbF2PAcy2ELrBkI1BnSvi3OOcRH0_84CBsnfAvB19Lh1DCDoQ6qCF0EbMxlmab_7z7zNGNj"
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                />
                            </motion.div>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="flex flex-col items-start text-left"
                            >
                                <motion.h2
                                    variants={itemVariants}
                                    className="text-xl sm:text-3xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100"
                                >
                                    Looking for interesting tuition jobs to excel your teaching experience?
                                </motion.h2>
                                <motion.p
                                    variants={itemVariants}
                                    className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-8"
                                >
                                    If teaching jobs interests you, then you are on the right place. We often have <span className="font-bold text-gray-900 dark:text-gray-100">500+</span> open home tuition jobs that are genuine and <span className="font-bold text-gray-900 dark:text-gray-100">100%</span> verified. Whether you are starting your career as a tuition teacher or an expert in your field, we can help you find your next big tuition job. You can search and apply to the tuition jobs that best fit your skills, favorable location, class and subjects.
                                </motion.p>
                                <Link to='/TutionPost'>
                                    <motion.button
                                        className="group flex items-center justify-center px-8 py-4 bg-linear-to-r from-purple-600 via-pink-600 to-red-500 text-white font-semibold rounded-lg shadow-lg"
                                        whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4)" }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <motion.span
                                            className="mr-2"
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                        >
                                            <GoSearch size={25} />
                                        </motion.span>
                                        <span>SEARCH TUITION</span>
                                        <motion.span
                                            className="ml-2"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <FaArrowRight size={25} />
                                        </motion.span>
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SearchJob;