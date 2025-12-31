import React, { useEffect, useState } from 'react';

import {
    MdAccountBalance,
    MdAttachMoney,
    MdReceipt,
} from 'react-icons/md';
import Loading from '../Component/Loading/Loading';
import useAxiosSecure from '../hook/useAxiosSecure';

const AdminFinancialDashboard = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/payments/all')
            .then(res => {
                setPayments(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [axiosSecure]);

    const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalTransactions = payments.length;

    if (loading) {
        return <div className="text-center py-20"><Loading></Loading></div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                <MdAccountBalance className="text-indigo-600" />
                Admin Financial Dashboard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-sm text-gray-500">Total Transactions</p>
                    <p className="text-3xl font-bold text-indigo-600">
                        {totalTransactions}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-3xl font-bold text-green-600">
                        ৳{totalAmount.toLocaleString()}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-sm text-gray-500">Currency</p>
                    <p className="text-3xl font-bold text-gray-700 uppercase">
                        BDT
                    </p>
                </div>

            </div>

            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <MdReceipt className="text-indigo-600" />
                Payment History
            </h3>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-5 py-3 text-left text-xs font-medium">Date</th>
                            <th className="px-5 py-3 text-left text-xs font-medium">Student</th>
                            <th className="px-5 py-3 text-left text-xs font-medium">Tutor</th>
                            <th className="px-5 py-3 text-left text-xs font-medium">Tracking ID</th>
                            <th className="px-5 py-3 text-left text-xs font-medium">Transaction</th>
                            <th className="px-5 py-3 text-right text-xs font-medium">Amount</th>
                            <th className="px-5 py-3 text-center text-xs font-medium">Status</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {payments.map(payment => (
                            <tr key={payment._id} className="hover:bg-gray-50">

                                {/* Date */}
                                <td className="px-5 py-4 text-sm">
                                    {new Date(payment.paidAt).toLocaleDateString()}
                                </td>

                                {/* Student */}
                                <td className="px-5 py-4 text-sm">
                                    <p className="font-medium">{payment.StudentName}</p>
                                    <p className="text-gray-500 text-xs">{payment.StudentEmail}</p>
                                </td>

                                {/* Tutor */}
                                <td className="px-5 py-4 text-sm">
                                    <p className="font-medium">{payment.TutorName}</p>
                                    <p className="text-gray-500 text-xs">ID: {payment.TutorId}</p>
                                </td>

                                {/* Tracking */}
                                <td className="px-5 py-4 text-sm">
                                    {payment.trackingId}
                                </td>

                                {/* Transaction */}
                                <td className="px-5 py-4 text-sm">
                                    <p className="truncate max-w-[180px]">
                                        {payment.transactionId}
                                    </p>
                                </td>

                                {/* Amount */}
                                <td className="px-5 py-4 text-right font-semibold">
                                    ৳{payment.amount.toLocaleString()}
                                </td>

                                {/* Status */}
                                <td className="px-5 py-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${payment.paymentStatus === 'paid'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'}`}
                                    >
                                        {payment.paymentStatus}
                                    </span>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

                {payments.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No payment records found
                    </div>
                )}
            </div>

        </div>
    );
};

export default AdminFinancialDashboard;
