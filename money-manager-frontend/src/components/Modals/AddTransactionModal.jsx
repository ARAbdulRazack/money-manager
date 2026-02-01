import React, { useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { X } from 'lucide-react';
import Select from '../UI/Select';
import DateTimePicker from '../UI/DateTimePicker';
import { CATEGORIES, DIVISIONS, ACCOUNTS } from '../../constants';
import { utcISOToLocalDatetimeLocalString } from '../../utils/dateUtils';

const AddTransactionModal = ({ isOpen, onClose, transactionToEdit = null }) => {
    const { addTransaction, editTransaction, showToast } = useGlobalContext();
    const isEdit = !!transactionToEdit;

    const [activeTab, setActiveTab] = useState('INCOME');
    const [formData, setFormData] = useState({
        amount: '',
        category: 'food',
        division: 'PERSONAL',
        description: '',
        transactionDate: new Date().toISOString().slice(0, 16),
        sourceAccount: '',
        targetAccount: ''
    });
    const [error, setError] = useState('');

    React.useEffect(() => {
        if (isOpen) {
            if (transactionToEdit) {
                setActiveTab(transactionToEdit.type === 'TRANSFER' ? 'EXPENSE' : transactionToEdit.type); // TRANSFER not in UI; edit as expense
                // Backend sends UTC ISO; show in user's local time for datetime-local input
                setFormData({
                    amount: transactionToEdit.amount,
                    category: transactionToEdit.category || 'food',
                    division: transactionToEdit.division || 'PERSONAL',
                    description: transactionToEdit.description,
                    transactionDate: utcISOToLocalDatetimeLocalString(transactionToEdit.transactionDate),
                    sourceAccount: transactionToEdit.sourceAccount || '',
                    targetAccount: transactionToEdit.targetAccount || ''
                });
            } else {
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

                setActiveTab('INCOME');
                setFormData({
                    amount: '',
                    category: 'food',
                    division: 'PERSONAL',
                    description: '',
                    transactionDate: currentDateTime,
                    sourceAccount: '',
                    targetAccount: ''
                });
            }
            setError('');
        }
    }, [isOpen, transactionToEdit]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Send transactionDate as UTC ISO; backend stores UTC only
        const payload = {
            ...formData,
            amount: Number(formData.amount),
            type: activeTab,
            transactionDate: new Date(formData.transactionDate).toISOString()
        };

        try {
            if (isEdit) {
                await editTransaction(transactionToEdit.id, payload);
                showToast('Transaction updated successfully');
            } else {
                await addTransaction(payload);
                showToast('Transaction added successfully');
            }
            onClose();
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to save transaction";
            setError(msg);
            showToast(msg, 'error');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    {isEdit ? 'Edit Transaction' : 'Add New'}
                </h2>

                {/* Tabs */}
                {!isEdit && (
                    <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
                        <button
                            type="button"
                            className={`flex-1 py-2 rounded-md font-medium transition-all text-sm ${activeTab === 'INCOME' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('INCOME')}
                        >
                            Income
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-2 rounded-md font-medium transition-all text-sm ${activeTab === 'EXPENSE' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('EXPENSE')}
                        >
                            Expense
                        </button>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                        <input
                            type="number"
                            name="amount"
                            required
                            min="0"
                            step="0.01"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="0.00"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Select label="Category" name="category" value={formData.category} onChange={handleChange}>
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                            ))}
                        </Select>
                        <Select label="Division" name="division" value={formData.division} onChange={handleChange}>
                            {DIVISIONS.map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </Select>
                    </div>

                    {/* Account fields */}
                    {activeTab === 'INCOME' && (
                        <Select
                            label="To Account"
                            name="targetAccount"
                            value={formData.targetAccount}
                            onChange={handleChange}
                        >
                            <option value="">Select account</option>
                            {ACCOUNTS.map(a => (
                                <option key={a} value={a}>{a}</option>
                            ))}
                        </Select>
                    )}
                    {activeTab === 'EXPENSE' && (
                        <Select
                            label="From Account"
                            name="sourceAccount"
                            value={formData.sourceAccount}
                            onChange={handleChange}
                        >
                            <option value="">Select account</option>
                            {ACCOUNTS.map(a => (
                                <option key={a} value={a}>{a}</option>
                            ))}
                        </Select>
                    )}

                    <DateTimePicker
                        label="Date & Time"
                        name="transactionDate"
                        value={formData.transactionDate}
                        onChange={handleChange}
                        placeholder="Select date and time"
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input
                            type="text"
                            name="description"
                            required
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="Brief description"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg font-bold text-white shadow-lg transform transition-transform active:scale-95 ${
                            activeTab === 'INCOME'
                                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                                : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                        }`}
                    >
                        {isEdit
                            ? 'Update Transaction'
                            : activeTab === 'INCOME'
                            ? 'Add Income'
                            : 'Add Expense'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTransactionModal;
