/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import { MdLocationPin, MdArrowForward, MdClass, MdVerified, MdSearch, MdClear, MdSort } from 'react-icons/md';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '../Loading/Loading';
import useAxiosSecure from '../../hook/useAxiosSecure';

const Tutors = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Change this to adjust how many cards show per page

    const axiosSecure = useAxiosSecure();

    const { data: tutors, isLoading } = useQuery({
        queryKey: ['tutor'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tutor/data`);
            return res.data;
        }
    });

    const processedTutors = useMemo(() => {
        if (!tutors) return [];
        
        let result = tutors.filter(t => 
            t.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.education?.institution?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.PreferredArea?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortBy === "name") {
            result.sort((a, b) => a.displayName.localeCompare(b.displayName));
        } else if (sortBy === "area") {
            result.sort((a, b) => (a.PreferredArea || "").localeCompare(b.PreferredArea || ""));
        }

        return result;
    }, [searchTerm, tutors, sortBy]);

    const totalPages = Math.ceil(processedTutors.length / itemsPerPage);
    const paginatedTutors = processedTutors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 pb-20 font-sans">
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                                Expert <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Tutors</span>
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Found {processedTutors.length} verified educators</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                            <div className="relative w-full sm:w-80">
                                <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                                <input
                                    type="text"
                                    placeholder="Search name, area, university..."
                                    className="w-full pl-11 pr-10 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm dark:text-white"
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                />
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                        <MdClear />
                                    </button>
                                )}
                            </div>
                            <div className="relative w-full sm:w-44">
                                <MdSort className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none" />
                                <select 
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl appearance-none text-sm font-bold text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500/20 outline-none cursor-pointer"
                                >
                                    <option value="default">Sort By</option>
                                    <option value="name">Name (A-Z)</option>
                                    <option value="area">Area</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-10">
                <AnimatePresence mode="wait">
                    {paginatedTutors.length > 0 ? (
                        <motion.div 
                            key={currentPage + searchTerm + sortBy}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {paginatedTutors.map((tutordata) => (
                                <div
                                    key={tutordata._id}
                                    className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col h-full"
                                >
                                    <div className="p-5 flex flex-col items-center text-center">
                                        <div className="relative mb-4">
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-slate-50 dark:ring-slate-800 group-hover:ring-indigo-50 transition-all">
                                                <img
                                                    alt={tutordata.displayName}
                                                    className="w-full h-full object-cover"
                                                    src={tutordata.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${tutordata.displayName}`}
                                                />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 bg-indigo-600 p-1 rounded-lg shadow-lg">
                                                <MdVerified className="text-white text-xs" />
                                            </div>
                                        </div>

                                        <h2 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                                            {tutordata.displayName}
                                        </h2>
                                        <p className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-tight mt-1 line-clamp-1">
                                            {tutordata.education?.institution || 'Update processing...'}
                                        </p>

                                        <div className="w-full mt-4 grid grid-cols-2 gap-2">
                                            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                                                <MdClass className="text-slate-400 text-sm shrink-0" />
                                                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 truncate">
                                                    {tutordata?.preferredClass || "Update processing..."}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                                                <MdLocationPin className="text-rose-400 text-sm shrink-0" />
                                                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 truncate">
                                                    {tutordata.PreferredArea || "Update processing..."}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-5 pb-5 mt-auto">
                                        <Link to={`/TutorDetails/${tutordata._id}/tutor`}>
                                            <button className="w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.97] hover:bg-indigo-600 dark:hover:bg-indigo-50">
                                                Profile
                                                <MdArrowForward className="text-lg" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                            <p className="text-slate-400 font-medium">No tutors match your search.</p>
                            <button onClick={() => setSearchTerm("")} className="mt-2 text-indigo-600 font-bold text-sm underline">
                                Clear search
                            </button>
                        </div>
                    )}
                </AnimatePresence>
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-2">
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="px-4 py-2 text-sm font-bold text-slate-500 disabled:opacity-30 hover:text-indigo-600 transition-colors"
                        >
                            Prev
                        </button>
                        
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`w-10 h-10 rounded-xl text-sm font-black transition-all ${
                                    currentPage === i + 1 
                                    ? "bg-indigo-600 text-white shadow-lg" 
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button 
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="px-4 py-2 text-sm font-bold text-slate-500 disabled:opacity-30 hover:text-indigo-600 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tutors;