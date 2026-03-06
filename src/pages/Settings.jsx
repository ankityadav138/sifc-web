import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    CogIcon,
    UserCircleIcon,
    BellIcon,
    ShieldCheckIcon,
    GlobeAltIcon,
    DevicePhoneMobileIcon,
    KeyIcon,
    CircleStackIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Settings = () => {
    const { user, logout } = useAuth();
    const [activeSection, setActiveSection] = useState('general');
    const [settings, setSettings] = useState({
        general: {
            companyName: 'Sales CRM Inc.',
            timezone: 'Asia/Kolkata',
            language: 'en',
            dateFormat: 'dd/mm/yyyy',
            currency: 'INR'
        },
        notifications: {
            emailNotifications: true,
            pushNotifications: true,
            smsAlerts: false,
            weeklyReports: true,
            realTimeAlerts: true
        },
        security: {
            twoFactorAuth: false,
            passwordExpiry: '90',
            sessionTimeout: '30',
            ipRestriction: false,
            auditLogs: true
        },
        integration: {
            apiAccess: true,
            webhookUrl: '',
            autoSync: true,
            backupFrequency: 'daily'
        }
    });

    const handleSettingChange = (section, key, value) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    const saveSettings = () => {
        toast.success('Settings saved successfully!');
    };

    const sections = [
        { id: 'general', label: 'General', icon: CogIcon },
        { id: 'notifications', label: 'Notifications', icon: BellIcon },
        { id: 'security', label: 'Security', icon: ShieldCheckIcon },
        { id: 'integration', label: 'Integration', icon: CircleStackIcon },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-600 mt-1">Manage your application preferences and configuration</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={saveSettings}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Settings Navigation */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <nav className="space-y-2">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                                        activeSection === section.id
                                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <section.icon className="w-5 h-5" />
                                    {section.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        
                        {/* General Settings */}
                        {activeSection === 'general' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h2>
                                    <div className="grid gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                value={settings.general.companyName}
                                                onChange={(e) => handleSettingChange('general', 'companyName', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Timezone
                                                </label>
                                                <select
                                                    value={settings.general.timezone}
                                                    onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                                                    <option value="America/New_York">America/New_York (EST)</option>
                                                    <option value="Europe/London">Europe/London (GMT)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Language
                                                </label>
                                                <select
                                                    value={settings.general.language}
                                                    onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="en">English</option>
                                                    <option value="hi">Hindi</option>
                                                    <option value="es">Spanish</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Date Format
                                                </label>
                                                <select
                                                    value={settings.general.dateFormat}
                                                    onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                                                    <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                                                    <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Currency
                                                </label>
                                                <select
                                                    value={settings.general.currency}
                                                    onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="INR">Indian Rupee (₹)</option>
                                                    <option value="USD">US Dollar ($)</option>
                                                    <option value="EUR">Euro (€)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notification Settings */}
                        {activeSection === 'notifications' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                                    <div className="space-y-4">
                                        {[
                                            { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive important updates via email' },
                                            { key: 'pushNotifications', label: 'Push Notifications', description: 'Get instant notifications in your browser' },
                                            { key: 'smsAlerts', label: 'SMS Alerts', description: 'Receive critical alerts via SMS' },
                                            { key: 'weeklyReports', label: 'Weekly Reports', description: 'Get weekly performance summaries' },
                                            { key: 'realTimeAlerts', label: 'Real-time Alerts', description: 'Immediate notifications for urgent events' }
                                        ].map((item) => (
                                            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{item.label}</h4>
                                                    <p className="text-sm text-gray-600">{item.description}</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={settings.notifications[item.key]}
                                                        onChange={(e) => handleSettingChange('notifications', item.key, e.target.checked)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Security Settings */}
                        {activeSection === 'security' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Security & Privacy</h2>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                                                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={settings.security.twoFactorAuth}
                                                    onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Password Expiry (Days)
                                                </label>
                                                <select
                                                    value={settings.security.passwordExpiry}
                                                    onChange={(e) => handleSettingChange('security', 'passwordExpiry', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="30">30 days</option>
                                                    <option value="60">60 days</option>
                                                    <option value="90">90 days</option>
                                                    <option value="never">Never</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Session Timeout (Minutes)
                                                </label>
                                                <select
                                                    value={settings.security.sessionTimeout}
                                                    onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="15">15 minutes</option>
                                                    <option value="30">30 minutes</option>
                                                    <option value="60">1 hour</option>
                                                    <option value="never">Never</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Integration Settings */}
                        {activeSection === 'integration' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">API & Integration</h2>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <h4 className="font-medium text-gray-900">API Access</h4>
                                                <p className="text-sm text-gray-600">Enable third-party access to your data</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={settings.integration.apiAccess}
                                                    onChange={(e) => handleSettingChange('integration', 'apiAccess', e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Webhook URL
                                            </label>
                                            <input
                                                type="url"
                                                value={settings.integration.webhookUrl}
                                                onChange={(e) => handleSettingChange('integration', 'webhookUrl', e.target.value)}
                                                placeholder="https://your-domain.com/webhook"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Backup Frequency
                                                </label>
                                                <select
                                                    value={settings.integration.backupFrequency}
                                                    onChange={(e) => handleSettingChange('integration', 'backupFrequency', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="hourly">Hourly</option>
                                                    <option value="daily">Daily</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="monthly">Monthly</option>
                                                </select>
                                            </div>
                                            <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900">Auto Sync</h4>
                                                    <p className="text-sm text-gray-600">Automatically sync data</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={settings.integration.autoSync}
                                                        onChange={(e) => handleSettingChange('integration', 'autoSync', e.target.checked)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;