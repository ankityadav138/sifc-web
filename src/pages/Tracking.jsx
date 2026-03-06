import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    MapPinIcon,
    UserIcon,
    GlobeAltIcon,
    ClockIcon,
    DevicePhoneMobileIcon,
    SignalIcon,
    EyeIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Tracking = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('live');
    const [selectedUser, setSelectedUser] = useState('all');

    // Sample tracking data
    const liveTracking = [
        {
            id: 1,
            user: { name: 'John Smith', role: 'Tele-caller', status: 'active' },
            location: { 
                address: '123 Business District, Mumbai', 
                coordinates: { lat: 19.0760, lng: 72.8777 },
                accuracy: '5m'
            },
            lastUpdated: '2 min ago',
            battery: 78,
            isMoving: false,
            speed: 0
        },
        {
            id: 2,
            user: { name: 'Sarah Johnson', role: 'Manager', status: 'active' },
            location: { 
                address: '456 Client Office, Andheri', 
                coordinates: { lat: 19.1136, lng: 72.8697 },
                accuracy: '3m'
            },
            lastUpdated: '1 min ago',
            battery: 92,
            isMoving: true,
            speed: 12
        },
        {
            id: 3,
            user: { name: 'Mike Wilson', role: 'Tele-caller', status: 'inactive' },
            location: { 
                address: '789 Home Location, Bandra', 
                coordinates: { lat: 19.0544, lng: 72.8405 },
                accuracy: '8m'
            },
            lastUpdated: '45 min ago',
            battery: 34,
            isMoving: false,
            speed: 0
        }
    ];

    const locationHistory = [
        {
            id: 1,
            user: 'John Smith',
            date: '2024-02-20',
            locations: [
                { time: '09:00 AM', address: 'Home - Powai', type: 'checkin' },
                { time: '10:30 AM', address: 'Client Site - Goregaon', type: 'visit' },
                { time: '02:15 PM', address: 'Lunch Break - Malad', type: 'break' },
                { time: '06:00 PM', address: 'Office - Andheri', type: 'checkout' }
            ],
            totalDistance: '45.2 km',
            workingHours: '9h 0m'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'text-green-600 bg-green-100';
            case 'inactive':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getLocationTypeIcon = (type) => {
        switch (type) {
            case 'checkin':
                return '🏢';
            case 'checkout':
                return '🏠';
            case 'visit':
                return '📍';
            case 'break':
                return '🍽️';
            default:
                return '📍';
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Geo Tracking</h1>
                    <p className="text-gray-600 mt-1">Monitor employee locations and movement patterns</p>
                </div>
                <div className="flex items-center gap-3">
                    <select 
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        <option value="all">All Users</option>
                        <option value="john">John Smith</option>
                        <option value="sarah">Sarah Johnson</option>
                        <option value="mike">Mike Wilson</option>
                    </select>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <GlobeAltIcon className="w-5 h-5" />
                        View Map
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { title: 'Active Users', value: '18', icon: UserIcon, color: 'green', detail: 'Currently online' },
                    { title: 'Total Locations', value: '156', icon: MapPinIcon, color: 'blue', detail: 'Tracked today' },
                    { title: 'Average Distance', value: '32.5 km', icon: GlobeAltIcon, color: 'purple', detail: 'Per employee' },
                    { title: 'Battery Average', value: '68%', icon: DevicePhoneMobileIcon, color: 'orange', detail: 'Device level' },
                ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                            </div>
                            <div className={`w-2 h-2 rounded-full bg-${stat.color}-500`}></div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                        <p className="text-gray-600 text-sm">{stat.title}</p>
                        <p className="text-gray-500 text-xs mt-1">{stat.detail}</p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                    {[
                        { id: 'live', label: 'Live Tracking', icon: SignalIcon },
                        { id: 'history', label: 'Location History', icon: ClockIcon },
                        { id: 'geofence', label: 'Geo-fencing', icon: MapPinIcon },
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

            {/* Live Tracking Tab */}
            {activeTab === 'live' && (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Real-time Location Tracking</h2>
                    <div className="grid gap-4">
                        {liveTracking.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-sm font-medium text-gray-600">
                                                {item.user.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-semibold text-gray-900">{item.user.name}</h3>
                                                <span className="text-sm text-gray-600">{item.user.role}</span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.user.status)}`}>
                                                    {item.user.status}
                                                </span>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="flex items-center gap-2 text-gray-600 mb-2">
                                                        <MapPinIcon className="w-4 h-4" />
                                                        {item.location.address}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Accuracy: {item.location.accuracy} • Updated {item.lastUpdated}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <DevicePhoneMobileIcon className="w-4 h-4" />
                                                        {item.battery}%
                                                    </span>
                                                    <span className={`flex items-center gap-1 ${item.isMoving ? 'text-green-600' : 'text-gray-400'}`}>
                                                        <SignalIcon className="w-4 h-4" />
                                                        {item.isMoving ? `${item.speed} km/h` : 'Stationary'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            onClick={() => toast.success(`Opening map for ${item.user.name}`)}
                                        >
                                            <EyeIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Location History</h2>
                    {locationHistory.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{item.user}</h3>
                                    <p className="text-gray-600 text-sm">{item.date}</p>
                                </div>
                                <div className="text-right text-sm text-gray-600">
                                    <p>Total Distance: <span className="font-medium">{item.totalDistance}</span></p>
                                    <p>Working Hours: <span className="font-medium">{item.workingHours}</span></p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {item.locations.map((location, index) => (
                                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                        <span className="text-lg">{getLocationTypeIcon(location.type)}</span>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{location.address}</p>
                                        </div>
                                        <span className="text-sm text-gray-600">{location.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Geofence Tab */}
            {activeTab === 'geofence' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <MapPinIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Geo-fencing Setup</h3>
                    <p className="text-gray-600 mb-4">Create virtual boundaries and get alerts when employees enter or leave designated areas</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Create Geo-fence
                    </button>
                </div>
            )}
        </div>
    );
};

export default Tracking;