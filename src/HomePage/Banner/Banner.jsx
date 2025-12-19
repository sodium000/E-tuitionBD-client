import React from 'react';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold  text-gray-900 leading-tight">
                        Best Tutoring Platform for <span className='text-purple-800'> Home & Online Tuitions</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 md:mt-5">
                        Find the Right Tutor in Your Area.
                    </p>
                    <div className="mt-6 md:mt-6">
                        <Link to='/Tutors'
                            className="inline-flex items-center  gap-x-3 rounded-full bg-purple-300 px-8 py-4 text-base font-semibold  shadow-lg hover:bg-purple-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-all duration-200 transform hover:scale-105"
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
                        </Link>
                    </div>
                    <div className="mt-10 text-left md:mt-6">
                        <h2 className="text-lg font-medium text-gray-700">Divisional Tutors:</h2>
                        <div className="mt-4 flex flex-wrap gap-4 ">
                            <Marquee
                                autoFill={true}
                            >
                                {[{ name: "Barishal", count: 468 },
                                { name: "Khulna", count: 280 },
                                { name: "Mymenshing", count: 120 },
                                { name: "Dhaka", count: 1200 },
                                { name: "Chittogram", count: 1600 },
                                { name: "Rongpur", count: 136 },
                                { name: "Rajshahi", count: 1900 },
                                { name: "Cumilla", count: 1423 },
                                { name: "Sylhet", count: 860 }].map((item) => (
                                    <div key={item.name} className="bg-gray-100 mx-2  px-4 py-1 rounded-full border border-purple-500">
                                        <p className="text-gray-800">
                                            {item.name}: <span className="font-semibold text-gray-900">{item.count}</span>
                                        </p>
                                    </div>
                                ))}
                            </Marquee>
                        </div>  
                    </div>
                </div>

                <div className="relative mt-12 lg:mt-0">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
                        <div className="absolute top-40 left-0 w-72 h-80 bg-blue-100 rounded-full opacity-40 blur-3xl"></div>
                    </div>
                    <div className="relative">
                        <img
                            className="w-full h-[60vh] object-contain"
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