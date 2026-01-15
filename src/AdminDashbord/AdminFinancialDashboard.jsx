import React, { useEffect, useState } from 'react';
import { MdAccountBalance, MdTrendingUp, MdBarChart, MdHistory } from 'react-icons/md';
import { 
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
    BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
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

    // Dynamic Data for Charts
    const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
    
    // Aggregating data for Bar Chart (Weekly)
    const chartData = payments.reduce((acc, curr) => {
        const date = new Date(curr.paidAt).toLocaleDateString('en-GB', { weekday: 'short' });
        const existing = acc.find(d => d.name === date);
        if (existing) existing.amount += curr.amount;
        else acc.push({ name: date, amount: curr.amount });
        return acc;
    }, []).slice(-7);

    // Data for Donut Chart (Status Breakdown)
    const statusData = [
        { name: 'Paid', value: payments.filter(p => p.paymentStatus === 'paid').length },
        { name: 'Pending', value: payments.filter(p => p.paymentStatus !== 'paid').length },
    ];
    const COLORS = ['#8B5CF6', '#F43F5E'];

    if (loading) return <div className="h-screen flex items-center justify-center bg-slate-900"><Loading /></div>;

    return (
        <div className="min-h-screen bg-[#0F172A] text-slate-200 p-4 lg:p-10 font-sans">
            {/* 1. Top Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-black bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        Financial Engine
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Global monitoring & revenue flow</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl flex items-center gap-4">
                        <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg"><MdTrendingUp size={24}/></div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-500">Live Revenue</p>
                            <p className="text-xl font-black">৳{totalAmount.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Weekly Bar Chart (Glass Effect) */}
                <div className="lg:col-span-8 bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl p-6 rounded-[2.5rem]">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-lg font-bold flex items-center gap-2"><MdBarChart className="text-purple-400"/> Weekly Performance</h3>
                        <span className="text-xs bg-slate-700 px-3 py-1 rounded-full text-slate-400">Updates every 5s</span>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#A78BFA" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.8}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
                                <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#1E293B', border: 'none', borderRadius: '12px'}} />
                                <Bar dataKey="amount" fill="url(#barGradient)" radius={[10, 10, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Donut Chart (Compact) */}
                <div className="lg:col-span-4 bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl p-6 rounded-[2.5rem] flex flex-col items-center">
                    <h3 className="text-lg font-bold self-start mb-4">Payment Health</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={statusData} 
                                    innerRadius={70} 
                                    outerRadius={90} 
                                    paddingAngle={8} 
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex gap-6 mt-4">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded-full"></div> <span className="text-xs font-bold text-slate-400">Paid</span></div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-rose-500 rounded-full"></div> <span className="text-xs font-bold text-slate-400">Failed</span></div>
                    </div>
                </div>

                {/* 3. Modern Neon Table */}
                <div className="lg:col-span-12 bg-slate-800/20 border border-slate-800 rounded-[2.5rem] overflow-hidden">
                    <div className="p-8 border-b border-slate-800 flex justify-between items-center">
                        <h3 className="text-xl font-bold flex items-center gap-2"><MdHistory className="text-pink-500"/> Transaction Logs</h3>
                        <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">Export CSV</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900/50 text-slate-500 text-[10px] uppercase tracking-[0.2em]">
                                <tr>
                                    <th className="px-8 py-5">Initiator</th>
                                    <th className="px-8 py-5">Tutor ID</th>
                                    <th className="px-8 py-5">Timestamp</th>
                                    <th className="px-8 py-5 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {payments.map((p) => (
                                    <tr key={p._id} className="hover:bg-purple-500/5 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-slate-700 to-slate-600 flex items-center justify-center font-bold text-purple-400 border border-slate-600">
                                                    {p.StudentName[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-100 group-hover:text-purple-400 transition-colors">{p.StudentName}</p>
                                                    <p className="text-xs text-slate-500">{p.StudentEmail}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-mono text-slate-400">{p.TutorId}</td>
                                        <td className="px-8 py-6 text-sm text-slate-500">{new Date(p.paidAt).toLocaleDateString()}</td>
                                        <td className="px-8 py-6 text-right">
                                            <span className="text-lg font-black text-slate-100">৳{p.amount.toLocaleString()}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminFinancialDashboard;