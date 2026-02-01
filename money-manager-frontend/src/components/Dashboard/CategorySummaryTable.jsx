import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';

const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

const CategorySummaryTable = () => {
    const { categorySummary, loading } = useGlobalContext();

    const expenseByCategory = (categorySummary || [])
        .filter((c) => c.type === 'EXPENSE')
        .map((c) => ({ category: c.category, amount: c.totalAmount }))
        .sort((a, b) => (b.amount || 0) - (a.amount || 0));

    const incomeByCategory = (categorySummary || [])
        .filter((c) => c.type === 'INCOME')
        .map((c) => ({ category: c.category, amount: c.totalAmount }))
        .sort((a, b) => (b.amount || 0) - (a.amount || 0));

    if (loading && !categorySummary?.length) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Category Summary</h3>
                <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (!expenseByCategory.length && !incomeByCategory.length) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Category Summary</h3>
                <p className="text-gray-400 text-sm">No data available</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-8">
            {/* Expense Section */}
            {expenseByCategory.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Expense Summary</h3>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-500 font-medium text-left">
                                <th className="pb-2">Category</th>
                                <th className="pb-2 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenseByCategory.map((row) => (
                                <tr key={row.category} className="border-b border-gray-100">
                                    <td className="py-2 text-gray-800">{row.category ? row.category.charAt(0).toUpperCase() + row.category.slice(1).toLowerCase() : ''}</td>
                                    <td className="py-2 text-right font-medium text-red-600">
                                        {formatCurrency(row.amount)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Income Section */}
            {incomeByCategory.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Income Summary</h3>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-500 font-medium text-left">
                                <th className="pb-2">Category</th>
                                <th className="pb-2 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomeByCategory.map((row) => (
                                <tr key={row.category} className="border-b border-gray-100">
                                    <td className="py-2 text-gray-800">{row.category ? row.category.charAt(0).toUpperCase() + row.category.slice(1).toLowerCase() : ''}</td>
                                    <td className="py-2 text-right font-medium text-emerald-600">
                                        {formatCurrency(row.amount)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CategorySummaryTable;
