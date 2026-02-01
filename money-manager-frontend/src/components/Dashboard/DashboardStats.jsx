import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const StatCard = ({ title, amount, icon: Icon, color, bg }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-transform hover:scale-[1.02]">
        <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
            <h3 className={`text-2xl font-bold ${color}`}>
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)}
            </h3>
        </div>
        <div className={`p-4 rounded-full ${bg} ${color}`}>
            <Icon size={24} />
        </div>
    </div>
);

const DashboardStats = () => {
    const { stats, loading } = useGlobalContext();

    if (loading && !stats.totalIncome && !stats.totalExpense) return <div className="animate-pulse h-32 bg-gray-200 rounded-2xl"></div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
                title="Total Income"
                amount={stats.totalIncome}
                icon={TrendingUp}
                color="text-green-600"
                bg="bg-green-50"
            />
            <StatCard
                title="Total Expense"
                amount={stats.totalExpense}
                icon={TrendingDown}
                color="text-red-600"
                bg="bg-red-50"
            />
            <StatCard
                title="Total Balance"
                amount={stats.balance}
                icon={Wallet}
                color="text-blue-600"
                bg="bg-blue-50"
            />
        </div>
    );
};

export default DashboardStats;
