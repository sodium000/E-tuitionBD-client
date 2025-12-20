import React, { useState } from 'react';
import { MdVisibility, MdClose, MdPerson, MdEmail, MdPhone, MdLocationOn, MdCalendarToday, MdAttachMoney, MdSchool, MdAccessTime } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hook/useAxiosSecure';
import useAuth from '../hook/useAuth';
import Loading from '../Component/Loading/Loading';


const TutorDetailsModal = ({ tutorId, onClose }) => {
    const axiosSecure = useAxiosSecure();

    const { data: tutor, isLoading } = useQuery({
        queryKey: ['tutorDetails', tutorId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tutor/${tutorId}/tutorDetails`);
            return res.data;

        },
        enabled: !!tutorId,
    });


    if (!tutorId) return null;

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
                    <Loading />
                </div>
            </div>
        );
    }

    if (!tutor) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300">
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
                    {/* Tutor Image and Basic Info */}
                    {tutor.photoURL && (
                        <div className="flex justify-center mb-4">
                            <img
                                src={tutor.photoURL}
                                alt={tutor.displayName || tutor.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200"
                            />
                        </div>
                    )}

                    {/* Read-only Fields */}
                    <DetailField label="Name" value={tutor.displayName || tutor.name} />
                    <DetailField label="Email" value={tutor.Email || tutor.email} icon={<MdEmail />} />
                    <DetailField label="Phone" value={tutor.Phone || tutor.phone} icon={<MdPhone />} />

                    {tutor.PreferredArea && (
                        <DetailField label="Preferred Area" value={tutor.PreferredArea} icon={<MdLocationOn />} />
                    )}

                    {tutor.TuitionRegion && (
                        <DetailField label="Tuition Region" value={tutor.TuitionRegion} icon={<MdLocationOn />} />
                    )}

                    {tutor.selectDistrict && (
                        <DetailField label="District" value={tutor.selectDistrict} icon={<MdLocationOn />} />
                    )}

                    {tutor.preferredAreaToTeach && (
                        <DetailField label="Preferred Area to Teach" value={tutor.preferredAreaToTeach} icon={<MdLocationOn />} />
                    )}

                    {tutor.preferredTime && (
                        <DetailField label="Preferred Time" value={tutor.preferredTime} icon={<MdAccessTime />} />
                    )}

                    {tutor.daysPerWeek && (
                        <DetailField label="Days Per Week" value={`${tutor.daysPerWeek} days`} icon={<MdCalendarToday />} />
                    )}

                    {tutor.placeOfLearning && (
                        <DetailField label="Place of Learning" value={tutor.placeOfLearning} icon={<MdSchool />} />
                    )}

                    {tutor.preferredClass && (
                        <DetailField label="Preferred Class" value={tutor.preferredClass} icon={<MdSchool />} />
                    )}

                    {tutor.expectedMinimumSalary && (
                        <DetailField label="Expected Minimum Salary" value={`${tutor.expectedMinimumSalary} BDT`} icon={<MdAttachMoney />} />
                    )}

                    {tutor.education && (
                        <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
                            <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Education:</label>
                            {tutor.education.degree && (
                                <p className="text-sm font-semibold text-gray-800">{tutor.education.degree}</p>
                            )}
                            {tutor.education.institution && (
                                <p className="text-sm text-gray-600 mt-1">{tutor.education.institution}</p>
                            )}
                            {tutor.education.year && (
                                <p className="text-xs text-gray-500 mt-1">Year: {tutor.education.year}</p>
                            )}
                        </div>
                    )}

                    {tutor.createdAt && (
                        <DetailField label="Member Since" value={new Date(tutor.createdAt).toLocaleDateString()} icon={<MdCalendarToday />} />
                    )}
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
const DetailField = ({ label, value, icon }) => (
    <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
        <label className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase">
            {icon && <span className="text-indigo-600">{icon}</span>}
            {label}:
        </label>
        <p className="text-sm font-semibold text-gray-800 mt-1">{value || 'N/A'}</p>
    </div>
);


const PaymentTable = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [selectedTutorId, setSelectedTutorId] = useState(null);

    // Fetch payments
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data || [];
        },
        enabled: !!user?.email,
    });


    const handleViewDetails = (tutorId) => {
        setSelectedTutorId(tutorId);
    };

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'failed':
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (isLoading) {
        return (
            <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Payment Transaction History</h2>

            {payments.length === 0 ? (
                <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                    <p className="text-gray-500 text-lg">No payment transactions found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutor Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {payments.map((payment) => (
                                <tr key={payment._id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {payment.TutorName || payment.tutorName || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                        {payment.amount} {payment.currency?.toUpperCase() || 'BDT'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                        {payment.transactionId || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                        {payment.trackingId || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(payment.paidAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(payment.paymentStatus)}`}>
                                            {payment.paymentStatus || 'Unknown'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {payment.TutorId && (
                                            <button
                                                onClick={() => handleViewDetails(payment.TutorId)}
                                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                                            >
                                                <MdVisibility className="mr-1 h-5 w-5" />
                                                View Tutor
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Render Modal only if selectedTutorId is set */}
            {selectedTutorId && (
                <TutorDetailsModal
                    tutorId={selectedTutorId}
                    onClose={() => setSelectedTutorId(null)}
                />
            )}
        </div>
    );
};

export default PaymentTable;