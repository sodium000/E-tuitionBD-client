import React from 'react';


const TuitionTypeCard = ({ title, badge, subtitle, description,  imageSrc, colorClass }) => (
    <div className="bg-white h-120 rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center transform transition duration-300 hover:shadow-md">
        <div className="w-full h-60 mb-5 relative flex items-center justify-center">
            <div className={`absolute w-32 h-32 ${colorClass} rounded-full blur-2xl opacity-40`}></div>
            <img
                alt={title}
                className="relative z-10 h-full object-contain"
                src={imageSrc}
            />
        </div>

        <h2 className="text-xl font-bold text-[#0F2B5B] mb-2">{title}</h2>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full mb-3 ${colorClass.replace('bg-', 'text-').replace('-100', '-600')} ${colorClass.replace('-100', '-50')}`}>
            {badge}
        </span>

        <p className="text-[10px] text-gray-400 mb-3 font-bold uppercase tracking-wider">{subtitle}</p>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
            {description}
        </p>

    </div>
);

const TuitionSelection = () => {
    const tuitionTypes = [
        {
            title: "Home Tutoring",
            badge: "One-to-one",
            subtitle: "Looking for personal attention?",
            description: "It's a unique opportunity to learn in the home with your expected future in different categories everything is in favor of your need.",
            buttonText: "Select Home Tuition",
            isPrimary: true,
            colorClass: "bg-purple-100",
            imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDb6ao6uYnNOzx454csVX9G7Gr2tA0XI5XRATi3h4Oe-63doEcaYlq6X5KetsAVgf6aYEq-fAzmwdNRYo5lql3gq7nzNEZeAVEyOzYTvzWeqBiSASHWP6qPw9dXCmh72FQ9_BfEpsX-XwPJtU2_ipJiPSjz_ET3ka_P1EekcRNEdBQtYQkAt6CSOYOKxDfzE5gQRX64_CSgGgY1NW0jUxyj844lusyibGwQ8O1LrhZ6ZkycURrjip3KmQ-irrJIidNV6skbU5p5xjE"
        },
        {
            title: "Online Tutoring",
            badge: "Remote Learning",
            subtitle: "Are you left with any doubts?",
            description: "Connect with the best tutors from anywhere and take online classes by using different tools to make your life easier with this process.",
            buttonText: "Select Online Tuition",
            isPrimary: false,
            colorClass: "bg-blue-100",
            imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZociehQ54ClCGaqqRvyBHVeVaj7pVZR_yHT6qepvXGn8qOLVEfSsnI0J2uf9o1R12je8UzQiiOyxMDRTRRcFBVLqc4paApj-fgl3dxoEQ48j3QXG1R1EtqYotOas44ejMKSPBvQF3K6lSGJTMSqOHq61nH9zXl2hezS71dgkbvDpibd0ocsBDK3lbmau-nKKtuJ6nP2ZyeA0mumiBorKw88ZTKoJrvCwxCv9ggArMw2xB8cUUnsfRvqX3IIyQXowatITRUKVnWkk"
        },
        {
            title: "Group Tutoring",
            badge: "Competitive & Affordable",
            subtitle: "Need affordable experience?",
            description: "A group of students can fulfill their hunger for learning within more affordable tuition fees. Get the opportunity of learning with knowledge sharing!",
            buttonText: "Select Group Tuition",
            isPrimary: false,
            colorClass: "bg-green-100",
            imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmqUezCQhB3PFfKfBdIq6m4NP6kPzLvxkTiZ-bmIZVZjklnll4JGSgihdq6pwIuPudYmZshinSfpfmU23Y0aKCxoaUzYPpsuw1vhPXLopOy0f_mUIshd_zyMVNaojzkVLgYgbz9_GTTDLdRp8gdXjT541i3Vz1Uh6byXMKo18J56Pdcfa7klpB7RxSGhQo_PedrDqV6hAZrZx-RuQF549R8qzEw0LDt_8RUM0FNm8IKofKf_GRYU7m7rcie4iK7EHmggg1JUzXEv8"
        }
    ];

    return (
        <div className="bg-[#F0F4F8] font-sans">
            <main className="px-5 py-4 pb-15 max-w-full mx-auto">
                <header className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-[#0F2B5B] mb-2">Tuition Types</h1>
                    <p className="text-gray-500 text-sm px-4">
                        Find the Best Tuition Type which suits you most
                    </p>
                </header>

                <div className="space-y-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 ">
                    {tuitionTypes.map((type, index) => (
                        <TuitionTypeCard key={index} {...type} />
                    ))}
                </div>
            </main>
        </div>
    );
};


export default TuitionSelection;