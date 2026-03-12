import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    UserGroupIcon,
    DocumentTextIcon,
    ChartBarIcon,
    ClockIcon,
    MapPinIcon,
    CogIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    BellIcon,
    MagnifyingGlassIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import sifcLogo from '../assets/sifc-logo.jpeg';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    debugger;
    console.log("Loacation pathname",location.pathname)

    const navigation = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: HomeIcon,
            current: location.pathname === '/dashboard'
        },
        {
            name: 'User Management',
            href: '/users',
            icon: UserGroupIcon,
            current: location.pathname === '/users'
        },
        {
            name: 'Reports',
            href: '/reports',
            icon: DocumentTextIcon,
            current: location.pathname === '/reports'
        },
        // {
        //     name: 'Analytics',
        //     href: '/analytics',
        //     icon: ChartBarIcon,
        //     current: location.pathname === '/analytics'
        // },
        {
            name: 'Attendance',
            href: '/attendance',
            icon: ClockIcon,
            current: location.pathname === '/attendance'
        },
        // {
        //     name: 'Geo Tracking',
        //     href: '/tracking',
        //     icon: MapPinIcon,
        //     current: location.pathname === '/tracking'
        // },
        {
            name: 'Settings',
            href: '/settings',
            icon: CogIcon,
            current: location.pathname === '/settings'
        }
    ];

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error('Failed to logout');
        }
    };

    const SidebarLink = ({ item }) => (
        <Link
            to={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                item.current
                    ? 'bg-primary-100 text-primary-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
        >
            <item.icon
                className={`mr-3 flex-shrink-0 h-5 w-5 transition-colors ${
                    item.current ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'
                }`}
            />
            {item.name}
        </Link>
    );

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                >
                    <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
                </div>
            )}

            {/* Mobile sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                            <img src={sifcLogo} alt="SIFC Logo" className="w-8 h-8 object-cover rounded-full" />
                        </div>
                        <h1 className="ml-2 text-xl font-bold text-gray-900 font-display">Sales CRM</h1>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <nav className="mt-4 px-4 space-y-2">
                    {navigation.map((item) => (
                        <SidebarLink key={item.name} item={item} />
                    ))}
                </nav>

                {/* Mobile user section */}
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
                    <div className="flex items-center mb-3">
                        <div className="flex-shrink-0">
                            <UserCircleIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                        Sign out
                    </button>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-64 bg-white border-r border-gray-200">
                    {/* Logo */}
                    <div className="flex items-center h-16 px-4 border-b border-gray-200">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-medium overflow-hidden">
                                <img src={sifcLogo} alt="SIFC Logo" className="w-8 h-8 object-cover rounded-full" />
                            </div>
                            <h1 className="ml-2 text-xl font-bold text-gray-900 font-display">Sales CRM</h1>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                        {navigation.map((item) => (
                            <SidebarLink key={item.name} item={item} />
                        ))}
                    </nav>

                    {/* User section */}
                    <div className="flex-shrink-0 border-t border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center min-w-0 flex-1">
                                <div className="flex-shrink-0">
                                    <UserCircleIcon className="w-8 h-8 text-gray-400" />
                                </div>
                                <div className="ml-3 min-w-0 flex-1">
                                    <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user?.role}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                            Sign out
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                {/* Top navigation */}
                <div className="lg:hidden">
                    <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="text-gray-500 hover:text-gray-600"
                        >
                            <Bars3Icon className="w-6 h-6" />
                        </button>
                        <h1 className="text-lg font-semibold text-gray-900">Sales CRM</h1>
                        <div className="w-6"></div>{/* Spacer */}
                    </div>
                </div>

                {/* Desktop top bar */}
                <div className="hidden lg:block bg-white border-b border-gray-200 shadow-sm">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate font-display">
                                    {navigation.find(item => item.current)?.name || 'Dashboard'}
                                </h2>
                            </div>
                            <div className="ml-4 flex items-center md:ml-6 space-x-3">
                                {/* Search */}
                                <div className="relative hidden md:block">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="search"
                                        placeholder="Search..."
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                                    />
                                </div>

                                {/* Notifications */}
                                <button className="bg-white p-2 rounded-lg text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
                                    <BellIcon className="h-5 w-5" />
                                </button>

                                {/* Profile dropdown */}
                                <div className="relative">
                                    <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                                        <UserCircleIcon className="w-6 h-6 text-gray-400" />
                                        <div className="hidden md:block">
                                            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                            <p className="text-xs text-gray-500">{user?.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content area */}
                <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50">
                    <div className="w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
