import React, { useState, useMemo } from 'react';
import { MdLocationPin, MdSchool, MdArrowForward, MdClass, MdVerified, MdSearch, MdClear } from 'react-icons/md';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import useAxiosSecure from '../../hook/useAxiosSecure';

const Tutors = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const axiosSecure = useAxiosSecure();

    const { data: tutors, isLoading } = useQuery({
        queryKey: ['tutor'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tutor/data`);
            return res.data;
        }
    });

    // Filtering logic based on search input
    const filteredTutors = useMemo(() => {
        if (!tutors) return [];
        return tutors.filter(t => 
            t.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.education?.institution?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.PreferredArea?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, tutors]);

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen bg-[#F9FAFB] pb-20 font-sans text-slate-900">
            {/* --- Header & Search Section --- */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-slate-900">
                                Expert <span className="text-blue-600">Tutors</span>
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">Found {filteredTutors.length} verified educators</p>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-96">
                            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                            <input
                                type="text"
                                placeholder="Search name, area, or university..."
                                className="w-full pl-11 pr-10 py-3 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button 
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <MdClear />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Tutors Grid --- */}
            <div className="max-w-7xl mx-auto px-4 mt-10">
                {filteredTutors.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTutors.map((tutordata) => (
                            <div
                                key={tutordata._id}
                                className="group bg-white rounded-3xl border border-slate-200 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col h-full"
                            >
                                <div className="p-5 flex flex-col items-center text-center">
                                    {/* Compact Profile Section */}
                                    <div className="relative mb-4">
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-slate-50 group-hover:ring-blue-50 transition-all">
                                            <img
                                                alt={tutordata.displayName}
                                                className="w-full h-full object-cover"
                                                src={tutordata.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${tutordata.displayName}`}
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-blue-600 p-1 rounded-lg shadow-lg">
                                            <MdVerified className="text-white text-xs" />
                                        </div>
                                    </div>

                                    {/* Name & Institution */}
                                    <h2 className="text-base font-bold text-slate-900 line-clamp-1">
                                        {tutordata.displayName}
                                    </h2>
                                    <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-tight mt-1 line-clamp-1">
                                        {tutordata.education?.institution || 'Update processing...'}
                                    </p>

                                    {/* Info Chips (Reduced Height) */}
                                    <div className="w-full mt-4 grid grid-cols-2 gap-2">
                                        <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl">
                                            <MdClass className="text-slate-400 text-sm shrink-0" />
                                            <span className="text-[10px] font-bold text-slate-600 truncate">
                                                {tutordata?.preferredClass || "Update processing..."}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl">
                                            <MdLocationPin className="text-rose-400 text-sm shrink-0" />
                                            <span className="text-[10px] font-bold text-slate-600 truncate">
                                                {tutordata.PreferredArea || "Update processing..."}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-5 pb-5 mt-auto">
                                    <Link to={`/TutorDetails/${tutordata._id}/tutor`}>
                                        <button className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.97]">
                                            Profile
                                            <MdArrowForward className="text-lg" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                        <p className="text-slate-400 font-medium">No tutors match your search.</p>
                        <button 
                            onClick={() => setSearchTerm("")}
                            className="mt-2 text-blue-600 font-bold text-sm"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tutors;