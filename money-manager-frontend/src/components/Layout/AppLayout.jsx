import React, { useState } from 'react';
import { Plus, LayoutDashboard, List, AlertCircle, CheckCircle } from 'lucide-react';
import { useGlobalContext } from '../../context/GlobalContext';
import AddTransactionModal from '../Modals/AddTransactionModal';

const Toast = ({ message, type }) => (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 sm:top-auto sm:left-auto sm:translate-x-0 sm:bottom-6 sm:right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-bounce-in border ${
        type === 'error' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200'
    }`}>
        {type === 'error' ? <AlertCircle size={20} className="shrink-0" /> : <CheckCircle size={20} className="shrink-0" />}
        <span className="font-medium text-sm">{message}</span>
    </div>
);

const AppLayout = ({ currentPage, onNavigate, children }) => {
    const { toast } = useGlobalContext();
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const navBtnClass = (isActive) =>
        `flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-3 sm:py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] sm:min-h-0 touch-manipulation ${
            isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200'
        }`;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <header className="bg-white sticky top-0 z-10 border-b border-gray-100 shadow-sm safe-area-inset-top">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Row 1: Logo + Add New (mobile) / Logo + Nav (center) + Add New (desktop) */}
                    <div className="flex items-center gap-3 py-3 sm:py-3 sm:justify-between">
                        <button
                            type="button"
                            onClick={() => onNavigate('dashboard')}
                            className="flex items-center gap-2 shrink-0 hover:opacity-90 active:opacity-80 text-left min-h-[44px] touch-manipulation sm:flex-1 sm:justify-start"
                        >
                            <img
                                src={`${process.env.PUBLIC_URL || ''}/Money%20Manager.png`}
                                alt="Money Manager"
                                className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
                            />
                            <span className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight truncate max-w-[140px] sm:max-w-none">
                                Money<span className="text-blue-600">Manager</span>
                            </span>
                        </button>

                        {/* Desktop: nav centered */}
                        <nav className="hidden sm:flex flex-1 items-center justify-center gap-1">
                            <button
                                type="button"
                                onClick={() => onNavigate('dashboard')}
                                className={navBtnClass(currentPage === 'dashboard')}
                            >
                                <LayoutDashboard size={18} />
                                Dashboard
                            </button>
                            <button
                                type="button"
                                onClick={() => onNavigate('transactions')}
                                className={navBtnClass(currentPage === 'transactions')}
                            >
                                <List size={18} />
                                Transactions
                            </button>
                        </nav>

                        {/* Desktop: Add New right */}
                        <div className="hidden sm:flex flex-1 justify-end">
                            <button
                                onClick={() => setAddModalOpen(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-sm min-h-[40px]"
                            >
                                <Plus size={16} />
                                <span>Add New</span>
                            </button>
                        </div>

                        {/* Mobile: Add New only in row 1 */}
                        <button
                            onClick={() => setAddModalOpen(true)}
                            className="sm:hidden bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-sm min-h-[44px] touch-manipulation flex-shrink-0"
                        >
                            <Plus size={18} />
                            <span>Add New</span>
                        </button>
                    </div>

                    {/* Mobile: Nav tabs row */}
                    <div className="sm:hidden flex gap-2 pb-3 -mt-1">
                        <button
                            type="button"
                            onClick={() => onNavigate('dashboard')}
                            className={navBtnClass(currentPage === 'dashboard')}
                        >
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => onNavigate('transactions')}
                            className={navBtnClass(currentPage === 'transactions')}
                        >
                            <List size={20} />
                            <span>Transactions</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                {children}
            </main>

            <AddTransactionModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
            />
            {toast && <Toast message={toast.message} type={toast.type} />}
        </div>
    );
};

export default AppLayout;
