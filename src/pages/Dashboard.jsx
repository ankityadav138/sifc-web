import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    UserGroupIcon,
    PhoneIcon,
    DocumentTextIcon,
    MapPinIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    ClockIcon,
    EyeIcon,
    UserIcon,
    CalendarIcon,
    ChartBarIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalUsers: 24,
        todayAttendance: 18,
        activeCalls: 45,
        pendingDSR: 12,
        weeklyPerformance: [65, 78, 82, 75, 89, 93, 87],
        usersByRole: [
            { role: 'Callers', count: 12, color: '#3B82F6' },
            { role: 'Managers', count: 4, color: '#10B981' },
            { role: 'HR', count: 2, color: '#F59E0B' },
            { role: 'Admin', count: 6, color: '#8B5CF6' }
        ],
        callsDataWeek: [120, 95, 140, 110, 160, 185, 155],
        dsrCompletion: 78,
        // Super Admin specific stats
        totalManagers: 4,
        totalTelecallers: 12,
        dsrPendingToday: 8,
        totalCallsToday: 156,
        todaysFollowups: 23
    });
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = 'primary' }) => (
        <div className="card p-6 hover:shadow-strong transition-all duration-300">
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
                </div>
                <div className={`p-3 bg-${color}-100 rounded-xl`}>
                    <Icon className={`w-6 h-6 text-${color}-600`} />
                </div>
            </div>
        </div>
    );

    const QuickAction = ({ title, icon: Icon, onClick, color = 'primary' }) => (
        <button
            onClick={onClick}
            className="card p-4 hover:shadow-medium transition-all duration-200 text-left group"
        >
            <div className="flex items-center space-x-3">
                <div className={`p-2 bg-${color}-100 rounded-lg group-hover:bg-${color}-200 transition-colors`}>
                    <Icon className={`w-5 h-5 text-${color}-600`} />
                </div>
                <span className="font-medium text-gray-900">{title}</span>
            </div>
        </button>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 font-display">
                            Welcome back, {user?.name || 'Admin'}!
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Here's what's happening with your team today.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{new Date().toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6">
                <nav className="flex space-x-8">
                    {[
                        { id: 'overview', label: 'Overview', icon: ChartBarIcon },
                        { id: 'analytics', label: 'Analytics', icon: ArrowTrendingUpIcon },
                        { id: 'team', label: 'Team', icon: UserGroupIcon }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                activeTab === tab.id
                                    ? 'bg-primary-100 text-primary-700'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {activeTab === 'overview' && (
                <div className="space-y-6">
                    {/* Stats Grid - Super Admin View */}
                    {user?.role === 'super_admin' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            <StatCard
                                title="Total Managers"
                                value={stats.totalManagers}
                                icon={UserGroupIcon}
                                trend="up"
                                trendValue={5}
                                color="blue"
                            />
                            <StatCard
                                title="Total Tele-callers"
                                value={stats.totalTelecallers}
                                icon={UserIcon}
                                trend="up"
                                trendValue={8}
                                color="green"
                            />
                            <StatCard
                                title="DSR Pending Today"
                                value={stats.dsrPendingToday}
                                icon={DocumentTextIcon}
                                trend="down"
                                trendValue={12}
                                color="red"
                            />
                            <StatCard
                                title="Total Calls Logged (Today)"
                                value={stats.totalCallsToday}
                                icon={PhoneIcon}
                                trend="up"
                                trendValue={18}
                                color="yellow"
                            />
                            <StatCard
                                title="Today's Follow-ups"
                                value={stats.todaysFollowups}
                                icon={CalendarIcon}
                                trend="up"
                                trendValue={10}
                                color="purple"
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                title="Total Users"
                                value={stats.totalUsers}
                                icon={UserGroupIcon}
                                trend="up"
                                trendValue={12}
                                color="blue"
                            />
                            <StatCard
                                title="Today's Attendance"
                                value={`${stats.todayAttendance}/${stats.totalUsers}`}
                                icon={ClockIcon}
                                trend="up"
                                trendValue={8}
                                color="green"
                            />
                            <StatCard
                                title="Active Calls"
                                value={stats.activeCalls}
                                icon={PhoneIcon}
                                trend="up"
                                trendValue={15}
                                color="yellow"
                            />
                            <StatCard
                                title="Pending DSRs"
                                value={stats.pendingDSR}
                                icon={DocumentTextIcon}
                                trend="down"
                                trendValue={5}
                                color="red"
                            />
                        </div>
                    )}

                    {/* Quick Actions */}
                    <div className="card p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <QuickAction
                                title="Manage Users"
                                icon={UserIcon}
                                onClick={() => window.location.href = '/users'}
                                color="blue"
                            />
                            <QuickAction
                                title="View Reports"
                                icon={DocumentTextIcon}
                                onClick={() => window.location.href = '/reports'}
                                color="green"
                            />
                            <QuickAction
                                title="Check Attendance"
                                icon={ClockIcon}
                                onClick={() => window.location.href = '/attendance'}
                                color="yellow"
                            />
                            <QuickAction
                                title="Geo Tracking"
                                icon={MapPinIcon}
                                onClick={() => window.location.href = '/tracking'}
                                color="purple"
                            />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'analytics' && (
                <div className="space-y-6">
                    {/* Analytics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card p-6 text-center">
                            <CurrencyDollarIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <h4 className="text-2xl font-bold text-gray-900">$24,500</h4>
                            <p className="text-gray-600">Monthly Revenue</p>
                        </div>
                        <div className="card p-6 text-center">
                            <ArrowTrendingUpIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <h4 className="text-2xl font-bold text-gray-900">{stats.dsrCompletion}%</h4>
                            <p className="text-gray-600">DSR Completion</p>
                        </div>
                        <div className="card p-6 text-center">
                            <PhoneIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <h4 className="text-2xl font-bold text-gray-900">1,247</h4>
                            <p className="text-gray-600">Total Calls</p>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="card p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Call Success Rate</span>
                                <span className="font-medium text-green-600">85%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Average Call Duration</span>
                                <span className="font-medium">4:32 min</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Daily Targets Met</span>
                                <span className="font-medium text-blue-600">92%</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'team' && (
                <div className="space-y-6">
                    {/* Team Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {stats.usersByRole.map((role, index) => (
                            <div key={index} className="card p-6 text-center">
                                <div 
                                    className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                                    style={{ backgroundColor: `${role.color}20` }}
                                >
                                    <UserGroupIcon 
                                        className="w-6 h-6"
                                        style={{ color: role.color }}
                                    />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900">{role.count}</h4>
                                <p className="text-gray-600">{role.role}</p>
                            </div>
                        ))}
                    </div>

                    {/* Team Activity */}
                    <div className="card p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Team Activity</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'John Doe', role: 'Senior Caller', activity: 'Completed 25 calls', time: '2 hours ago', avatar: '👨‍💼' },
                                { name: 'Jane Smith', role: 'Team Lead', activity: 'Reviewed 15 DSRs', time: '3 hours ago', avatar: '👩‍💼' },
                                { name: 'Mike Johnson', role: 'HR Manager', activity: 'Updated attendance policy', time: '5 hours ago', avatar: '👨‍💻' },
                                { name: 'Sarah Wilson', role: 'Caller', activity: 'Submitted daily report', time: '6 hours ago', avatar: '👩‍💻' }
                            ].map((member, index) => (
                                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-2xl">{member.avatar}</div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{member.name}</h4>
                                            <p className="text-sm text-gray-500">{member.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-900">{member.activity}</p>
                                        <p className="text-xs text-gray-500">{member.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
