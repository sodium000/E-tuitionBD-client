/* eslint-disable no-unused-vars */
import React from 'react';
import { LuUserPlus, LuBriefcase, LuBellRing, LuCircleDollarSign } from 'react-icons/lu';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const TutorStep = ({ step, icon: Icon, title, description, isReversed }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
        >
            <div className={`flex items-center ${isReversed ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Step Number Circle */}
                <div className={`${isReversed ? 'ml-4' : 'mr-4'} shrink-0`}>
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none transform transition-all group-hover:rotate-12">
                        <span className="text-white font-black text-lg">{step}</span>
                    </div>
                </div>

                {/* Content Card */}
                <div className={`flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 relative z-10 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5`}>
                    <div className={`flex items-start gap-4 ${isReversed ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg shrink-0">
                            <Icon className="text-indigo-600 dark:text-indigo-400 text-xl" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-slate-900 dark:text-white font-bold text-sm tracking-tight mb-1">
                                {title}
                            </h3>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const HowItWorks = () => {
    const steps = [
        {
            icon: LuUserPlus,
            title: "Create Tutor Profile",
            description: "Create your profile in minutes with sign up information.",
        },
        {
            icon: LuBriefcase,
            title: "Apply For Jobs",
            description: "Browse our latest TUITION JOBS page and start applying.",
        },
        {
            icon: LuBellRing,
            title: "Get Job Alerts",
            description: "Get updated tutoring jobs alerts via SMS whenever jobs are posted.",
        },
        {
            icon: LuCircleDollarSign,
            title: "Start Earning",
            description: "Continue tuition after a successful demo and grow your income.",
        },
    ];

    return (
        <div className="font-sans w-full">
            <div className="max-w-md mx-auto">
                <header className="mb-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Step by Step</span>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">For Tutors</h2>
                </header>

                <div className="space-y-4 relative">
                    <div className="absolute left-5 sm:left-5 top-4 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-800 -z-10 hidden sm:block"></div>

                    {steps.map((item, index) => (
                        <TutorStep
                            key={index}
                            step={index + 1}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            isReversed={false}
                        />
                    ))}
                </div>

                <div className="mt-8">
                    <Link to='/Tutorapply'>
                    <button className="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-all transform active:scale-95 text-sm">
                        Become a Tutor
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;