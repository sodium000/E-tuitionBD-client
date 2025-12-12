/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { MdVisibility, MdClose, MdPerson } from 'react-icons/md';

// --- 1. DUMMY DATA ---
const initialPayments = [
    {
        id: 'P001',
        applicantName: 'Aisha Rahman',
        subject: 'Higher Math (Class 10)',
        transactionId: 'TXN-492837',
        date: '2025-12-11',
        status: 'Completed',
        tutorDetails: {
            name: 'Rohan Talukder',
            phone: '+880 17XX XXX 123',
            email: 'rohan.t@example.com',
            experience: '5 years',
            qualification: 'B.Sc. in Engineering',
        }
    },
    {
        id: 'P002',
        applicantName: 'Karim Ahmed',
        subject: 'General Science (Class 8)',
        transactionId: 'TXN-910284',
        date: '2025-12-10',
        status: 'Pending',
        tutorDetails: {
            name: 'Nusrat Jahan',
            phone: '+880 19XX XXX 456',
            email: 'nusrat.j@example.com',
            experience: '2 years',
            qualification: 'M.A. in Physics',
        }
    },
];

// --- 2. READ-ONLY MODAL COMPONENT ---
const TutorDetailsModal = ({ tutor, onClose }) => {
    if (!tutor) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                        <MdPerson className="mr-2 text-indigo-600 h-6 w-6" /> Tutor Details
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 transition duration-150"
                    >
                        <MdClose className="text-2xl" />
                    </button>
                </div>

                <div className="space-y-4">

                    {/* Read-only Fields */}
                    <DetailField label="Name" value={tutor.name} />
                    <DetailField label="Phone" value={tutor.phone} />
                    <DetailField label="Email" value={tutor.email} />
                    <DetailField label="Experience" value={tutor.experience} />
                    <DetailField label="Qualification" value={tutor.qualification} />

                </div>
                <button
                    onClick={onClose}
                    className="w-full mt-6 bg-indigo-600 text-white p-2 rounded-md font-medium hover:bg-indigo-700 transition duration-150"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

// Helper component for read-only detail display
const DetailField = ({ label, value }) => (
    <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
        <label className="block text-xs font-medium text-gray-500 uppercase">{label}:</label>
        <p className="text-sm font-semibold text-gray-800 mt-1">{value}</p>
    </div>
);


const PaymentTable = () => {
    const [payments, setPayments] = useState(initialPayments);
    const [viewingTutor, setViewingTutor] = useState(null); 

    const handleViewDetails = (tutorDetails) => {
        setViewingTutor(tutorDetails);
    };

    // Helper function for Tailwind status styling
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Pending':
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Payment Transaction History</h2>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {payments.map((payment) => (
                            <tr key={payment.id} className="hover:bg-gray-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.applicantName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.subject}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{payment.transactionId}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(payment.status)}`}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleViewDetails(payment.tutorDetails)}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                                    >
                                        <MdVisibility className="mr-1 h-5 w-5" />
                                        View Tutor
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Render Modal only if viewingTutor has data */}
            {viewingTutor && (
                <TutorDetailsModal
                    tutor={viewingTutor}
                    onClose={() => setViewingTutor(null)}
                />
            )}
        </div>
    );
};

export default PaymentTable;