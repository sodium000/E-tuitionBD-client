import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import Loading from "../Loading/Loading";
import {
  MdLocationOn, MdHome, MdSchedule, MdSchool,
  MdPerson, MdMenuBook, MdPayments,
  MdArrowForward, MdSearch, MdFilterList, MdClear
} from "react-icons/md";
import { Link } from "react-router";

const TutionPost = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://e-tuition-bd-server-eosin.vercel.app/post`);
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Combined Filtering Logic
  useEffect(() => {
    let result = [...jobs];

    // Search by Subject or Title
    if (searchQuery) {
      result = result.filter((job) =>
        job.Subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.Medium?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by Class
    if (selectedClass) {
      result = result.filter((job) => job.Class === selectedClass);
    }

    // Filter by Location
    if (selectedLocation) {
      result = result.filter((job) =>
        (job.selectDistrict || job.TuitionRegion)?.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Sorting
    if (sortBy === "salaryHigh") {
      result.sort((a, b) => (Number(b.Salary) || 0) - (Number(a.Salary) || 0));
    } else if (sortBy === "salaryLow") {
      result.sort((a, b) => (Number(a.Salary) || 0) - (Number(b.Salary) || 0));
    } else {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredJobs(result);
  }, [searchQuery, selectedClass, selectedLocation, sortBy, jobs]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedClass("");
    setSelectedLocation("");
    setSortBy("newest");
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-12">
      {/* --- Modern Header Section --- */}
      <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <MdFilterList className="text-primary" /> Available Tuitions
            </h1>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Search Subject */}
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Subject (e.g. Math)"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Location Input */}
              <div className="relative">
                <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                />
              </div>

              {/* Class Select */}
              <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none text-sm font-medium text-gray-600 appearance-none bg-white cursor-pointer"
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

              {/* Sort Select */}
              <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none text-sm font-medium text-gray-600 bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="salaryHigh">Salary: High to Low</option>
                <option value="salaryLow">Salary: Low to High</option>
              </select>

              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="flex items-center justify-center gap-2 text-sm font-bold text-red-500 hover:bg-red-50 py-2.5 rounded-lg transition-colors border border-transparent hover:border-red-100"
              >
                <MdClear /> Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Results Section --- */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <p className="mb-6 text-sm text-gray-500 font-medium">
          Showing <span className="text-primary font-bold">{filteredJobs.length}</span> tuition posts
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job._id} className="group bg-white rounded-2xl border border-gray-200 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="p-5 grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                      {job.Medium}
                    </span>
                    <span className="text-gray-400 text-xs font-mono">#{job._id?.slice(-5)}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight group-hover:text-primary transition-colors">
                    {job.Class}
                  </h3>

                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MdLocationOn className="text-primary mr-1" />
                    <span className="truncate">{job.selectDistrict || job.TuitionRegion}</span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 flex items-center gap-1">
                        <MdMenuBook /> Subject
                      </span>
                      <span className="font-bold text-gray-700 truncate max-w-[120px]">{job.Subject}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 flex items-center gap-1">
                        <MdPerson /> Tutor Pref.
                      </span>
                      <span className="font-bold text-gray-700">{job.Gender || "Any"}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-gray-50 bg-gray-50/50 rounded-b-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">Monthly</span>
                      <span className="text-lg font-black text-primary">{job.Salary} Tk</span>
                    </div>
                    <Link to={`/viewdetails/${job._id}`}>
                      <button className="bg-white border border-gray-200 hover:bg-primary hover:text-white hover:border-primary p-2.5 rounded-xl transition-all shadow-sm">
                        <MdArrowForward className="text-xl" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdSearch className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">No Tuitions Found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutionPost;