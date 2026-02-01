import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({ value, onChange, name, id, children, className = '', label, ...props }) => {
    const baseClass = 'w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer hover:border-gray-400';
    return (
        <div>
            {label && (
                <label htmlFor={id || name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    id={id || name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`${baseClass} ${className}`}
                    {...props}
                >
                    {children}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" size={18} />
            </div>
        </div>
    );
};

export default Select;
