import React, { useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import Filters from '../components/Filters/Filters';
import TransactionList from '../components/Transactions/TransactionList';

const Transactions = () => {
    const { loadDashboardData } = useGlobalContext();

    useEffect(() => {
        loadDashboardData(0, 10);
        // eslint-disable-next-line -- initial load only
    }, []);

    return (
        <>
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Where exactly did my money go?</h1>
            </div>

            <section>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Transactions History</h2>
                <Filters />
                <TransactionList />
            </section>
        </>
    );
};

export default Transactions;
