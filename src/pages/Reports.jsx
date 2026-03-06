import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    DocumentTextIcon,
    ChartBarIcon,
    ArrowDownTrayIcon,
    CalendarIcon,
    FunnelIcon,
    PrinterIcon,
    EyeIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Reports = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('performance');
    const [dateRange, setDateRange] = useState('thisMonth');

    // Sample report data
    const performanceReports = [
        {
            id: 1,
            title: 'Monthly Sales Report',
            description: 'Comprehensive sales performance analysis',
            generatedDate: '2024-02-20',
            size: '2.3 MB',
            status: 'ready'
        },
        {
            id: 2,
            title: 'Call Analytics Report',
            description: 'Detailed analysis of call performance metrics',
            generatedDate: '2024-02-19',
            size: '1.8 MB',
            status: 'ready'
        },
        {
            id: 3,
            title: 'Team Productivity Report',
            description: 'Individual and team productivity insights',
            generatedDate: '2024-02-18',
            size: '3.1 MB',
            status: 'processing'
        }
    ];

    const attendanceReports = [
        {
            id: 4,
            title: 'Monthly Attendance Summary',
            description: 'Complete attendance overview for all staff',
            generatedDate: '2024-02-20',
            size: '1.5 MB',
            status: 'ready'
        },
        {
            id: 5,
            title: 'Late Arrival Analysis',
            description: 'Analysis of late arrivals and patterns',
            generatedDate: '2024-02-17',
            size: '892 KB',
            status: 'ready'
        }
    ];

    const ReportCard = ({ report }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{report.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            {report.generatedDate}
                        </span>
                        <span>{report.size}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                            report.status === 'ready' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                            {report.status === 'ready' ? 'Ready' : 'Processing'}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button 
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => toast.success(`Previewing ${report.title}`)}
                    >
                        <EyeIcon className="w-5 h-5" />
                    </button>
                    <button 
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        onClick={() => toast.success(`Downloading ${report.title}`)}
                        disabled={report.status !== 'ready'}
                    >
                        <ArrowDownTrayIcon className="w-5 h-5" />
                    </button>
                    <button 
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => toast.success(`Printing ${report.title}`)}
                        disabled={report.status !== 'ready'}
                    >
                        <PrinterIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reports Dashboard</h1>
                    <p className="text-gray-600 mt-1">Generate and manage business reports</p>
                </div>
                <div className="flex items-center gap-3">
                    <select 
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                    >
                        <option value="today">Today</option>
                        <option value="thisWeek">This Week</option>
                        <option value="thisMonth">This Month</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="custom">Custom Range</option>
                    </select>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <DocumentTextIcon className="w-5 h-5" />
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { title: 'Reports Generated', value: '156', icon: DocumentTextIcon, color: 'blue' },
                    { title: 'Total Downloads', value: '1,234', icon: ArrowDownTrayIcon, color: 'green' },
                    { title: 'Scheduled Reports', value: '8', icon: CalendarIcon, color: 'purple' },
                    { title: 'Processing Queue', value: '3', icon: ChartBarIcon, color: 'orange' },
                ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                    {[
                        { id: 'performance', label: 'Performance Reports', icon: ChartBarIcon },
                        { id: 'attendance', label: 'Attendance Reports', icon: CalendarIcon },
                        { id: 'scheduled', label: 'Scheduled Reports', icon: DocumentTextIcon },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                                activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
                {activeTab === 'performance' && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900">Performance Reports</h2>
                        {performanceReports.map((report) => (
                            <ReportCard key={report.id} report={report} />
                        ))}
                    </div>
                )}

                {activeTab === 'attendance' && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900">Attendance Reports</h2>
                        {attendanceReports.map((report) => (
                            <ReportCard key={report.id} report={report} />
                        ))}
                    </div>
                )}

                {activeTab === 'scheduled' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                        <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Scheduled Reports</h3>
                        <p className="text-gray-600 mb-4">Set up automated report generation to save time</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Schedule New Report
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;