import axios from 'axios';

// Use REACT_APP_API_URL from .env; default to localhost for dev when unset.
const API_BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getTransactions = (page = 0, size = 10) =>
    api.get('/transactions', { params: { page, size } });
export const createTransaction = (data) => api.post('/transactions', data);
export const updateTransaction = (id, data) => api.put(`/transactions/${id}`, data);
export const filterTransactions = (filters, page = 0, size = 10) => {
    const params = new URLSearchParams();
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.category) params.append('category', filters.category);
    if (filters.division) params.append('division', filters.division);
    params.append('page', page);
    params.append('size', size);
    return api.get(`/transactions/filter?${params.toString()}`);
};

export const getDashboardStats = (period) => api.get(`/dashboard/${period}`);
export const getCategorySummary = (period) => api.get('/summary/categories', { params: { period } });
