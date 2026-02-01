import React from 'react';
import { Calendar } from 'lucide-react';

const DatePicker = ({ value, onChange, name, label, placeholder, minDate, maxDate, className = '' }) => {
    const inputClass = 'w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all [color-scheme:light]';
    return (
        <div className={className}>
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            )}
            <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                <input
                    type="date"
                    id={name}
                    name={name}
                    value={value || ''}
                    onChange={onChange}
                    min={minDate || undefined}
                    max={maxDate || undefined}
                    className={inputClass}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

export default DatePicker;
