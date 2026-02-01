import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useGlobalContext } from '../../context/GlobalContext';

const COLORS = ['#f97316', '#eab308', '#22c55e', '#14b8a6', '#ea580c', '#dc2626'];

const RADIAN = Math.PI / 180;
const renderLabelInside = (isMobile) => ({ percent, cx, cy, midAngle, innerRadius, outerRadius }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const pct = percent != null ? `${(percent * 100).toFixed(0)}%` : '';
    const fontSize = isMobile ? 11 : 14;
    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={fontSize} fontWeight={700}>
            {pct}
        </text>
    );
};

const StatsChart = () => {
    const { categorySummary } = useGlobalContext();
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 640);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const data = categorySummary
        .filter(c => c.type === 'EXPENSE')
        .map(c => ({ name: c.category ? c.category.charAt(0).toUpperCase() + c.category.slice(1).toLowerCase() : '', value: c.totalAmount }));

    if (!data || data.length === 0) {
        return (
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[320px] sm:min-h-[380px] flex items-center justify-center text-gray-500 text-sm sm:text-base">
                No expense data to display
            </div>
        );
    }

    const outerRadius = isMobile ? 72 : 90;
    const margin = isMobile
        ? { top: 8, right: 8, left: 8, bottom: 48 }
        : { top: 10, right: 10, left: 10, bottom: 56 };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[320px] sm:min-h-[380px]">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 text-center">Expense by Category</h3>
            <div className="w-full h-[260px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={margin}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy={isMobile ? '45%' : '48%'}
                            label={renderLabelInside(isMobile)}
                            labelLine={false}
                            outerRadius={outerRadius}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="white" strokeWidth={2} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                        <Legend
                            layout={isMobile ? 'horizontal' : 'horizontal'}
                            verticalAlign="bottom"
                            align="center"
                            wrapperStyle={{ paddingTop: 8 }}
                            formatter={(value) => <span className="text-gray-800 font-medium text-xs sm:text-sm">{value}</span>}
                            iconType="circle"
                            iconSize={8}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StatsChart;
