import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { formatUTCDateTimeForDisplay } from '../../utils/dateUtils';

const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

const getAccountLabel = (t) => {
    if (t.type === 'INCOME' && t.targetAccount) return `To: ${t.targetAccount}`;
    if (t.type === 'EXPENSE' && t.sourceAccount) return `From: ${t.sourceAccount}`;
    return null;
};

const RecentTransactionRow = ({ transaction }) => {
    const isIncome = transaction.type === 'INCOME';
    const accountLabel = getAccountLabel(transaction);

    const iconClass = isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
    const amountClass = isIncome ? 'text-green-600' : 'text-red-600';

    const subText = [accountLabel, transaction.category && (transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1).toLowerCase()), formatUTCDateTimeForDisplay(transaction.transactionDate)].filter(Boolean).join(' · ');

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
                <div className={`p-2.5 rounded-full shrink-0 ${iconClass}`}>
                    {isIncome ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
                </div>
                <div className="min-w-0">
                    <p className="font-medium text-gray-800 truncate">{transaction.description}</p>
                    <p className="text-xs text-gray-500 truncate">{subText}</p>
                </div>
            </div>
            <p className={`font-semibold shrink-0 ${amountClass}`}>
                {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
            </p>
        </div>
    );
};

const RecentTransactions = () => {
    const { transactions, loading } = useGlobalContext();

    if (loading && !transactions?.length) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
                <div className="h-14 bg-gray-100 rounded-xl animate-pulse" />
                <div className="h-14 bg-gray-100 rounded-xl animate-pulse" />
                <div className="h-14 bg-gray-100 rounded-xl animate-pulse" />
            </div>
        );
    }

    const recent = (transactions || []).slice(0, 3);
    if (recent.length === 0) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400">
                No recent transactions
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-3">
            {recent.map((t) => (
                <RecentTransactionRow key={t.id} transaction={t} />
            ))}
        </div>
    );
};

export default RecentTransactions;
