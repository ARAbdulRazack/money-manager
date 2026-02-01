import React, { useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import Select from '../UI/Select';
import DatePicker from '../UI/DatePicker';
import { CATEGORIES, DIVISIONS } from '../../constants';
import { localDateToUTCStartISO, localDateToUTCEndExclusiveISO } from '../../utils/dateUtils';

const Filters = () => {
    const { filterTransactions, loadDashboardData } = useGlobalContext();
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        category: '',
        division: ''
    });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    // Send UTC ISO range to API; backend uses [start, end) in UTC. No local timezone sent.
    const handleApply = () => {
        const apiFilters = {
            category: filters.category || '',
            division: filters.division || '',
        };
        if (filters.startDate) apiFilters.startDate = localDateToUTCStartISO(filters.startDate);
        if (filters.endDate) apiFilters.endDate = localDateToUTCEndExclusiveISO(filters.endDate);
        filterTransactions(apiFilters);
    };

    const handleReset = () => {
        const cleared = { startDate: '', endDate: '', category: '', division: '' };
        setFilters(cleared);
        loadDashboardData(0, 10);
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h4 className="font-semibold text-gray-700 mb-3">Filters</h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <DatePicker
                    label="From Date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleChange}
                    placeholder="From date"
                    maxDate={filters.endDate || undefined}
                />
                <DatePicker
                    label="To Date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleChange}
                    placeholder="To date"
                    minDate={filters.startDate || undefined}
                />
                <Select
                    label="Category"
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                >
                    <option value="">All Categories</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </Select>
                <Select
                    label="Division"
                    name="division"
                    value={filters.division}
                    onChange={handleChange}
                >
                    <option value="">All Divisions</option>
                    {DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </Select>
                <div className="flex gap-2">
                    <button
                        onClick={handleApply}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex-1"
                    >
                        Apply
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filters;
