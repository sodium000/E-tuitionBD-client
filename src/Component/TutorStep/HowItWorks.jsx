/* eslint-disable no-unused-vars */
import React from 'react';
import { LuUserPlus, LuBriefcase, LuBellRing, LuCircleDollarSign } from 'react-icons/lu';

const TutorStep = ({ step, icon: Icon, title, description, isReversed }) => {
    return (
        <div className="relative group">
            <div className={`flex items-center ${isReversed ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Step Number Circle */}
                <div className={`${isReversed ? 'ml-4' : 'mr-4'} shrink-0`}>
                    <div className="w-12 h-12 rounded-full bg-[#F8BBD0] dark:bg-[#C2185B] flex items-center justify-center shadow-lg transform transition-all group-hover:scale-110">
                        <span className="text-white font-bold text-xl drop-shadow-sm">{step}</span>
                    </div>
                </div>

                {/* Content Card */}
                <div className={`flex-1 bg-white dark:bg-zinc-900 rounded-xl shadow-md dark:border dark:border-zinc-800 overflow-hidden flex ${isReversed ? 'flex-row-reverse' : 'flex-row'} relative z-10 transform transition-transform duration-300 hover:scale-[1.02]`}>
                    <div className="w-16 bg-[#8E44AD] flex items-center justify-center shrink-0">
                        <Icon className="text-white text-2xl" />
                    </div>
                    <div className={`p-4 flex-1 ${isReversed ? 'text-left' : 'text-right'}`}>
                        <h3 className="text-[#8E44AD] font-bold text-sm uppercase tracking-wider mb-1">
                            {title}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
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
            description: "Completing your profile start browsing our latest TUITION JOBS page and start applying.",
        },
        {
            icon: LuBellRing,
            title: "Get Free Tutoring Job Alert",
            description: "Get updated tutoring jobs alerts via SMS/CALL whenever new jobs are posted.",
        },
        {
            icon: LuCircleDollarSign,
            title: "Start Tutoring And Grow Your Income",
            description: "If parent like the demo session, you can continue tuition and start earning.",
        },
    ];

    return (
        <div className=" bg-[#F3F6FD]  font-sans  py-15 px-4 sm:px-6">
            <div className="max-w-md mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-2 tracking-tight">How it Works?</h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium">
                        Here's how it works for <span className="text-[#8E44AD] font-bold">Tutors</span>
                    </p>
                </header>

                <div className="space-y-6 relative">
                    {/* Vertical line connector for desktop */}
                    <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-zinc-200 dark:bg-zinc-800 -z-10 hidden sm:block"></div>

                    {steps.map((item, index) => (
                        <TutorStep
                            key={index}
                            step={index + 1}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            isReversed={index % 2 === 0}
                        />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="bg-[#8E44AD] hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-[0_0_15px_rgba(142,68,173,0.4)] transition-all duration-300 transform hover:-translate-y-1">
                        Get Started Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;