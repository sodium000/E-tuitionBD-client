import React from 'react';
import { MdLocationPin } from 'react-icons/md';
import { Link } from 'react-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';

const Tutors = () => {
    const { data: tutor, isLoading } = useQuery({
        queryKey: ['tutor'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/tutor/data`, {
                withCredentials: false,
            });
            return res.data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    console.log(tutor)
    return (
        <>
            {tutor?.map((tutordata, index) => {
                return (<div key={index} className="w-full mt-10 max-w-xs  sm:max-w-sm bg-card-light dark:bg-card-dark rounded-2xl shadow-2xl dark:shadow-slate-900/50 border border-slate-200 dark:border-slate-800 overflow-hidden relative group transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl dark:hover:shadow-primary/40">
                    <div className="flex flex-col items-center pt-8 px-6 pb-24">

                        <div className="relative mb-4">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary-light shadow-xl ring-4 ring-primary/40 dark:ring-primary-light/50 group-hover:ring-8 transition-all duration-300">
                                <img
                                    alt={`Profile picture of ${tutordata.photoURL}`}
                                    className="w-full h-full object-cover"
                                    src={tutordata.photoURL || "https://via.placeholder.com/128/8B006D/FFFFFF?text=RH"}
                                />
                            </div>
                        </div>

                        <h2 className="text-2xl font-extrabold text-primary tracking-tighter mb-1 text-center uppercase">
                            {tutordata.displayName}
                        </h2>
                        <p className="text-sm font-medium text-secondary  text-center mb-1 uppercase">
                            {tutordata.education.institution}
                        </p>

                        <div className="flex items-center justify-center pt-2 pb-4">
                            <span className="text-lg font-bold dark:text-slate-200 text-center px-4 py-1 rounded-full bg-primary/60 dark:bg-primary-light/20 text-primary dark:text-primary-light shadow-inner uppercase">
                                {tutordata.preferredClass
                                }
                            </span>
                        </div>

                        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full  bg-cyan-100 border border-primary/60 dark:border-primary-light/50 shadow-inner">
                            <span className="material-icons text-primary text-base mr-1.5"><MdLocationPin /></span>
                            <span className="text-sm font-semibold text-primary dark:text-primary-light uppercase">{tutordata.PreferredArea}</span>
                        </div>
                    </div>

                    {/* View Details Button Section */}
                    <div className="absolute bottom-0 left-0 w-full">
                        <div className="relative w-full h-16 overflow-hidden">
                            <Link to={`/TutorDetails/${tutordata._id}/tutor`}>
                                <button
                                    className="w-full h-full bg-purple-300 font-bold text-xl flex items-center justify-center transition-all duration-300 hover:tracking-wide active:opacity-100 relative z-10"
                                >
                                    View Details
                                </button>
                            </Link>
                            <div className="absolute top-0 left-0 h-full w-16  opacity-10 transform skew-x-[-20deg] -translate-x-8 pointer-events-none z-20"></div>

                            <div className="absolute top-0 left-0 h-full w-1/3 bg-linear-to-r from-black/20 to-transparent pointer-events-none z-10"></div>
                        </div>
                    </div>
                </div>)
            })}
        </>
    );
};

export default Tutors;


