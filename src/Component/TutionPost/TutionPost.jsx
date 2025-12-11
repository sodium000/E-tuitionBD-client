import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import {
  MdLocationOn,
  MdHome,
  MdSchedule,
  MdApartment,
  MdSchool,
  MdCalendarMonth,
  MdPerson,
  MdMenuBook,
  MdPayments,
  MdArrowForward,
} from "react-icons/md";
import { Link } from "react-router";

const TutionPost = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (search = "") => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/post?search=${search}`
      );

      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(jobs);

  useEffect(() => {
    fetchJobs("");
  }, []);

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to calculate time ago
  const getTimeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return formatDate(dateString);
  };

  // Helper function to format salary
  const formatSalary = (salary) => {
    if (!salary) return "0";
    return Number(salary).toLocaleString("en-US");
  };

  const getSubjects = (subject) => {
    if (!subject) return [];
    if (Array.isArray(subject)) return subject;
    if (typeof subject === "string") {
      return subject.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return [subject];
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {jobs.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-text-secondary-light">No jobs found</p>
          </div>
        ) : (
          jobs.map((job, index) => {
            const location = job.selectDistrict || job.TuitionRegion || "Location not specified";
            const jobId = job._id ? job._id.slice(-6).toUpperCase() : `JOB${String(index + 1).padStart(5, "0")}`;
            const title = `Tutor Needed For ${job.Medium || "Tutoring"}`;
            const tutoringType = job.Tutoring || "In-Person";
            const timeAgo = getTimeAgo(job.createdAt);
            const medium = job.Medium || "N/A";
            const classLevel = job.Class || "N/A";
            const tutoringDays = job.Day ? `${job.Day} Days/Week` : "N/A";
            const preferredTutor = job.Gender || "N/A";
            const subjects = getSubjects(job.Subject);
            const salary = formatSalary(job.Salary);
            const postedAt = formatDate(job.createdAt);

            return (
              <div
                key={job._id || index}
                className="bg-background-light font-display flex items-center justify-center transition-colors duration-300"
              >
                <div className="w-full max-w-md bg-surface-light rounded-xl shadow-lg border border-gray-200 overflow-hidden relative">
                  {/* === Card Header === */}
                  <div className="p-5 pb-2">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center text-text-secondary-light text-sm font-medium">
                        <MdLocationOn className="text-[18px] mr-1 text-primary" />
                        <span>{location}</span>
                      </div>
                      <span className="bg-blue-50 text-blue-600 border border-blue-200 text-xs font-semibold px-2.5 py-1 rounded-md">
                        Job ID: {jobId}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-text-primary-light leading-tight mb-4">
                      {title}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white shadow-sm">
                        <MdHome className="text-[16px] mr-1.5" />
                        {tutoringType}
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-secondary text-white shadow-sm">
                        <MdSchedule className="text-[16px] mr-1.5" />
                        {timeAgo}
                      </span>
                    </div>
                  </div>
                  <div className="h-px bg-gray-100 mx-5 my-2"></div>
                  <div className="p-5 pt-2 grid grid-cols-2 gap-y-6 gap-x-4">
                    <div className="col-span-1">
                      <div className="flex items-center text-text-secondary-light text-xs mb-1">
                        <MdApartment className="text-[16px] mr-1.5 opacity-70" />
                        Medium:
                      </div>
                      <div className="font-semibold text-text-primary-light text-sm">
                        {medium}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="flex items-center text-text-secondary-light text-xs mb-1">
                        <MdSchool className="text-[16px] mr-1.5 opacity-70" />
                        Class:
                      </div>
                      <div className="font-semibold text-text-primary-light text-sm">
                        {classLevel}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="flex items-center text-text-secondary-light text-xs mb-1">
                        <MdCalendarMonth className="text-[16px] mr-1.5 opacity-70" />
                        Tutoring Days:
                      </div>
                      <div className="font-semibold text-text-primary-light text-sm">
                        {tutoringDays}
                      </div>
                    </div>

                    <div className="col-span-1">
                      <div className="flex items-center text-text-secondary-light text-xs mb-1">
                        <MdPerson className="text-[16px] mr-1.5 opacity-70" />
                        Preferred Tutor:
                      </div>
                      <div className="font-semibold text-text-primary-light text-sm">
                        {preferredTutor}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="flex items-center text-text-secondary-light text-xs mb-2">
                        <MdMenuBook className="text-[16px] mr-1.5 opacity-70" />
                        Subject:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {subjects.length > 0 ? (
                          subjects.map((subject, idx) => (
                            <span
                              key={idx}
                              className="bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide"
                            >
                              {subject}
                            </span>
                          ))
                        ) : (
                          <span className="text-text-secondary-light text-xs">N/A</span>
                        )}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="flex items-center text-text-secondary-light text-xs mb-1">
                        <MdPayments className="text-[16px] mr-1.5 opacity-70" />
                        Salary:
                      </div>
                      <div className="flex items-baseline">
                        <span className="font-bold text-2xl text-blue-600 mr-1">
                          {salary} Tk
                        </span>
                        <span className="text-xs text-text-secondary-light font-medium">
                          /Month
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-gray-100 gap-4">
                    <div className="text-[11px] text-text-secondary-light font-medium">
                      Posted at:{" "}
                      <span className="text-text-primary-light">{postedAt}</span>
                    </div>
                    <Link to={`/viewdetails/${job._id}`}>
                      <button className="w-full sm:w-auto bg-linear-to-r from-primary to-fuchsia-700 hover:from-fuchsia-700 hover:to-primary text-white text-sm font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95 flex justify-center items-center group">
                        View Details
                        <MdArrowForward className="text-[18px] ml-1 transition-transform group-hover:translate-x-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TutionPost;
