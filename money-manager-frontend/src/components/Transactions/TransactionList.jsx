import React, { useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { Edit2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import AddTransactionModal from '../Modals/AddTransactionModal';
import { formatUTCDateTimeForDisplay } from '../../utils/dateUtils';

// Alias for display; backend sends UTC ISO, we show in local time
const formatDate = formatUTCDateTimeForDisplay;

const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

const getAccountLabel = (t) => {
    if (t.type === 'INCOME' && t.targetAccount) return `To: ${t.targetAccount}`;
    if (t.type === 'EXPENSE' && t.sourceAccount) return `From: ${t.sourceAccount}`;
    return null;
};

const TransactionItem = ({ transaction }) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    // Backend sends createdAt as UTC ISO; compare in same instant space
    const isEditable = () => {
        const created = new Date(transaction.createdAt);
        const now = new Date();
        const diffHours = (now - created) / 1000 / 60 / 60;
        return diffHours <= 12;
    };

    const isIncome = transaction.type === 'INCOME';
    const accountLabel = getAccountLabel(transaction);

    const iconClass = isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
    const amountClass = isIncome ? 'text-green-600' : 'text-red-600';

    return (
        <>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                <div className="flex items-start sm:items-center gap-4">
                    <div className={`p-3 rounded-full shrink-0 ${iconClass}`}>
                        {isIncome ? <ArrowUpCircle size={24} /> : <ArrowDownCircle size={24} />}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">{transaction.description}</p>
                        <div className="text-xs text-gray-500 flex flex-wrap gap-x-2 gap-y-0.5 items-center">
                            {transaction.category && (
                                <>
                                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium text-[10px] tracking-wider">
                                        {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1).toLowerCase()}
                                    </span>
                                    <span className="text-gray-400">•</span>
                                </>
                            )}
                            {accountLabel && (
                                <>
                                    <span className="text-gray-600">{accountLabel}</span>
                                    <span className="text-gray-400">•</span>
                                </>
                            )}
                            <span>{formatDate(transaction.transactionDate)}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-end sm:items-center justify-between gap-4">
                    <div className="text-right">
                        <p className={`font-bold ${amountClass}`}>
                            {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                        {transaction.division && <p className="text-xs text-gray-400 uppercase">{transaction.division}</p>}
                    </div>

                    {isEditable() && (
                        <button
                            onClick={() => setEditModalOpen(true)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            title="Edit Transaction"
                        >
                            <Edit2 size={18} />
                        </button>
                    )}
                </div>
            </div>

            <AddTransactionModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                transactionToEdit={transaction}
            />
        </>
    );
};

const TransactionList = () => {
    const { transactions, loading, transactionsPage, changeTransactionsPage } = useGlobalContext();

    const pageInfo = transactionsPage || {
        page: 0,
        size: transactions.length || 10,
        totalElements: transactions.length,
        totalPages: 1,
        last: true,
    };

    if (loading) {
        return <div className="text-center py-10 text-gray-500 text-sm">Loading transactions...</div>;
    }

    if (!transactions.length) {
        return <div className="text-center py-10 text-gray-400 text-sm">No transactions found.</div>;
    }

    const { page, size, totalElements, totalPages, last } = pageInfo;
    const start = totalElements === 0 ? 0 : page * size + 1;
    const end = Math.min((page + 1) * size, totalElements);

    const handlePrevious = () => {
        if (page > 0) {
            changeTransactionsPage(page - 1);
        }
    };

    const handleNext = () => {
        if (!last && page + 1 < totalPages) {
            changeTransactionsPage(page + 1);
        }
    };

    return (
        <div className="space-y-4">
            <div className="space-y-3">
                {transactions.map((t) => (
                    <TransactionItem key={t.id} transaction={t} />
                ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
                <p>
                    Showing <span className="font-semibold">{start}</span>–
                    <span className="font-semibold">{end}</span> of{' '}
                    <span className="font-semibold">{totalElements}</span> transactions
                </p>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrevious}
                        disabled={page === 0}
                        className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-xs font-medium"
                    >
                        Previous
                    </button>
                    <span className="px-2">
                        Page <span className="font-semibold">{totalPages ? page + 1 : 0}</span> of{' '}
                        <span className="font-semibold">{totalPages}</span>
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={last || totalPages === 0}
                        className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-xs font-medium"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionList;
