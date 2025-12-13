import React, { useState } from 'react';
// Import necessary icons from react-icons
import {
    MdAccountBalance,
    MdTrendingUp,
    MdAttachMoney,
    MdReceipt,
    MdOutlineGavel,
    MdArrowUpward,
} from 'react-icons/md';

// --- 1. Mock Data ---
const mockFinancialSummary = {
    platformEarnings: 15420.75, // Total revenue generated from all fees
    totalPayouts: 145000.00,  // Total amount paid out to Tutors
    netProfit: 920.75,         // platformEarnings - totalOperatingCosts (simplified)
    transactionVolume: 245000.00, // Total value of all successful transactions
    successRate: 98.5,           // Success rate percentage
};

const initialTransactions = [
    {
        id: 1001,
        date: '2025-12-10',
        description: 'Tutor Fee - Calculus I (Tutor: Bob S.)',
        amount: 350.00,
        fee: 7.00, // Service fee deducted
        netAmount: 343.00,
        type: 'Tuition Payment',
        status: 'Success',
    },
    {
        id: 1002,
        date: '2025-12-05',
        description: 'Tutor Payout - Monthly Withdrawal (Tutor: Alice J.)',
        amount: -1500.00,
        fee: 0.00,
        netAmount: -1500.00,
        type: 'Payout',
        status: 'Success',
    },
    {
        id: 1003,
        date: '2025-11-28',
        description: 'Tutor Fee - Python Intro (Tutor: Charlie B.)',
        amount: 180.00,
        fee: 3.60,
        netAmount: 176.40,
        type: 'Tuition Payment',
        status: 'Success',
    },
];

// --- 2. Helper Components ---

// Dashboard card for displaying summary metrics
const AdminStatCard = ({ title, value, icon, iconColor, unit = '$' }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-l-indigo-500 flex items-start space-x-4">
            <div className={`p-3 rounded-full ${iconColor} bg-opacity-20`}>
                {React.cloneElement(icon, { className: 'text-2xl ' + iconColor })}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-1">
                    {unit}{value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
            </div>
        </div>
    );
};


// --- 3. Main Component ---
const AdminFinancialDashboard = () => {
    const [transactions] = useState(initialTransactions);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                <MdAccountBalance className="text-indigo-600" /> Platform Financial Overview
            </h2>
            <p className="text-gray-600 mb-8">
                Review total platform earnings, transaction volume, and a history of all **successful** financial movements.
            </p>

            {/* --- Financial Summary Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <AdminStatCard
                    title="Total Transaction Volume"
                    value={mockFinancialSummary.transactionVolume}
                    icon={<MdTrendingUp />}
                    iconColor="text-green-600"
                />
                <AdminStatCard
                    title="Total Platform Earnings (Fees)"
                    value={mockFinancialSummary.platformEarnings}
                    icon={<MdAttachMoney />}
                    iconColor="text-indigo-600"
                />
                <AdminStatCard
                    title="Total Payouts to Tutors"
                    value={mockFinancialSummary.totalPayouts}
                    icon={<MdOutlineGavel />}
                    iconColor="text-orange-600"
                />
                <AdminStatCard
                    title="Success Rate"
                    value={mockFinancialSummary.successRate}
                    icon={<MdArrowUpward />}
                    iconColor="text-teal-600"
                    unit=""
                />
            </div>

            {/* --- Successful Transaction History Table --- */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
                <MdReceipt className="text-indigo-600" /> Successful Transaction History
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Gross Amount
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Platform Fee
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Net Amount
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

                                {/* Type */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span
                                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${tx.type === 'Tuition Payment'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-orange-100 text-orange-800'
                                            }`}
                                    >
                                        {tx.type}
                                    </span>
                                </td>

                                {/* Gross Amount */}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-800">
                                    ${tx.amount.toFixed(2)}
                                </td>

                                {/* Platform Fee */}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-red-600 font-medium">
                                    -${tx.fee.toFixed(2)}
                                </td>

                                {/* Net Amount */}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-green-700">
                                    ${tx.netAmount.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {transactions.length === 0 && (
                    <div className="text-center py-10 text-gray-500 bg-white">
                        No successful transactions have been recorded yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminFinancialDashboard;