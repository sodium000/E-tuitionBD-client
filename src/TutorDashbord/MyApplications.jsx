import React, { useState } from 'react';
import {
    MdEdit,
    MdDelete,
    MdCheckCircle,
    MdAccessTime,
    MdCancel
} from 'react-icons/md';

// --- 1. Mock Data ---
const initialApplications = [
    {
        id: 1,
        course: 'Advanced Calculus I',
        student: 'Alice Johnson',
        dateSubmitted: '2025-10-25',
        status: 'Approved', // 'Approved', 'Pending', 'Rejected'
        canEdit: true,
    },
    {
        id: 2,
        course: 'Organic Chemistry II',
        student: 'Bob Smith',
        dateSubmitted: '2025-11-01',
        status: 'Pending',
        canEdit: true,
    },
    {
        id: 3,
        course: 'Intro to Python',
        student: 'Charlie Brown',
        dateSubmitted: '2025-09-15',
        status: 'Approved',
        canEdit: false, // Cannot edit after approval (as per your prompt's logic)
    },
    {
        id: 4,
        course: 'European History',
        student: 'Diana Prince',
        dateSubmitted: '2025-11-20',
        status: 'Rejected',
        canEdit: true,
    },
];

// --- 2. Helper Functions/Components ---

// Function to determine the status icon and styling
const StatusPill = ({ status }) => {
    let icon, color;
    switch (status) {
        case 'Approved':
            icon = <MdCheckCircle className="text-lg" />;
            color = 'text-green-700 bg-green-100';
            break;
        case 'Pending':
            icon = <MdAccessTime className="text-lg" />;
            color = 'text-yellow-700 bg-yellow-100';
            break;
        case 'Rejected':
            icon = <MdCancel className="text-lg" />;
            color = 'text-red-700 bg-red-100';
            break;
        default:
            icon = <MdAccessTime className="text-lg" />;
            color = 'text-gray-700 bg-gray-100';
    }

    return (
        <div className={`inline-flex items-center gap-1 px-3 py-1 font-semibold rounded-full ${color}`}>
            {icon}
            <span>{status}</span>
        </div>
    );
};

const MyApplications = () => {
    const [applications, setApplications] = useState(initialApplications);


    const handleEdit = (id) => {
        alert(`Editing application ID: ${id}`);

    };

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete application ID: ${id}?`)) {
            setApplications(applications.filter(app => app.id !== id));
        }
    };
    return (
        <div>

            return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    My Applications
                </h2>
                <p className="text-gray-600 mb-8">
                    Track the status of your tuition applications. Tutors can update or delete their requests until they are **approved**.
                </p>

                <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Course
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Student
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date Submitted
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {applications.map((app) => (
                                <tr key={app.id} className="hover:bg-indigo-50 transition duration-150">

                                    {/* Course */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {app.course}
                                    </td>

                                    {/* Student */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {app.student}
                                    </td>

                                    {/* Date Submitted */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {app.dateSubmitted}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <StatusPill status={app.status} />
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        {app.status !== 'Approved' ? ( // Logic: Cannot edit/delete if Approved
                                            <div className="flex justify-center space-x-3">

                                                {/* Edit Button */}
                                                <button
                                                    onClick={() => handleEdit(app.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 transition duration-150 p-2 rounded-full hover:bg-indigo-100"
                                                    title="Edit Application"
                                                >
                                                    <MdEdit className="text-xl" />
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDelete(app.id)}
                                                    className="text-red-600 hover:text-red-900 transition duration-150 p-2 rounded-full hover:bg-red-100"
                                                    title="Delete Application"
                                                >
                                                    <MdDelete className="text-xl" />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 italic text-xs">
                                                Actions locked
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {applications.length === 0 && (
                        <div className="text-center py-10 text-gray-500 bg-white">
                            No applications found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyApplications;