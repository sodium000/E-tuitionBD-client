
import React, { useState, useEffect, useCallback } from "react";
import Loading from "../Loading/Loading";
import {
  MdLocationOn,
  MdFilterList,
  MdClear,
  MdSearch,
  MdMenuBook,
  MdPerson,
  MdArrowForward,
  MdNavigateNext,
  MdNavigateBefore,
} from "react-icons/md";
import { Link } from "react-router";
import useAxiosSecure from "../../hook/useAxiosSecure";

const TutionPost = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(`/post`);
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    let result = [...jobs];

    if (searchQuery) {
      result = result.filter(
        (job) =>
          job.Subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.Medium?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedClass) {
      result = result.filter((job) => job.Class === selectedClass);
    }

    if (selectedLocation) {
      result = result.filter((job) =>
        (job.selectDistrict || job.TuitionRegion)
          ?.toLowerCase()
          .includes(selectedLocation.toLowerCase())
      );
    }

    if (sortBy === "salaryHigh") {
      result.sort((a, b) => (Number(b.Salary) || 0) - (Number(a.Salary) || 0));
    } else if (sortBy === "salaryLow") {
      result.sort((a, b) => (Number(a.Salary) || 0) - (Number(b.Salary) || 0));
    } else {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredJobs(result);
    setCurrentPage(1);
  }, [searchQuery, selectedClass, selectedLocation, sortBy, jobs]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedClass("");
    setSelectedLocation("");
    setSortBy("newest");
    setCurrentPage(1);
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500 pb-12">
      <div className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 sticky top-0 z-30 shadow-sm transition-colors duration-500">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-100 flex items-center gap-2">
              <MdFilterList className="text-primary" /> Available Tuitions
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder="Subject (e.g. Math)"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all dark:text-slate-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative">
                <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder="Location..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 outline-none text-sm dark:text-slate-200"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                />
              </div>

              <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 outline-none text-sm font-medium text-gray-600 dark:text-slate-300 appearance-none bg-white dark:bg-slate-800 cursor-pointer"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">All Classes</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 10">Class 10</option>
                <option value="HSC">HSC</option>
              </select>

              <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 outline-none text-sm font-medium text-gray-600 dark:text-slate-300 bg-white dark:bg-slate-800"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="salaryHigh">Salary: High to Low</option>
                <option value="salaryLow">Salary: Low to High</option>
              </select>

              <button
                onClick={resetFilters}
                className="flex items-center justify-center gap-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 py-2.5 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900/50"
              >
                <MdClear /> Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 mt-6 sm:mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
            Showing <span className="text-primary font-bold">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredJobs.length)}</span> of <span className="text-primary font-bold">{filteredJobs.length}</span> tuition posts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentItems.length > 0 ? (
            currentItems.map((job) => (
              <div
                key={job._id}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="p-5 grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                      {job.Medium}
                    </span>
                    <span className="text-gray-400 dark:text-slate-500 text-xs font-mono">
                      #{job._id?.slice(-5)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100 mb-2 leading-tight group-hover:text-primary transition-colors">
                    {job.Class}
                  </h3>

                  <div className="flex items-center text-gray-500 dark:text-slate-400 text-sm mb-4">
                    <MdLocationOn className="text-primary mr-1" />
                    <span className="truncate">
                      {job.selectDistrict || job.TuitionRegion}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 dark:text-slate-500 flex items-center gap-1">
                        <MdMenuBook /> Subject
                      </span>
                      <span className="font-bold text-gray-700 dark:text-slate-300 truncate max-w-[120px]">
                        {job.Subject}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 dark:text-slate-500 flex items-center gap-1">
                        <MdPerson /> Tutor Pref.
                      </span>
                      <span className="font-bold text-gray-700 dark:text-slate-300">
                        {job.Gender || "Any"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-gray-50 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/30 rounded-b-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 dark:text-slate-500 block font-bold uppercase">
                        Monthly
                      </span>
                      <span className="text-lg font-black text-primary">
                        {job.Salary} Tk
                      </span>
                    </div>
                    <Link to={`/viewdetails/${job._id}`}>
                      <button className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white hover:border-primary p-2.5 rounded-xl transition-all shadow-sm">
                        <MdArrowForward className="text-xl dark:text-slate-200" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="bg-gray-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdSearch className="text-3xl text-gray-400 dark:text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100">
                No Tuitions Found
              </h3>
              <p className="text-gray-500 dark:text-slate-400">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>

        {/* --- Pagination Controls --- */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
            >
              <MdNavigateBefore className="text-2xl" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                  currentPage === number
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:border-primary"
                }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
            >
              <MdNavigateNext className="text-2xl" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutionPost;