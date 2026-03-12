import React from 'react';
import {
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    trendValue, 
    color = 'primary', 
    onClick, 
    clickable = false, 
    isActive = false 
}) => (
    <div 
        className={`card p-6 hover:shadow-strong transition-all duration-300 ${clickable ? 'cursor-pointer hover:scale-105' : ''} ${isActive ? 'ring-2 ring-primary-500 bg-primary-50' : ''}`}
        onClick={onClick}
    >
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                {trend && (
                    <div className="flex items-center mt-2">
                        {trend === 'up' ? (
                            <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                            <ArrowTrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {trendValue}% vs last week
                        </span>
                    </div>
                )}
                {clickable && !isActive && (
                    <p className="text-xs text-primary-600 mt-2">Click to view details →</p>
                )}
                {isActive && (
                    <p className="text-xs text-primary-700 font-medium mt-2">Currently viewing ✓</p>
                )}
            </div>
            <div className={`p-3 bg-${color}-100 rounded-xl`}>
                <Icon className={`w-6 h-6 text-${color}-600`} />
            </div>
        </div>
    </div>
);

export default StatCard;
