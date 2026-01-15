/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiAward, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const AboutPage = () => {
    const stats = [
        { label: 'Years Experience', value: '10+' },
        { label: 'Projects Completed', value: '500+' },
        { label: 'Happy Clients', value: '300+' },
        { label: 'Team Members', value: '25+' },
    ];

    const values = [
        {
            icon: <FiTarget size={32} />,
            color: "text-indigo-600 dark:text-indigo-400",
            bg: "bg-indigo-50 dark:bg-indigo-950/50",
            title: "Our Mission",
            description: "To empower students and tutors through innovative digital connections that drive academic success."
        },
        {
            icon: <FiUsers size={32} />,
            color: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-50 dark:bg-purple-950/50",
            title: "User Centric",
            description: "We build with the human experience at the center of every feature we design and develop."
        },
        {
            icon: <FiAward size={32} />,
            color: "text-pink-600 dark:text-pink-400",
            bg: "bg-pink-50 dark:bg-pink-950/50",
            title: "Quality First",
            description: "We don't just provide a platform; we deliver high-performance, trusted educational excellence."
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-sans transition-colors duration-500">
            
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-linear-to-b from-indigo-50/50 dark:from-indigo-950/20 to-transparent"></div>
                </div>
                
                <div className="container relative z-10 mx-auto px-6 text-center">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400"
                    >
                        Who We Are
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-5xl md:text-7xl font-black tracking-tight leading-tight"
                    >
                        Crafting <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Digital Futures</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed"
                    >
                        We are a team of educators, designers, and strategists dedicated to pushing the boundaries of what's possible in modern learning.
                    </motion.p>
                </div>
            </section>

            <section className="py-12 border-y border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {stats.map((stat, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center space-y-1"
                            >
                                <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 space-y-3">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight">What Drives Us</h2>
                        <div className="w-12 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-indigo-500/50 transition-all duration-500"
                            >
                                <div className={`w-16 h-16 ${value.bg} ${value.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-black mb-4 tracking-tight">{value.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-slate-50 dark:bg-slate-900/50 transition-colors">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-16">Meet the Leadership</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[1, 2, 3].map((member) => (
                            <motion.div 
                                key={member} 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                <div className="relative w-40 h-40 mx-auto mb-8">
                                    <div className="w-full h-full rounded-[3rem] bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                                    <div className="absolute inset-0 rounded-[3rem] bg-slate-200 dark:bg-slate-800 overflow-hidden border-4 border-white dark:border-slate-950 shadow-2xl -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                        <img src='https://i.ibb.co.com/8DXWYvJt/joker-k6u5fleppdl2ajfb.jpg' className="w-full h-full bg-slate-300 dark:bg-slate-700"></img>
                                    </div>
                                </div>
                                
                                <h4 className="text-2xl font-black tracking-tight">Alex Rivera</h4>
                                <p className="text-indigo-600 dark:text-indigo-400 mb-6 font-bold uppercase text-[10px] tracking-[0.2em]">Lead Developer</p>
                                
                                <div className="flex justify-center space-x-6 text-slate-400 dark:text-slate-500">
                                    <FiTwitter className="cursor-pointer hover:text-indigo-500 transition-colors" size={20} />
                                    <FiLinkedin className="cursor-pointer hover:text-indigo-500 transition-colors" size={20} />
                                    <FiGithub className="cursor-pointer hover:text-indigo-500 transition-colors" size={20} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;