import React, { useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import DashboardStats from '../components/Dashboard/DashboardStats';
import StatsChart from '../components/Charts/StatsChart';
import IncomeVsExpenseChart from '../components/Charts/IncomeVsExpenseChart';
import CategorySummaryTable from '../components/Dashboard/CategorySummaryTable';
import RecentTransactions from '../components/Transactions/RecentTransactions';
import Select from '../components/UI/Select';

const Dashboard = () => {
    const { loadDashboardData, period, setPeriod } = useGlobalContext();

    useEffect(() => {
        loadDashboardData(0, 3, period);
        // eslint-disable-next-line -- load on period change only
    }, [period]);

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <h1 className="text-xl font-semibold text-gray-800">How is my money situation right now?</h1>
                <Select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    name="period"
                    aria-label="Time period"
                    className="w-full sm:w-auto min-w-[160px] bg-gray-100 border-gray-200"
                >
                    <option value="weekly">This Week</option>
                    <option value="monthly">This Month</option>
                    <option value="yearly">This Year</option>
                </Select>
            </div>

            <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Summary</h2>
                <DashboardStats />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
                <section>
                    <StatsChart />
                </section>
                <section>
                    <IncomeVsExpenseChart />
                </section>
            </div>

            <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Category Summary</h2>
                <CategorySummaryTable />
            </section>

            <section>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Transactions</h2>
                <RecentTransactions />
            </section>
        </>
    );
};

export default Dashboard;
