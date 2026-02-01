import React, { useState } from 'react';
import { GlobalProvider } from './context/GlobalContext';
import AppLayout from './components/Layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';

function App() {
    const [page, setPage] = useState('dashboard');

    return (
        <GlobalProvider>
            <div className="antialiased text-gray-900 bg-white min-h-screen">
                <AppLayout currentPage={page} onNavigate={setPage}>
                    {page === 'dashboard' ? <Dashboard /> : <Transactions />}
                </AppLayout>
            </div>
        </GlobalProvider>
    );
}

export default App;
