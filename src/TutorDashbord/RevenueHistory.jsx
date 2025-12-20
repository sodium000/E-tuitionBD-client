import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    MdAttachMoney,
    MdTrendingUp,
    MdReceipt,
} from 'react-icons/md';
import useAxiosSecure from '../hook/useAxiosSecure';
import Loading from '../Component/Loading/Loading';
import useAuth from '../hook/useAuth';

// --- Helper Components ---
const StatCard = ({ title, value, icon, iconColor, isCurrency = true }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-start space-x-4">
        <div className={`p-3 rounded-full ${iconColor} bg-opacity-20`}>
            {React.cloneElement(icon, { className: 'text-2xl ' + iconColor })}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">
                {isCurrency ? `৳${value.toLocaleString()}` : value}
            </p>
        </div>
    </div>
);

const RevenueHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading: authLoading } = useAuth();

    const { data: transactions = [], isLoading } = useQuery({
        queryKey: ['revenue-history', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const response = await axiosSecure.get(`/tuitions/${user.email}/ongoing`);
            return response.data;
        },
    });

    const totalEarnings = transactions.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    const totalCount = transactions.length;

    if (authLoading || isLoading) return <Loading />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                <MdTrendingUp className="text-indigo-600" /> Revenue History
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <StatCard
                    title="Total Lifetime Earnings"
                    value={totalEarnings}
                    icon={<MdAttachMoney />}
                    iconColor="text-indigo-600"
                />
                <StatCard
                    title="Total Transactions"
                    value={totalCount}
                    icon={<MdReceipt />}
                    iconColor="text-teal-600"
                    isCurrency={false}
                />
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-5">Detailed Transaction Log</h3>
            <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student / Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tracking ID</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {transactions.map((tx) => (
                            <tr key={tx._id} className="hover:bg-gray-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {new Date(tx.paidAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="font-medium text-gray-900">{tx.StudentName}</div>
                                    <div className="text-xs text-gray-500">{tx.customer_email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">
                                    {tx.trackingId}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-green-600">
                                    +{tx.amount} <span className="text-xs uppercase">{tx.currency}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                        {tx.paymentStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {transactions.length === 0 && (
                    <div className="text-center py-10 text-gray-500 bg-white">
                        No revenue transactions recorded yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default RevenueHistory;