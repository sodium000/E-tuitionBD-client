import React from 'react';

const Banner = () => {
    return (
        <div>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                        Best Tutoring Platform for Home & Online Tuitions
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 md:mt-8">
                        Find the Right Tutor in Your Area.
                    </p>


                    <div className="mt-10 md:mt-12">
                        <a
                            className="inline-flex items-center  gap-x-3 rounded-full bg-purple-300 px-8 py-4 text-base font-semibold  shadow-lg hover:bg-custom-purple-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-custom-purple-600 transition-all duration-200 transform hover:scale-105"
                            href="#"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                />
                            </svg>
                            FIND A TUTOR
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                                />
                            </svg>
                        </a>
                    </div>
                    <div className="mt-16 text-left md:mt-20">
                        <h2 className="text-lg font-medium text-gray-700">Divisional Tutors:</h2>
                        <div className="mt-4 flex flex-wrap gap-4">
                            {[{ name: "Barishal", count: 468 }, { name: "Khulna", count: 1616 }, { name: "Sylhet", count: 860 }].map((item) => (
                                <div key={item.name} className="bg-gray-100 rounded-lg px-6 py-3">
                                    <p className="text-gray-800">
                                        {item.name}: <span className="font-semibold text-gray-900">{item.count}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative mt-12 lg:mt-0">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute -top-20 -right-20 w-80 h-20 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
                        <div className="absolute top-40 left-0 w-72 h-20 bg-blue-100 rounded-full opacity-40 blur-3xl"></div>
                    </div>


                    <div className="relative">
                        <img
                            className="w-full h-auto object-contain"
                            alt="Friendly teacher illustration"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuALFfgz1snxFaD82G-KrntJAnqseGfS5coScWqHpTybT0IUoVbOhjZdAYiWirrlGznY2yYS8r3YxmfOd59A08DYN9RI-RHFGEw3IIs_TMAKzdPmzxyEOtgDrD1R_mD82gzKNpck6F7kHIcStph1S61WkGoLS6FloBeertYUowvYjZfsX4NL-FoskOBLLpAUXELmqpDPrsH1QsAVjSj090HnriLIa9sqjqQeB17bQH5ISTXyDWTRd5J1pkw3-K0c_-_veUsIvNQqe4I"
                        />
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Banner;