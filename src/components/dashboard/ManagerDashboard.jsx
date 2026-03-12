import React, { useState, useEffect } from 'react';
import {
    UserGroupIcon,
    PhoneIcon,
    DocumentTextIcon,
    UserIcon,
    CalendarIcon,
    CheckCircleIcon,
    ClockIcon,
    EnvelopeIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import StatCard from './StatCard';

// Mock team data for manager - replace with actual API
const mockTeamMembers = [
    {
        id: 1,
        name: 'Alex Caller',
        email: 'alex.caller@example.com',
        phone: '+91 9876543214',
        role: 'tele_caller',
        location: 'New Delhi',
        status: 'active',
        avatar: '👨‍💻',
        callsMade: 65,
        followUps: 20,
        dsrStatus: 'pending',
        isOnline: true,
        lastActive: '2 mins ago'
    },
    {
        id: 2,
        name: 'Lisa Caller',
        email: 'lisa.caller@example.com',
        phone: '+91 9876543215',
        role: 'tele_caller',
        location: 'Mumbai',
        status: 'active',
        avatar: '👩‍💻',
        callsMade: 72,
        followUps: 18,
        dsrStatus: 'completed',
        isOnline: true,
        lastActive: '5 mins ago'
    },
    {
        id: 3,
        name: 'Tom Caller',
        email: 'tom.caller@example.com',
        phone: '+91 9876543216',
        role: 'tele_caller',
        location: 'Bangalore',
        status: 'active',
        avatar: '👨‍💻',
        callsMade: 58,
        followUps: 14,
        dsrStatus: 'pending',
        isOnline: false,
        lastActive: '30 mins ago'
    },
    {
        id: 4,
        name: 'Anna Caller',
        email: 'anna.caller@example.com',
        phone: '+91 9876543217',
        role: 'tele_caller',
        location: 'Chennai',
        status: 'active',
        avatar: '👩‍💻',
        callsMade: 48,
        followUps: 10,
        dsrStatus: 'completed',
        isOnline: true,
        lastActive: '1 min ago'
    },
    {
        id: 5,
        name: 'James Caller',
        email: 'james.caller@example.com',
        phone: '+91 9876543218',
        role: 'tele_caller',
        location: 'Hyderabad',
        status: 'active',
        avatar: '👨‍💻',
        callsMade: 55,
        followUps: 16,
        dsrStatus: 'pending',
        isOnline: true,
        lastActive: '3 mins ago'
    },
    {
        id: 6,
        name: 'Emma Caller',
        email: 'emma.caller@example.com',
        phone: '+91 9876543219',
        role: 'tele_caller',
        location: 'Pune',
        status: 'inactive',
        avatar: '👩‍💻',
        callsMade: 0,
        followUps: 0,
        dsrStatus: 'pending',
        isOnline: false,
        lastActive: '2 hours ago'
    }
];

const ManagerDashboard = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [activeFilter, setActiveFilter] = useState('active_telecallers');
    const [displayTitle, setDisplayTitle] = useState('Active Tele-callers');
    const [displayUsers, setDisplayUsers] = useState([]);
    const [stats, setStats] = useState({
        teamCallsToday: 0,
        followupsCreated: 0,
        dsrSubmitted: 0,
        dsrPending: 0,
        activeTelecallers: 0,
        totalTelecallers: 0
    });

    useEffect(() => {
        fetchTeamData();
    }, []);

    useEffect(() => {
        if (teamMembers.length > 0) {
            handleStatCardClick('active_telecallers');
        }
    }, [teamMembers]);

    const fetchTeamData = async () => {
        try {
            // Replace with actual API call
            setTeamMembers(mockTeamMembers);
            
            const activeTelecallers = mockTeamMembers.filter(u => u.isOnline);
            const totalCalls = mockTeamMembers.reduce((sum, u) => sum + (u.callsMade || 0), 0);
            const totalFollowups = mockTeamMembers.reduce((sum, u) => sum + (u.followUps || 0), 0);
            const dsrSubmitted = mockTeamMembers.filter(u => u.dsrStatus === 'completed').length;
            const dsrPending = mockTeamMembers.filter(u => u.dsrStatus === 'pending').length;
            
            setStats({
                teamCallsToday: totalCalls,
                followupsCreated: totalFollowups,
                dsrSubmitted: dsrSubmitted,
                dsrPending: dsrPending,
                activeTelecallers: activeTelecallers.length,
                totalTelecallers: mockTeamMembers.length
            });
        } catch (error) {
            console.error('Failed to fetch team data:', error);
            toast.error('Failed to load team data');
        }
    };

    const handleStatCardClick = (filterType) => {
        let filtered = [];
        let title = '';
        
        switch (filterType) {
            case 'active_telecallers':
                filtered = teamMembers.filter(u => u.isOnline);
                title = 'Active Tele-callers';
                break;
            case 'team_calls':
                filtered = teamMembers.filter(u => u.callsMade > 0).sort((a, b) => b.callsMade - a.callsMade);
                title = 'Team Calls Today';
                break;
            case 'followups':
                filtered = teamMembers.filter(u => u.followUps > 0).sort((a, b) => b.followUps - a.followUps);
                title = 'Follow-ups Created';
                break;
            case 'dsr_submitted':
                filtered = teamMembers.filter(u => u.dsrStatus === 'completed');
                title = 'DSR Submitted';
                break;
            case 'dsr_pending':
                filtered = teamMembers.filter(u => u.dsrStatus === 'pending');
                title = 'DSR Pending';
                break;
            default:
                filtered = teamMembers;
                title = 'All Team Members';
        }
        
        setDisplayUsers(filtered);
        setDisplayTitle(title);
        setActiveFilter(filterType);
    };

    // Team member card component
    const TeamMemberCard = ({ member }) => (
        <div className="border rounded-xl p-4 hover:shadow-md transition-shadow bg-white">
            <div className="flex items-start space-x-4">
                <div className="relative">
                    <div className="text-3xl">{member.avatar}</div>
                    {/* Online status indicator */}
                    <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${member.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">{member.name}</h3>
                        {member.dsrStatus === 'completed' ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircleIcon className="w-3 h-3 mr-1" />
                                DSR Done
                            </span>
                        ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <ClockIcon className="w-3 h-3 mr-1" />
                                DSR Pending
                            </span>
                        )}
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-1">
                        {member.isOnline ? (
                            <span className="text-green-600">● Online</span>
                        ) : (
                            <span>Last active: {member.lastActive}</span>
                        )}
                    </p>
                    
                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                            <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                            <span className="truncate">{member.email}</span>
                        </div>
                        <div className="flex items-center">
                            <PhoneIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                            {member.phone}
                        </div>
                        <div className="flex items-center">
                            <MapPinIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                            {member.location}
                        </div>
                    </div>
                    
                    {/* Performance stats */}
                    <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-blue-50 rounded-lg p-2 text-center">
                            <span className="block text-lg font-bold text-blue-600">{member.callsMade}</span>
                            <span className="text-xs text-gray-500">Calls</span>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-2 text-center">
                            <span className="block text-lg font-bold text-purple-600">{member.followUps}</span>
                            <span className="text-xs text-gray-500">Follow-ups</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Stats Grid - Manager Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Team Calls Today"
                    value={stats.teamCallsToday}
                    icon={PhoneIcon}
                    trend="up"
                    trendValue={12}
                    color="blue"
                    clickable={true}
                    isActive={activeFilter === 'team_calls'}
                    onClick={() => handleStatCardClick('team_calls')}
                />
                <StatCard
                    title="Follow-ups Created"
                    value={stats.followupsCreated}
                    icon={CalendarIcon}
                    trend="up"
                    trendValue={8}
                    color="purple"
                    clickable={true}
                    isActive={activeFilter === 'followups'}
                    onClick={() => handleStatCardClick('followups')}
                />
                <StatCard
                    title="DSR Status"
                    value={`${stats.dsrSubmitted} / ${stats.dsrPending}`}
                    icon={DocumentTextIcon}
                    color="yellow"
                    clickable={true}
                    isActive={activeFilter === 'dsr_submitted' || activeFilter === 'dsr_pending'}
                    onClick={() => handleStatCardClick('dsr_pending')}
                />
                <StatCard
                    title="Active Tele-callers"
                    value={`${stats.activeTelecallers} / ${stats.totalTelecallers}`}
                    icon={UserGroupIcon}
                    color="green"
                    clickable={true}
                    isActive={activeFilter === 'active_telecallers'}
                    onClick={() => handleStatCardClick('active_telecallers')}
                />
            </div>

            {/* DSR Quick Filter Buttons */}
            <div className="flex space-x-3">
                <button
                    onClick={() => handleStatCardClick('dsr_submitted')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === 'dsr_submitted'
                            ? 'bg-green-100 text-green-800 ring-2 ring-green-500'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    <CheckCircleIcon className="w-4 h-4 inline mr-2" />
                    DSR Submitted ({stats.dsrSubmitted})
                </button>
                <button
                    onClick={() => handleStatCardClick('dsr_pending')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === 'dsr_pending'
                            ? 'bg-red-100 text-red-800 ring-2 ring-red-500'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    <ClockIcon className="w-4 h-4 inline mr-2" />
                    DSR Pending ({stats.dsrPending})
                </button>
            </div>
            
            {/* Team Members List */}
            <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{displayTitle}</h3>
                    <span className="text-sm text-gray-500">
                        {displayUsers.length} member{displayUsers.length !== 1 ? 's' : ''}
                    </span>
                </div>
                
                {displayUsers.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No team members found
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayUsers.map((member) => (
                            <TeamMemberCard key={member.id} member={member} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManagerDashboard;
