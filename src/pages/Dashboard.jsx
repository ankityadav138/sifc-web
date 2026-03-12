import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    UserGroupIcon,
    ChartBarIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    PhoneIcon
} from '@heroicons/react/24/outline';
import { SuperAdminDashboard, ManagerDashboard, StatCard } from '../components/dashboard';

const Dashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    // Stats for other roles (non super_admin, non manager)
    const [stats] = useState({
        totalUsers: 24,
        todayAttendance: 18,
        activeCalls: 45,
        pendingDSR: 12,
        dsrCompletion: 78,
        usersByRole: [
            { role: 'Callers', count: 12, color: '#3B82F6' },
            { role: 'Managers', count: 4, color: '#10B981' },
            { role: 'HR', count: 2, color: '#F59E0B' },
            { role: 'Admin', count: 6, color: '#8B5CF6' }
        ]
    });

    // Render dashboard based on user role
    const renderDashboardContent = () => {
        if (user?.role === 'super_admin') {
            return <SuperAdminDashboard />;
        }
        
        if (user?.role === 'manager') {
            return <ManagerDashboard />;
        }
        
        // Default dashboard for other roles
        return <DefaultDashboard stats={stats} />;
    };

    return (
        <div className="p-6">
            {/* Header */}
            <DashboardHeader userName={user?.name} />

            {/* Tab Navigation */}
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Content based on active tab */}
            {activeTab === 'overview' && renderDashboardContent()}
            {activeTab === 'analytics' && <AnalyticsTab stats={stats} />}
            {activeTab === 'team' && <TeamTab stats={stats} />}
        </div>
    );
};

// Dashboard Header Component
const DashboardHeader = ({ userName }) => (
    <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 font-display">
                    Welcome back, {userName || 'Admin'}!
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
);

// Tab Navigation Component
const TabNavigation = ({ activeTab, setActiveTab }) => (
    <div className="mb-6">
        <nav className="flex space-x-8">
            {[
                { id: 'overview', label: 'Overview', icon: ChartBarIcon },
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
);

// Default Dashboard for other roles
const DefaultDashboard = ({ stats }) => (
    <div className="space-y-6">
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
                icon={CalendarIcon}
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
                icon={ChartBarIcon}
                trend="down"
                trendValue={5}
                color="red"
            />
        </div>
    </div>
);

// Analytics Tab Component
const AnalyticsTab = ({ stats }) => (
    <div className="space-y-6">
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
);

// Team Tab Component
const TeamTab = ({ stats }) => (
    <div className="space-y-6">
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
);

export default Dashboard;
