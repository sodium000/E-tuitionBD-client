import React from 'react';
import { MdLocationPin, MdSchool, MdArrowForward } from 'react-icons/md';
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
        return <Loading />;
    }

    return (
        <div className="max-w-8xl mx-auto  py-16">
            {/* Header Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-4">
                    Expert <span className="text-primary">Tutors</span> Available
                </h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    Connect with highly qualified educators tailored to your academic needs and location.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10 justify-items-center">
                {tutor?.map((tutordata, index) => (
                    <div
                        key={index}
                        className="group w-full bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-purple-700  overflow-hidden transition-all duration-500 hover:-translate-y-2 relative"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="flex flex-col items-center pt-10 px-8 pb-25">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                                <div className="relative w-36 h-36 rounded-full overflow-hidden border-[6px] border-purple-400/40 shadow-2xl">
                                    <img
                                        alt={`Profile of ${tutordata.displayName}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        src={tutordata.photoURL || "https://via.placeholder.com/128/8B006D/FFFFFF?text=RH"}
                                    />
                                </div>
                            </div>

                            <h2 className="text-lg font-black  tracking-tight mb-2 text-center">
                                {tutordata.displayName}
                            </h2>

                            <div className="flex items-center gap-2 text-white text-sm mb-6 bg-pink-400 px-4 py-1.5 rounded-full">
                                <MdSchool className="text-primary text-lg" />
                                <span className="font-medium truncate max-w-[200px]">
                                    {tutordata.education?.institution || 'updating tutor...'}
                                </span>
                            </div>

                            {/* Info Badges */}
                            <div className="w-full space-y-3">
                                <div className="flex items-center justify-between bg-primary/30 p-3 rounded-2xl border border-primary/10">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Class</span>
                                    <span className="text-sm font-extrabold text-primary uppercase">
                                        {tutordata?.preferredClass || "updating tutor..."}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between bg-slate-400 p-3 rounded-2xl border border-slate-100">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Location</span>
                                    <div className="flex items-center text-slate-900 dark:text-slate-200">
                                        <MdLocationPin className="text-primary mr-1" />
                                        <span className="text-sm font-bold uppercase">{tutordata.PreferredArea}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-linear-to-t from-purple-700 via-pink-300/90  to-transparent">
                            <Link to={`/TutorDetails/${tutordata._id}/tutor`}>
                                <button className="w-full h-12 dark:bg-primary text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:gap-5 hover:bg-primary dark:hover:bg-white dark:hover:text-primary shadow-lg active:scale-95">
                                    View Profile
                                    <MdArrowForward className="text-2xl" />
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tutors;