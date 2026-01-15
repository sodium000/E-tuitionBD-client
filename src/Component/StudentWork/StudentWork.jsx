/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const StudentWork = () => {
    const steps = [
        {
            step: "Step 1",
            title: "Search or Post",
            subtitle: "Find Tutors or Post requirements",
            description: "Post Tuition by creating an Account or continue as a guest to find matches.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            badge: true
        },
        {
            step: "Step 2",
            title: "Hire Tutor",
            subtitle: "Confirm your teacher",
            description: "Review profiles, conduct a demo session, and confirm your preferred teacher.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            step: "Step 3",
            title: "Get Results",
            subtitle: "Boost performance",
            description: "Gain knowledge, boost confidence and improve overall academic results.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            )
        }
    ];

    return (
        <div className="font-sans w-full transition-colors duration-500">
            <div className="max-w-md mx-auto">
                <header className="mb-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">Easy Process</span>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">For Students</h2>
                </header>

                <main className="space-y-8 relative">
                    <div className="absolute left-5 sm:left-5 top-4 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-800 -z-10 hidden sm:block"></div>

                    {steps.map((item, index) => (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 relative group"
                        >
                            <div className="relative z-10 shrink-0 w-10 h-10 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                                {item.icon}
                                {item.badge && (
                                    <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center border-2 border-white dark:border-slate-950">
                                        <span className="text-[10px] font-bold">+</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">{item.title}</h3>
                                    <span className="text-[9px] font-black bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                        {item.step}
                                    </span>
                                </div>
                                <p className="text-[11px] text-purple-600 dark:text-purple-400 mb-1 font-bold uppercase tracking-tighter">{item.subtitle}</p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </main>

                <div className="mt-8">
                    <Link to='/Tutors'>
                    <button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-purple-200 dark:shadow-none transition-all transform active:scale-95 text-sm flex items-center justify-center gap-2 group">
                        <span>Start Your Search</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                    </Link> 
                </div>
            </div>
        </div>
    );
};

export default StudentWork;