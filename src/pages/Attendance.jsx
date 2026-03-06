import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    ClockIcon,
    UserGroupIcon,
    CalendarIcon,
    MapPinIcon,
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Attendance = () => {
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [filterStatus, setFilterStatus] = useState('all');

    // Sample attendance data
    const attendanceData = [
        {
            id: 1,
            user: { name: 'John Smith', role: 'Tele-caller', avatar: '/api/placeholder/32/32' },
            checkIn: '09:00 AM',
            checkOut: '06:00 PM',
            status: 'present',
            workingHours: '9h 0m',
            location: 'Office - Floor 2',
            isLate: false
        },
        {
            id: 2,
            user: { name: 'Sarah Johnson', role: 'Manager', avatar: '/api/placeholder/32/32' },
            checkIn: '08:45 AM',
            checkOut: '05:30 PM',
            status: 'present',
            workingHours: '8h 45m',
            location: 'Office - Floor 1',
            isLate: false
        },
        {
            id: 3,
            user: { name: 'Mike Wilson', role: 'Tele-caller', avatar: '/api/placeholder/32/32' },
            checkIn: '09:15 AM',
            checkOut: '-',
            status: 'present',
            workingHours: '7h 30m',
            location: 'Work from Home',
            isLate: true
        },
        {
            id: 4,
            user: { name: 'Emily Davis', role: 'HR', avatar: '/api/placeholder/32/32' },
            checkIn: '-',
            checkOut: '-',
            status: 'absent',
            workingHours: '0h 0m',
            location: '-',
            isLate: false
        },
        {
            id: 5,
            user: { name: 'David Brown', role: 'Tele-caller', avatar: '/api/placeholder/32/32' },
            checkIn: '10:30 AM',
            checkOut: '-',
            status: 'halfday',
            workingHours: '4h 0m',
            location: 'Office - Floor 2',
            isLate: true
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'present':
                return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
            case 'absent':
                return <XCircleIcon className="w-5 h-5 text-red-600" />;
            case 'halfday':
                return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />;
            default:
                return <ClockIcon className="w-5 h-5 text-gray-400" />;
        }
    };

    const getStatusBadge = (status, isLate) => {
        let baseClasses = "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1";
        
        if (status === 'present') {
            return (
                <span className={`${baseClasses} ${isLate ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {getStatusIcon(status)}
                    {isLate ? 'Late' : 'Present'}
                </span>
            );
        } else if (status === 'absent') {
            return (
                <span className={`${baseClasses} bg-red-100 text-red-700`}>
                    {getStatusIcon(status)}
                    Absent
                </span>
            );
        } else if (status === 'halfday') {
            return (
                <span className={`${baseClasses} bg-yellow-100 text-yellow-700`}>
                    {getStatusIcon(status)}
                    Half Day
                </span>
            );
        }
    };

    const filteredData = filterStatus === 'all' 
        ? attendanceData 
        : attendanceData.filter(item => {
            if (filterStatus === 'late') return item.isLate;
            return item.status === filterStatus;
        });

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
                    <p className="text-gray-600 mt-1">Track and manage employee attendance</p>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5" />
                        Mark Attendance
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { title: 'Total Employees', value: '24', icon: UserGroupIcon, color: 'blue', change: '+2' },
                    { title: 'Present Today', value: '18', icon: CheckCircleIcon, color: 'green', change: '+3' },
                    { title: 'Absent Today', value: '3', icon: XCircleIcon, color: 'red', change: '-1' },
                    { title: 'Late Arrivals', value: '3', icon: ClockIcon, color: 'yellow', change: '+2' },
                ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                            </div>
                            <span className={`text-sm font-medium ${
                                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                        <p className="text-gray-600 text-sm">{stat.title}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Today's Attendance</h2>
                    <div className="flex items-center gap-4">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                            <option value="halfday">Half Day</option>
                            <option value="late">Late Arrivals</option>
                        </select>
                    </div>
                </div>

                {/* Attendance Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Employee</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Check In</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Check Out</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Working Hours</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-600">
                                                    {item.user.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{item.user.name}</p>
                                                <p className="text-sm text-gray-600">{item.user.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`font-medium ${item.isLate ? 'text-red-600' : 'text-gray-900'}`}>
                                            {item.checkIn}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-gray-900">{item.checkOut}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-gray-900">{item.workingHours}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-1 text-gray-600">
                                            <MapPinIcon className="w-4 h-4" />
                                            <span className="text-sm">{item.location}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        {getStatusBadge(item.status, item.isLate)}
                                    </td>
                                    <td className="py-4 px-4">
                                        <button 
                                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                            onClick={() => toast.success(`Viewing details for ${item.user.name}`)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Attendance;