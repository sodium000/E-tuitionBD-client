/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// Import necessary icons from react-icons
// You might need to install this: npm install react-icons
import {
    MdAttachMoney,
    MdTrendingUp,
    MdReceipt,
    MdCalendarMonth,
    MdArrowUpward,
    MdArrowDownward
} from 'react-icons/md';

// --- 1. Mock Data ---
const mockSummary = {
    totalEarnings: 8540.50,
    lastMonthEarnings: 1250.00,
    transactionsCount: 42,
    // This could represent month-over-month change
    earningsChange: 15.2,
};

const initialTransactions = [
    {
        id: 1,
        date: '2025-11-30',
        description: 'Payment for Advanced Calculus (Session 10-12)',
        amount: 350.00,
        type: 'Credit', // Credit = Income, Debit = Withdrawal/Fee
        status: 'Completed',
    },
    {
        id: 2,
        date: '2025-11-28',
        description: 'Platform Service Fee (2% of transaction)',
        amount: -7.00,
        type: 'Debit',
        status: 'Completed',
    },
    {
        id: 3,
        date: '2025-11-15',
        description: 'Monthly Withdrawal to Bank Account',
        amount: -1000.00,
        type: 'Debit',
        status: 'Completed',
    },
    {
        id: 4,
        date: '2025-12-05',
        description: 'Payment for Intro to Python (Session 1-3)',
        amount: 180.00,
        type: 'Credit',
        status: 'Pending',
    },
];

// --- 2. Helper Components ---

// Dashboard card for displaying summary metrics
const StatCard = ({ title, value, icon, iconColor, trend, isCurrency = true }) => {
    const trendColor = trend > 0 ? 'text-green-600' : (trend < 0 ? 'text-red-600' : 'text-gray-500');
    const TrendIcon = trend > 0 ? MdArrowUpward : MdArrowDownward;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-start space-x-4">
            <div className={`p-3 rounded-full ${iconColor} bg-opacity-20`}>
                {React.cloneElement(icon, { className: 'text-2xl ' + iconColor })}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-1">
                    {isCurrency ? `$${value.toFixed(2)}` : value}
                </p>
                {trend !== undefined && (
                    <div className={`flex items-center text-sm font-semibold mt-1 ${trendColor}`}>
                        <TrendIcon className="w-4 h-4 mr-1" />
                        {Math.abs(trend).toFixed(1)}% vs. Last Month
                    </div>
                )}
            </div>
        </div>
    );
};


// Function to determine the transaction amount styling
const AmountDisplay = ({ amount, type }) => {
    const color = type === 'Credit' ? 'text-green-600' : 'text-red-600';
    const sign = type === 'Credit' ? '+' : '-';

    return (
        <span className={`font-semibold ${color}`}>
            {sign}${Math.abs(amount).toFixed(2)}
        </span>
    );
};


// --- 3. Main Component ---
const RevenueHistory = () => {
    const [transactions, setTransactions] = useState(initialTransactions);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                <MdTrendingUp className="text-indigo-600" /> Revenue History
            </h2>
            <p className="text-gray-600 mb-8">
                See your **total earnings** and a detailed log of all transactions and payouts.
            </p>

            {/* --- Earnings Summary Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <StatCard
                    title="Total Lifetime Earnings"
                    value={mockSummary.totalEarnings}
                    icon={<MdAttachMoney />}
                    iconColor="text-indigo-600"
                />
                <StatCard
                    title="Earnings Last Month"
                    value={mockSummary.lastMonthEarnings}
                    icon={<MdCalendarMonth />}
                    iconColor="text-orange-600"
                    trend={mockSummary.earningsChange}
                />
                <StatCard
                    title="Total Transactions"
                    value={mockSummary.transactionsCount}
                    icon={<MdReceipt />}
                    iconColor="text-teal-600"
                    isCurrency={false}
                />
            </div>

            {/* --- Detailed Transaction History Table --- */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                Detailed Transaction Log
            </h3>

            <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-gray-50 transition duration-150">

                                {/* Date */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {tx.date}
                                </td>

                                {/* Description */}
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {tx.description}
                                </td>

                                {/* Amount */}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <AmountDisplay amount={tx.amount} type={tx.type} />
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span
                                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${tx.status === 'Completed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                    >
                                        {tx.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {transactions.length === 0 && (
                    <div className="text-center py-10 text-gray-500 bg-white">
                        No transactions recorded yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default RevenueHistory;