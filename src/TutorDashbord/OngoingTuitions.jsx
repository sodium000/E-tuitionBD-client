/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import {
    MdCalendarToday,
    MdBook,
    MdPerson,
    MdDateRange
} from 'react-icons/md';

// --- 1. Mock Data ---
const initialTuitions = [
    {
        id: 101,
        course: 'Advanced Calculus I',
        student: 'Alice Johnson',
        startDate: '2025-11-01',
        scheduleID: 'CAL-A-2025',
        status: 'Active',
    },
    {
        id: 102,
        course: 'Intro to Python',
        student: 'Charlie Brown',
        startDate: '2025-10-01',
        scheduleID: 'PYT-C-2025',
        status: 'Active',
    },
    {
        id: 103,
        course: 'Linear Algebra',
        student: 'Eva Green',
        startDate: '2025-12-05',
        scheduleID: 'LIN-E-2025',
        status: 'Active',
    },
];

const OngoingTuitions = () => {
    const [tuitions, setTuitions] = useState(initialTuitions);

    const handleViewSchedule = (scheduleID) => {
        alert(`Navigating to schedule details for: ${scheduleID}`);
    };

    return (
        <div className="p-6 bg-white min-h-screen">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MdBook className="text-indigo-600" /> Tutor Ongoing Tuitions
            </h2>
            <p className="text-gray-600 mb-8">
                All tuitions that have been **approved** by the student and are currently active.
            </p>

            <div className="overflow-x-auto shadow-2xl rounded-xl border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead className="bg-indigo-50 border-b border-indigo-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                                <MdBook className="inline mr-1" /> Course Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                                <MdPerson className="inline mr-1" /> Student Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                                <MdDateRange className="inline mr-1" /> Start Date
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                                Payment ID
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {tuitions.map((tuition) => (
                            <tr key={tuition.id} className="hover:bg-gray-50 transition duration-150">

                                {/* Course Title */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {tuition.course}
                                </td>

                                {/* Student Name */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {tuition.student}
                                </td>

                                {/* Start Date */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {tuition.startDate}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <p
                                        className="inline-flex items-center gap-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm"
                                    >
                                        Payment id
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {tuitions.length === 0 && (
                    <div className="text-center py-10 text-gray-500 bg-white">
                        You do not have any ongoing tuitions yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default OngoingTuitions;