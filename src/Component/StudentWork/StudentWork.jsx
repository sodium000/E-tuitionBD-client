import React from 'react';

const StudentWork = () => {
    const steps = [
        {
            step: "Step 1",
            title: "Search or Post",
            subtitle: "Search for Tutors or Post your tuition requirements",
            description: "Post Tuition by creating an Account or continue without an Account.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            badge: "add"
        },
        {
            step: "Step 2",
            title: "Hire Tutor",
            subtitle: "Confirm your teacher",
            description: "If you like the demo session, proceed to confirm and hire the teacher.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            step: "Step 3",
            title: "Get Results",
            subtitle: "Boost performance",
            description: "Gain knowledge, boost confidence and improve overall academic performance.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            )
        }
    ];

    return (
        <div className="bg-gray-50  text-gray-700 font-sans antialiased ">
            <div className="max-w-md mx-auto px-6">
                <header className="pt-12 pb-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Here's how it works for <span className="text-[#8B2F88]">Students/Guardians</span>
                    </h1>
                    <p className="text-sm text-gray-500">
                        Follow these simple steps to find the perfect tutor for your needs.
                    </p>
                </header>

                <main className="space-y-8 relative">
                    {steps.map((item, index) => (
                        <div key={index} className="flex items-start gap-4 relative">
                            {/* Vertical Connector Line */}
                            {index !== steps.length - 1 && (
                                <div className="absolute left-8 top-16 -bottom-8 w-0.5 border-l-2 border-dashed border-gray-300 z-0"></div>
                            )}

                            {/* Icon Circle */}
                            <div className="relative z-10 shrink-0 w-16 h-16 bg-white rounded-full border-2 border-[#8B2F88]/10 shadow-sm flex items-center justify-center">
                                {item.icon}
                                {item.badge && (
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                                        <span className="text-xs font-bold">+</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 z-10">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.title}</h3>
                                    <span className="text-[10px] font-bold bg-[#8B2F88]/10 text-[#8B2F88] px-2 py-1 rounded-full uppercase tracking-wider">
                                        {item.step}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-700 mb-1 font-semibold">{item.subtitle}</p>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </main>


                <div className="bg-linear-to-t from-gray-50 via-gray-50/90 to-transparent">
                    <div className="max-w-md mx-auto">
                        <button className="w-full bg-[#8B2F88] hover:bg-[#732670] text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                            <span>Start Your Search Now</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentWork;