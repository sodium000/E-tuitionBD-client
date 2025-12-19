import React from 'react';
import { GoSearch } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router';


const SearchJob = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark mt-10">
            <div className="relative w-full overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-primary/5 dark:bg-primary/10 -skew-y-3 transform -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-primary/5 dark:bg-primary/10 skew-y-3 transform translate-y-16"></div>
                <section className="py-10 sm:py-20 relative">
                    <div className=" px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 lg:mb-16">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                                SEARCH <span className='text-purple-800'>TUTORING JOBS</span>
                            </h1>
                            <p className="mt-4 text-lg font-bold text-text-light-secondary dark:text-text-dark-secondary">
                                Find Your Tuition Jobs, in your area
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 items-center">
                            <div className="flex justify-center">
                                <img
                                    alt="Illustration of a student learning online from a teacher"
                                    className="max-w-full rounded-2xl"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOKaJs_tXInsWfJ9lo7XWVLMyubh9AKxf7ao0qs5tReyo8ji9ixwpOhvKte609UusJ2Bzs9TxeXJUA7-tZknoEdQMEgjkZ_4OrqJHssiBXgQr0g-ARVovGN91NRJecm-EkJgUwbAj3LUS9y7ehOeMckug03W0vGdHkwUyJgZHuIruBZ3-_wTHfaaVmZFRWKxrvueVlkVbF2PAcy2ELrBkI1BnSvi3OOcRH0_84CBsnfAvB19Lh1DCDoQ6qCF0EbMxlmab_7z7zNGNj"
                                />
                            </div>
                            <div className="flex flex-col items-start text-left">
                                <h2 className="text-xl sm:text-3xl font-bold text-center mb-4">
                                    Looking for interesting tuition jobs to excel your teaching experience?
                                </h2>
                                <p className="text-text-light-secondary dark:text-text-dark-secondary text-base leading-relaxed mb-8">
                                    If teaching jobs interests you, then you are on the right place. We often have <span className="font-bold text-text-light dark:text-text-dark">500+</span> open home tuition jobs that are genuine and <span className="font-bold text-text-light dark:text-text-dark">100%</span> verified. Whether you are starting your career as a tuition teacher or an expert in your field, we can help you find your next big tuition job. You can search and apply to the tuition jobs that best fit your skills, favorable location, class and subjects.
                                </p>
                                <Link to='/TutionPost'>
                                    <button className="group flex items-center justify-center px-8 py-4 bg-linear-to-r from-purple-600 via-pink-600 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                                        <span className="material-icons mr-2"><GoSearch size={25} /></span>
                                        <span>SEARCH TUITION</span>
                                        <span className="material-icons ml-2 transform transition-transform duration-300 group-hover:translate-x-1"><FaArrowRight size={25} /></span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SearchJob;