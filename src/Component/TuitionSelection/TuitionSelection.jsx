/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const TuitionTypeCard = ({ title, badge, subtitle, description, imageSrc, colorClass, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8, scale: 1.01 }}
        className="bg-white dark:bg-slate-900 h-full rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer group"
    >
        <div className="w-full h-48 mb-6 relative flex items-center justify-center">
            <motion.div
                className={`absolute w-32 h-32 ${colorClass} rounded-full blur-3xl opacity-30 dark:opacity-20`}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                }}
            />
            <img
                alt={title}
                className="relative z-10 h-full object-contain transition-transform duration-500 group-hover:scale-110"
                src={imageSrc}
            />
        </div>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">{title}</h2>

        <span className={`text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border ${colorClass.replace('bg-', 'text-').replace('-100', '-600')} ${colorClass.replace('bg-', 'border-').replace('-100', '-200')} bg-white dark:bg-slate-800 dark:border-slate-700`}>
            {badge}
        </span>

        <p className="text-[11px] text-indigo-600 dark:text-indigo-400 mb-3 font-black uppercase tracking-tighter">
            {subtitle}
        </p>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {description}
        </p>
    </motion.div>
);

const TuitionSelection = () => {
    const tuitionTypes = [
        {
            title: "Home Tutoring",
            badge: "One-to-one",
            subtitle: "Looking for personal attention?",
            description: "It's a unique opportunity to learn in the home with your expected future in different categories everything is in favor of your need.",
            colorClass: "bg-purple-100",
            imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDb6ao6uYnNOzx454csVX9G7Gr2tA0XI5XRATi3h4Oe-63doEcaYlq6X5KetsAVgf6aYEq-fAzmwdNRYo5lql3gq7nzNEZeAVEyOzYTvzWeqBiSASHWP6qPw9dXCmh72FQ9_BfEpsX-XwPJtU2_ipJiPSjz_ET3ka_P1EekcRNEdBQtYQkAt6CSOYOKxDfzE5gQRX64_CSgGgY1NW0jUxyj844lusyibGwQ8O1LrhZ6ZkycURrjip3KmQ-irrJIidNV6skbU5p5xjE"
        },
        {
            title: "Online Tutoring",
            badge: "Remote Learning",
            subtitle: "Are you left with any doubts?",
            description: "Connect with the best tutors from anywhere and take online classes by using different tools to make your life easier with this process.",
            colorClass: "bg-blue-100",
            imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZociehQ54ClCGaqqRvyBHVeVaj7pVZR_yHT6qepvXGn8qOLVEfSsnI0J2uf9o1R12je8UzQiiOyxMDRTRRcFBVLqc4paApj-fgl3dxoEQ48j3QXG1R1EtqYotOas44ejMKSPBvQF3K6lSGJTMSqOHq61nH9zXl2hezS71dgkbvDpibd0ocsBDK3lbmau-nKKtuJ6nP2ZyeA0mumiBorKw88ZTKoJrvCwxCv9ggArMw2xB8cUUnsfRvqX3IIyQXowatITRUKVnWkk"
        },
        {
            title: "Group Tutoring",
            badge: "Competitive & Affordable",
            subtitle: "Need affordable experience?",
            description: "A group of students can fulfill their hunger for learning within more affordable tuition fees. Get the opportunity of learning with knowledge sharing!",
            colorClass: "bg-green-100",
            imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmqUezCQhB3PFfKfBdIq6m4NP6kPzLvxkTiZ-bmIZVZjklnll4JGSgihdq6pwIuPudYmZshinSfpfmU23Y0aKCxoaUzYPpsuw1vhPXLopOy0f_mUIshd_zyMVNaojzkVLgYgbz9_GTTDLdRp8gdXjT541i3Vz1Uh6byXMKo18J56Pdcfa7klpB7RxSGhQo_PedrDqV6hAZrZx-RuQF549R8qzEw0LDt_8RUM0FNm8IKofKf_GRYU7m7rcie4iK7EHmggg1JUzXEv8"
        }
    ];

    return (
        <section className="relative py-6 bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden">

            <div className="absolute inset-0 z-0 hidden dark:block pointer-events-none">
                <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] opacity-50"></div>
                <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-900/10 rounded-full blur-[100px] opacity-50"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

                <header className="mb-16 text-center space-y-3">
                    <motion.h2
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase"
                    >
                        Flexible Learning
                    </motion.h2>
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
                    >
                        Tuition <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">Types</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto"
                    >
                        Find the Best Tuition Type which suits you most
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tuitionTypes.map((type, index) => (
                        <TuitionTypeCard key={index} {...type} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TuitionSelection;