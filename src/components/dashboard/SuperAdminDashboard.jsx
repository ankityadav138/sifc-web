import React, { useState, useEffect } from 'react';
import {
    UserGroupIcon,
    PhoneIcon,
    DocumentTextIcon,
    UserIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import StatCard from './StatCard';
import UserList from './UserList';

// Mock users data - can be moved to a shared service
const mockUsers = [
    {
        id: 1,
        name: 'John Manager',
        email: 'john.manager@example.com',
        phone: '+91 9876543210',
        role: 'manager',
        department: 'Sales',
        location: 'New Delhi',
        status: 'active',
        avatar: '👨‍💼',
        callsMade: 45,
        followUps: 12,
        dsrStatus: 'completed'
    },
    {
        id: 2,
        name: 'Sarah Manager',
        email: 'sarah.manager@example.com',
        phone: '+91 9876543211',
        role: 'manager',
        department: 'Operations',
        location: 'Mumbai',
        status: 'active',
        avatar: '👩‍💼',
        callsMade: 38,
        followUps: 8,
        dsrStatus: 'completed'
    },
    {
        id: 3,
        name: 'Mike Manager',
        email: 'mike.manager@example.com',
        phone: '+91 9876543212',
        role: 'manager',
        department: 'Marketing',
        location: 'Bangalore',
        status: 'active',
        avatar: '👨‍💼',
        callsMade: 52,
        followUps: 15,
        dsrStatus: 'pending'
    },
    {
        id: 4,
        name: 'Emily Manager',
        email: 'emily.manager@example.com',
        phone: '+91 9876543213',
        role: 'manager',
        department: 'HR',
        location: 'Chennai',
        status: 'active',
        avatar: '👩‍💼',
        callsMade: 28,
        followUps: 6,
        dsrStatus: 'completed'
    },
    {
        id: 5,
        name: 'Alex Caller',
        email: 'alex.caller@example.com',
        phone: '+91 9876543214',
        role: 'tele_caller',
        department: 'Sales',
        location: 'New Delhi',
        status: 'active',
        avatar: '👨‍💻',
        callsMade: 65,
        followUps: 20,
        dsrStatus: 'pending'
    },
    {
        id: 6,
        name: 'Lisa Caller',
        email: 'lisa.caller@example.com',
        phone: '+91 9876543215',
        role: 'tele_caller',
        department: 'Sales',
        location: 'Mumbai',
        status: 'active',
        avatar: '👩‍💻',
        callsMade: 72,
        followUps: 18,
        dsrStatus: 'completed'
    },
    {
        id: 7,
        name: 'Tom Caller',
        email: 'tom.caller@example.com',
        phone: '+91 9876543216',
        role: 'tele_caller',
        department: 'Operations',
        location: 'Bangalore',
        status: 'active',
        avatar: '👨‍💻',
        callsMade: 58,
        followUps: 14,
        dsrStatus: 'pending'
    },
    {
        id: 8,
        name: 'Anna Caller',
        email: 'anna.caller@example.com',
        phone: '+91 9876543217',
        role: 'tele_caller',
        department: 'Marketing',
        location: 'Chennai',
        status: 'active',
        avatar: '👩‍💻',
        callsMade: 48,
        followUps: 10,
        dsrStatus: 'completed'
    },
    {
        id: 9,
        name: 'James Caller',
        email: 'james.caller@example.com',
        phone: '+91 9876543218',
        role: 'tele_caller',
        department: 'Sales',
        location: 'Hyderabad',
        status: 'active',
        avatar: '👨‍💻',
        callsMade: 55,
        followUps: 16,
        dsrStatus: 'pending'
    },
    {
        id: 10,
        name: 'Emma Caller',
        email: 'emma.caller@example.com',
        phone: '+91 9876543219',
        role: 'tele_caller',
        department: 'Operations',
        location: 'Pune',
        status: 'active',
        avatar: '👩‍💻',
        callsMade: 62,
        followUps: 22,
        dsrStatus: 'completed'
    },
    {
        id: 11,
        name: 'David Caller',
        email: 'david.caller@example.com',
        phone: '+91 9876543220',
        role: 'tele_caller',
        department: 'Sales',
        location: 'Kolkata',
        status: 'active',
        avatar: '👨‍💻',
        callsMade: 45,
        followUps: 8,
        dsrStatus: 'pending'
    },
    {
        id: 12,
        name: 'Sophie Caller',
        email: 'sophie.caller@example.com',
        phone: '+91 9876543221',
        role: 'tele_caller',
        department: 'Marketing',
        location: 'Ahmedabad',
        status: 'active',
        avatar: '👩‍💻',
        callsMade: 70,
        followUps: 25,
        dsrStatus: 'completed'
    }
];

const SuperAdminDashboard = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [activeFilter, setActiveFilter] = useState('managers');
    const [displayTitle, setDisplayTitle] = useState('All Managers');
    const [displayUsers, setDisplayUsers] = useState([]);
    const [stats, setStats] = useState({
        totalManagers: 0,
        totalTelecallers: 0,
        dsrPendingToday: 0,
        totalCallsToday: 0,
        todaysFollowups: 0
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    // Initialize display with managers when users are loaded
    useEffect(() => {
        if (allUsers.length > 0) {
            handleStatCardClick('managers');
        }
    }, [allUsers]);

    const fetchUsers = async () => {
        try {
            // Replace with actual API call
            setAllUsers(mockUsers);
            
            const managers = mockUsers.filter(u => u.role === 'manager');
            const telecallers = mockUsers.filter(u => u.role === 'tele_caller');
            const pendingDSR = mockUsers.filter(u => u.dsrStatus === 'pending');
            const totalCalls = mockUsers.reduce((sum, u) => sum + (u.callsMade || 0), 0);
            const totalFollowups = mockUsers.reduce((sum, u) => sum + (u.followUps || 0), 0);
            
            setStats({
                totalManagers: managers.length,
                totalTelecallers: telecallers.length,
                dsrPendingToday: pendingDSR.length,
                totalCallsToday: totalCalls,
                todaysFollowups: totalFollowups
            });
        } catch (error) {
            console.error('Failed to fetch users:', error);
            toast.error('Failed to load users');
        }
    };

    const handleStatCardClick = (filterType) => {
        let filtered = [];
        let title = '';
        
        switch (filterType) {
            case 'managers':
                filtered = allUsers.filter(u => u.role === 'manager');
                title = 'All Managers';
                break;
            case 'telecallers':
                filtered = allUsers.filter(u => u.role === 'tele_caller');
                title = 'All Tele-callers';
                break;
            case 'dsr_pending':
                filtered = allUsers.filter(u => u.dsrStatus === 'pending');
                title = 'DSR Pending Today';
                break;
            case 'calls':
                filtered = allUsers.filter(u => u.callsMade > 0).sort((a, b) => b.callsMade - a.callsMade);
                title = 'Calls Logged Today';
                break;
            case 'followups':
                filtered = allUsers.filter(u => u.followUps > 0).sort((a, b) => b.followUps - a.followUps);
                title = "Today's Follow-ups";
                break;
            default:
                filtered = allUsers;
                title = 'All Users';
        }
        
        setDisplayUsers(filtered);
        setDisplayTitle(title);
        setActiveFilter(filterType);
    };

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <StatCard
                    title="Total Managers"
                    value={stats.totalManagers}
                    icon={UserGroupIcon}
                    trend="up"
                    trendValue={5}
                    color="blue"
                    clickable={true}
                    isActive={activeFilter === 'managers'}
                    onClick={() => handleStatCardClick('managers')}
                />
                <StatCard
                    title="Total Tele-callers"
                    value={stats.totalTelecallers}
                    icon={UserIcon}
                    trend="up"
                    trendValue={8}
                    color="green"
                    clickable={true}
                    isActive={activeFilter === 'telecallers'}
                    onClick={() => handleStatCardClick('telecallers')}
                />
                <StatCard
                    title="DSR Pending Today"
                    value={stats.dsrPendingToday}
                    icon={DocumentTextIcon}
                    trend="down"
                    trendValue={12}
                    color="red"
                    clickable={true}
                    isActive={activeFilter === 'dsr_pending'}
                    onClick={() => handleStatCardClick('dsr_pending')}
                />
                <StatCard
                    title="Total Calls Logged (Today)"
                    value={stats.totalCallsToday}
                    icon={PhoneIcon}
                    trend="up"
                    trendValue={18}
                    color="yellow"
                    clickable={true}
                    isActive={activeFilter === 'calls'}
                    onClick={() => handleStatCardClick('calls')}
                />
                <StatCard
                    title="Today's Follow-ups"
                    value={stats.todaysFollowups}
                    icon={CalendarIcon}
                    trend="up"
                    trendValue={10}
                    color="purple"
                    clickable={true}
                    isActive={activeFilter === 'followups'}
                    onClick={() => handleStatCardClick('followups')}
                />
            </div>
            
            {/* User List */}
            <UserList users={displayUsers} title={displayTitle} />
        </div>
    );
};

export default SuperAdminDashboard;
