/* eslint-disable no-unused-vars */
import React from 'react';
import Banner from '../Banner/Banner';
import SearchJob from '../SearchJob/SearchJob';
import HowItWorks from '../../Component/TutorStep/HowItWorks';
import StudentWork from '../../Component/StudentWork/StudentWork';
import Brand from '../../Component/Brand/Brand';
import TuitionSelection from '../../Component/TuitionSelection/TuitionSelection';
import Updatshow from '../updatShow/updatshow'
import Review from '../../Component/Review/Review';
import CTA from '../../Component/CTA/CTA';
import { motion } from 'framer-motion';

const reviewsPromise = fetch('/reviews.json').then(res => res.json());

const MainHomePage = () => {

    return (
        <div>
            <Banner></Banner>
            <SearchJob></SearchJob>
            <Updatshow></Updatshow>
            <TuitionSelection></TuitionSelection>
            <Brand></Brand>
            <section className="bg-white dark:bg-slate-950 py-16 md:py-15 transition-colors duration-500 overflow-hidden">
                <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
                    <div className="text-center mb-10 space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase"
                        >
                            Process & Success
                        </motion.h2>
                        <motion.h1
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
                        >
                            How It <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">Works</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto leading-relaxed"
                        >
                            Everything you need to know about our process, from finding the perfect tutor to achieving your academic goals.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center min-h-0 md:min-h-[60vh] py-8 md:py-0">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="w-full"
                        >
                            <HowItWorks />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="w-full"
                        >
                            <StudentWork />
                        </motion.div>
                    </div>
                </div>
            </section>
            <Review reviewsPromise={reviewsPromise}></Review>
            <CTA></CTA>
        </div>
    );
};

export default MainHomePage;