import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// --- 1. DUMMY APPLICATION DATA ---
const initialApplications = [
    {
        id: 'A001',
        name: 'Aisha Rahman',
        payment: 'BDT 10,000 / Month',
        status: 'Pending',
    },
    {
        id: 'A002',
        name: 'Karim Ahmed',
        payment: 'BDT 8,500 / Month',
        status: 'Pending',
    },
    {
        id: 'A003',
        name: 'Nadia Khan',
        payment: 'BDT 12,000 / Month',
        status: 'Accepted',
    },
    {
        id: 'A004',
        name: 'Ratul Hossain',
        payment: 'BDT 9,000 / Month',
        status: 'Rejected',
    },
];

// --- 2. MAIN APPLICATION TABLE COMPONENT ---
const ApplicationTable = () => {
    const [applications, setApplications] = useState(initialApplications);

    // Function to update the status of an application
    const updateStatus = (id, newStatus) => {
        setApplications(prevApps =>
            prevApps.map(app =>
                app.id === id ? { ...app, status: newStatus } : app
            )
        );
        alert(`Application ${id} has been set to: ${newStatus}`);
    };

    // Handler for the Accept button
    const handleAccept = (id) => {
        updateStatus(id, 'Accepted');
    };

    // Handler for the Reject button
    const handleReject = (id) => {
        updateStatus(id, 'Rejected');
    };

    // Helper function for Tailwind status styling
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Accepted':
                return 'bg-green-100 text-green-800';
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            case 'Pending':
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Tutor Applications Review</h2>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required Payment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {applications.map((app) => (
                            <tr key={app.id} className="hover:bg-gray-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.payment}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(app.status)}`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">

                                    {/* Accept Button (Only shown if Pending or Rejected) */}
                                    {app.status !== 'Accepted' && (
                                        <button
                                            onClick={() => handleAccept(app.id)}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
                                            disabled={app.status === 'Accepted'}
                                        >
                                            <FaCheckCircle className="mr-1 h-4 w-4" />
                                            Accept
                                        </button>
                                    )}

                                    {/* Reject Button (Only shown if Pending or Accepted) */}
                                    {app.status !== 'Rejected' && (
                                        <button
                                            onClick={() => handleReject(app.id)}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
                                            disabled={app.status === 'Rejected'}
                                        >
                                            <FaTimesCircle className="mr-1 h-4 w-4" />
                                            Reject
                                        </button>
                                    )}

                                    {/* Message if already finalized (Optional) */}
                                    {app.status !== 'Pending' && (
                                        <span className="text-gray-500 text-sm">Action taken.</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationTable;