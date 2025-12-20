import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    MdBook,
    MdPerson,
    MdDateRange,
    MdAttachMoney,
    MdConfirmationNumber
} from 'react-icons/md';
import useAxiosSecure from '../hook/useAxiosSecure';
import Loading from '../Component/Loading/Loading';
import useAuth from '../hook/useAuth';

const OngoingTuitions = () => {
    const axiosSecure = useAxiosSecure();
    const { user, } = useAuth();

    const { data: tuitions = [], isLoading } = useQuery({
        queryKey: ['ongoing-tuitions', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const response = await axiosSecure.get(`/tuitions/${user.email}/ongoing`);
            return response.data;
        },
    });

    console.log(tuitions)

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <div className="p-6 bg-white min-h-screen">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MdBook className="text-indigo-600" /> Tutor Ongoing Tuitions
            </h2>
            <p className="text-gray-600 mb-8">
                All tuitions that have been **approved** and paid.
            </p>

            <div className="overflow-x-auto shadow-2xl rounded-xl border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead className="bg-indigo-50 border-b border-indigo-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                                <MdPerson className="inline mr-1" /> Student / Tracking ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                                <MdAttachMoney className="inline mr-1" /> Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                                <MdDateRange className="inline mr-1" /> Paid At
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                                <MdConfirmationNumber className="inline mr-1" /> Transaction ID
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {tuitions.map((tuition) => (
                            <tr key={tuition.transactionId} className="hover:bg-gray-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{tuition.StudentName}</div>
                                    <div className="text-xs text-indigo-500 font-mono">{tuition.trackingId}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    <span className="font-bold uppercase">{tuition.currency}</span> {tuition.amount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {new Date(tuition.paidAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                        {tuition.transactionId}
                                    </span>
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