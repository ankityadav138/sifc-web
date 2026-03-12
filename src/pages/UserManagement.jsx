import React, { useState, useEffect } from 'react';
import api, { userAPI } from '../services/api';
import {
    UserGroupIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
    XMarkIcon,
    CheckIcon,
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    CalendarIcon,
    FunnelIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const UserManagement = () => {
    const { user } = useAuth();

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formType, setFormType] = useState('manager');
    const [managers, setManagers] = useState([]);

    // HR modal state
    const [showHRForm, setShowHRForm] = useState(false);
    const [editingHR, setEditingHR] = useState(null);
    const [hrData, setHRData] = useState({
        name: '',
        callsMade: '',
        interviewsScheduled: '',
        interviewsConducted: '',
        joinings: '',
        remarks: ''
    });

    // HR users list
    const [hrUsers, setHrUsers] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'manager',
        territory: '',
        isActive: true,
        managerId: '',
        department: '',
        location: '',
        status: 'active'
    });

    // Roles based on user permission
    const roles = user?.role === 'super_admin'
        ? [
            { value: 'manager', label: 'Manager', color: 'blue' },
            { value: 'tele_caller', label: 'Tele-caller', color: 'yellow' },
            { value: 'hr', label: 'HR', color: 'green' }
        ]
        : [
            { value: 'admin', label: 'Admin', color: 'purple' },
            { value: 'manager', label: 'Manager', color: 'blue' },
            { value: 'hr', label: 'HR', color: 'green' },
            { value: 'caller', label: 'Caller', color: 'yellow' }
        ];

    const statuses = [
        { value: 'active', label: 'Active', color: 'green' },
        { value: 'inactive', label: 'Inactive', color: 'red' }
    ];

    // Tele-caller summary for Super Admin/Manager
    const telecallerSummary = () => {
        const telecallers = users.filter(u => u.role === 'tele_caller');
        let totalCalls = 0, totalFollowUps = 0, totalNotAnswered = 0;
        telecallers.forEach(tc => {
            totalCalls += Number(tc.callsMade) || 0;
            totalFollowUps += Number(tc.followUps) || 0;
            totalNotAnswered += Number(tc.notAnswered) || 0;
        });
        return { totalCalls, totalFollowUps, totalNotAnswered, count: telecallers.length };
    };

    // HR summary for HR users
    const hrSummary = () => {
        let calls = 0, scheduled = 0, conducted = 0, joinings = 0;
        hrUsers.forEach(hr => {
            calls += Number(hr.callsMade) || 0;
            scheduled += Number(hr.interviewsScheduled) || 0;
            conducted += Number(hr.interviewsConducted) || 0;
            joinings += Number(hr.joinings) || 0;
        });
        return { calls, scheduled, conducted, joinings, count: hrUsers.length };
    };

    // HR Modal Handlers
    const openAddHRForm = () => {
        setEditingHR(null);
        setHRData({
            name: '',
            callsMade: '',
            interviewsScheduled: '',
            interviewsConducted: '',
            joinings: '',
            remarks: ''
        });
        setShowHRForm(true);
    };

    const handleEditHR = (hr) => {
        setEditingHR(hr);
        setHRData(hr);
        setShowHRForm(true);
    };

    const handleHRInputChange = (e) => {
        const { name, value } = e.target;
        setHRData(prev => ({ ...prev, [name]: value }));
    };

    const handleHRSubmit = (e) => {
        e.preventDefault();
        if (editingHR) {
            setHrUsers(hrUsers.map(h => h.id === editingHR.id ? { ...hrData, id: editingHR.id } : h));
            toast.success('HR User updated successfully');
        } else {
            setHrUsers([...hrUsers, { ...hrData, id: Date.now() }]);
            toast.success('HR User added successfully');
        }
        setShowHRForm(false);
        setEditingHR(null);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [users, searchTerm, selectedRole, selectedStatus]);

    useEffect(() => {
        const managersList = users.filter(u => u.role === 'manager');
        setManagers(managersList);
    }, [users]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const mockUsers = [
                {
                    id: 1,
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    phone: '+91 9876543210',
                    role: 'admin',
                    department: 'Administration',
                    location: 'New Delhi',
                    status: 'active',
                    joinDate: '2023-01-15',
                    lastLogin: '2024-01-30T10:30:00Z',
                    avatar: '👨‍💼'
                }
            ];
            setUsers(mockUsers);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const filterUsers = () => {
        let filtered = users;
        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phone.includes(searchTerm)
            );
        }
        if (selectedRole !== 'all') {
            filtered = filtered.filter(user => user.role === selectedRole);
        }
        if (selectedStatus !== 'all') {
            filtered = filtered.filter(user => user.status === selectedStatus);
        }
        setFilteredUsers(filtered);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUser) {
                const updatedUsers = users.map(user =>
                    user.id === editingUser.id ? { ...user, ...formData, id: editingUser.id } : user
                );
                setUsers(updatedUsers);
                toast.success('User updated successfully');
            } else {
                const newUser = {
                    ...formData,
                    id: Math.max(...users.map(u => u.id), 0) + 1,
                    joinDate: new Date().toISOString().split('T')[0],
                    lastLogin: null,
                    avatar: formData.role === 'admin' ? '👨‍💼' : formData.role === 'manager' ? '👩‍💼' : '👨‍💻'
                };
                setUsers([...users, newUser]);
                toast.success('User added successfully');
            }
            resetForm();
        } catch (error) {
            console.error('Failed to save user:', error);
            toast.error('Failed to save user');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            role: formType === 'manager' ? 'manager' : 'tele_caller',
            territory: '',
            isActive: true,
            managerId: '',
            department: '',
            location: '',
            status: 'active'
        });
        setShowForm(false);
        setEditingUser(null);
    };

    const handleToggleStatus = async (userToToggle) => {
        try {
            const updatedUsers = users.map(u =>
                u.id === userToToggle.id
                    ? { ...u, isActive: !u.isActive, status: u.isActive ? 'inactive' : 'active' }
                    : u
            );
            setUsers(updatedUsers);
            toast.success(`User ${userToToggle.isActive ? 'deactivated' : 'activated'} successfully`);
        } catch (error) {
            console.error('Failed to toggle user status:', error);
            toast.error('Failed to update user status');
        }
    };

    const openAddManagerForm = () => {
        setFormType('manager');
        setFormData({
            name: '',
            email: '',
            phone: '',
            role: 'manager',
            territory: '',
            isActive: true,
            managerId: '',
            department: '',
            location: '',
            status: 'active'
        });
        setEditingUser(null);
        setShowForm(true);
    };

    const openAddTelecallerForm = () => {
        setFormType('tele_caller');
        setFormData({
            name: '',
            email: '',
            phone: '',
            role: 'tele_caller',
            territory: '',
            isActive: true,
            managerId: '',
            department: '',
            location: '',
            status: 'active'
        });
        setEditingUser(null);
        setShowForm(true);
    };

    const handleEdit = (userToEdit) => {
        setFormType(userToEdit.role === 'manager' ? 'manager' : 'tele_caller');
        setFormData({
            name: userToEdit.name,
            email: userToEdit.email,
            phone: userToEdit.phone,
            role: userToEdit.role,
            territory: userToEdit.territory || userToEdit.department || '',
            isActive: userToEdit.isActive !== undefined ? userToEdit.isActive : userToEdit.status === 'active',
            managerId: userToEdit.managerId || '',
            department: userToEdit.department || '',
            location: userToEdit.location || '',
            status: userToEdit.status || 'active'
        });
        setEditingUser(userToEdit);
        setShowForm(true);
    };

    const handleDelete = async (user) => {
        try {
            setUsers(users.filter(u => u.id !== user.id));
            toast.success('User deleted successfully');
            setShowDeleteModal(false);
            setUserToDelete(null);
        } catch (error) {
            console.error('Failed to delete user:', error);
            toast.error('Failed to delete user');
        }
    };

    const showUserDetails = (user) => {
        setSelectedUser(user);
        setShowDetails(true);
    };

    const getRoleColor = (role) => {
        return roles.find(r => r.value === role)?.color || 'gray';
    };

    const getStatusColor = (status) => {
        return statuses.find(s => s.value === status)?.color || 'gray';
    };

    const StatusBadge = ({ status }) => {
        const color = getStatusColor(status);
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const RoleBadge = ({ role }) => {
        const color = getRoleColor(role);
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}>
                {roles.find(r => r.value === role)?.label || role}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Tele-caller Summary for Super Admin/Manager */}
            {(user?.role === 'super_admin' || user?.role === 'manager') && (
                <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="card p-4 text-center">
                        <div className="text-lg font-bold text-gray-900">Tele-callers</div>
                        <div className="text-2xl font-semibold text-primary-600">{telecallerSummary().count}</div>
                    </div>
                    <div className="card p-4 text-center">
                        <div className="text-sm text-gray-600">Calls Made Today</div>
                        <div className="text-xl font-semibold text-green-600">{telecallerSummary().totalCalls}</div>
                    </div>
                    <div className="card p-4 text-center">
                        <div className="text-sm text-gray-600">Follow-ups</div>
                        <div className="text-xl font-semibold text-blue-600">{telecallerSummary().totalFollowUps}</div>
                    </div>
                    <div className="card p-4 text-center">
                        <div className="text-sm text-gray-600">Not Answered</div>
                        <div className="text-xl font-semibold text-red-600">{telecallerSummary().totalNotAnswered}</div>
                    </div>
                </div>
            )}

            {/* HR Summary for HR users */}
            {user?.role === 'hr' && (
                <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="card p-4 text-center">
                        <div className="text-sm text-gray-600">Calls Made</div>
                        <div className="text-xl font-semibold text-green-600">{hrSummary().calls}</div>
                    </div>
                    <div className="card p-4 text-center">
                        <div className="text-sm text-gray-600">Interviews Scheduled</div>
                        <div className="text-xl font-semibold text-blue-600">{hrSummary().scheduled}</div>
                    </div>
                    <div className="card p-4 text-center">
                        <div className="text-sm text-gray-600">Interviews Conducted</div>
                        <div className="text-xl font-semibold text-purple-600">{hrSummary().conducted}</div>
                    </div>
                    <div className="card p-4 text-center">
                        <div className="text-sm text-gray-600">Joinings</div>
                        <div className="text-xl font-semibold text-primary-600">{hrSummary().joinings}</div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 font-display">User Management</h1>
                        <p className="text-gray-600 mt-1">Manage your team members and their roles</p>
                    </div>
                    {user?.role === 'super_admin' ? (
                        <div className="flex space-x-3 mt-4 sm:mt-0">
                            <button
                                onClick={openAddManagerForm}
                                className="btn-primary inline-flex items-center"
                            >
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Add Manager
                            </button>
                            <button
                                onClick={openAddTelecallerForm}
                                className="btn-secondary inline-flex items-center"
                            >
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Add Tele-caller
                            </button>
                            <button
                                onClick={openAddHRForm}
                                className="btn-secondary inline-flex items-center"
                            >
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Add HR User
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowForm(true)}
                            className="btn-primary mt-4 sm:mt-0 inline-flex items-center"
                        >
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Add User
                        </button>
                    )}
                </div>
            </div>

            {/* HR Users List for Super Admin */}
            {user?.role === 'super_admin' && hrUsers.length > 0 && (
                <div className="card p-6 mb-6">
                    <h2 className="text-lg font-bold mb-4">HR Users</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">Calls Made</th>
                                    <th className="px-4 py-2 text-left">Interviews Scheduled</th>
                                    <th className="px-4 py-2 text-left">Interviews Conducted</th>
                                    <th className="px-4 py-2 text-left">Joinings</th>
                                    <th className="px-4 py-2 text-left">Remarks</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hrUsers.map((hr) => (
                                    <tr key={hr.id} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-2">{hr.name}</td>
                                        <td className="px-4 py-2">{hr.callsMade}</td>
                                        <td className="px-4 py-2">{hr.interviewsScheduled}</td>
                                        <td className="px-4 py-2">{hr.interviewsConducted}</td>
                                        <td className="px-4 py-2">{hr.joinings}</td>
                                        <td className="px-4 py-2">{hr.remarks}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleEditHR(hr)}
                                                className="text-blue-600 hover:underline mr-2"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Telecaller List for Super Admin */}
            {user?.role === 'super_admin' && users.filter(u => u.role === 'tele_caller').length > 0 && (
                <div className="card p-6 mb-6">
                    <h2 className="text-lg font-bold mb-4">Tele-callers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {users.filter(u => u.role === 'tele_caller').map((tc) => (
                            <div key={tc.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-gray-900">{tc.name}</h3>
                                    <button
                                        onClick={() => handleEdit(tc)}
                                        className="text-gray-400 hover:text-blue-600"
                                    >
                                        <PencilIcon className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <div>Calls Made Today: <span className="font-medium">{tc.callsMade || 0}</span></div>
                                    <div>Follow-ups: <span className="font-medium">{tc.followUps || 0}</span></div>
                                    <div>Not Answered: <span className="font-medium">{tc.notAnswered || 0}</span></div>
                                    <div>Last Update: <span className="font-medium">{tc.lastUpdate || 'N/A'}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="card p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                    <div className="relative flex-1 max-w-md">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field pl-10"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="input-field min-w-[120px]"
                        >
                            <option value="all">All Roles</option>
                            {roles.map(role => (
                                <option key={role.value} value={role.value}>{role.label}</option>
                            ))}
                        </select>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="input-field min-w-[120px]"
                        >
                            <option value="all">All Status</option>
                            {statuses.map(status => (
                                <option key={status.value} value={status.value}>{status.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map(filteredUser => (
                    <div key={filteredUser.id} className="card p-6 hover:shadow-strong transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="text-3xl">{filteredUser.avatar}</div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{filteredUser.name}</h3>
                                    <p className="text-gray-500 text-sm">{filteredUser.territory || filteredUser.department}</p>
                                </div>
                            </div>
                            <div className="flex space-x-1">
                                <button
                                    onClick={() => showUserDetails(filteredUser)}
                                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                    title="View Details"
                                >
                                    <EyeIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleEdit(filteredUser)}
                                    className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                                    title="Edit"
                                >
                                    <PencilIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleToggleStatus(filteredUser)}
                                    className={`p-1 transition-colors ${
                                        filteredUser.isActive !== false && filteredUser.status !== 'inactive'
                                            ? 'text-green-500 hover:text-red-600'
                                            : 'text-red-500 hover:text-green-600'
                                    }`}
                                    title={filteredUser.isActive !== false && filteredUser.status !== 'inactive' ? 'Deactivate' : 'Activate'}
                                >
                                    {filteredUser.isActive !== false && filteredUser.status !== 'inactive'
                                        ? <CheckIcon className="w-4 h-4" />
                                        : <XMarkIcon className="w-4 h-4" />
                                    }
                                </button>
                                <button
                                    onClick={() => {
                                        setUserToDelete(filteredUser);
                                        setShowDeleteModal(true);
                                    }}
                                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                    title="Delete"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <EnvelopeIcon className="w-4 h-4 mr-2" />
                                {filteredUser.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <PhoneIcon className="w-4 h-4 mr-2" />
                                {filteredUser.phone}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <MapPinIcon className="w-4 h-4 mr-2" />
                                {filteredUser.territory || filteredUser.location}
                            </div>
                            {filteredUser.managerId && (
                                <div className="flex items-center text-sm text-gray-600">
                                    <UserIcon className="w-4 h-4 mr-2" />
                                    Manager: {managers.find(m => m.id === filteredUser.managerId)?.name || 'N/A'}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                                <RoleBadge role={filteredUser.role} />
                                <StatusBadge status={filteredUser.isActive === false ? 'inactive' : filteredUser.status || 'active'} />
                            </div>
                            <div className="text-xs text-gray-500">
                                {filteredUser.lastLogin
                                    ? new Date(filteredUser.lastLogin).toLocaleDateString()
                                    : 'Never logged in'
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredUsers.length === 0 && (
                <div className="card p-12 text-center">
                    <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            )}

            {/* Add/Edit User Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="card max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {editingUser
                                    ? `Edit ${formType === 'manager' ? 'Manager' : 'Tele-caller'}`
                                    : `Add ${formType === 'manager' ? 'Manager' : 'Tele-caller'}`
                                }
                            </h3>
                            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {user?.role === 'super_admin' ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="input-field"
                                            placeholder="Enter full name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="input-field"
                                            placeholder="+91 XXXXXXXXXX"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="input-field"
                                            placeholder="email@example.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Territory / Team</label>
                                        <input
                                            type="text"
                                            name="territory"
                                            value={formData.territory}
                                            onChange={handleInputChange}
                                            className="input-field"
                                            placeholder="e.g., North Region, Sales Team A"
                                            required
                                        />
                                    </div>
                                    {formType === 'tele_caller' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Manager</label>
                                            <select
                                                name="managerId"
                                                value={formData.managerId}
                                                onChange={handleInputChange}
                                                className="input-field"
                                                required
                                            >
                                                <option value="">Select Manager</option>
                                                {managers.map(manager => (
                                                    <option key={manager.id} value={manager.id}>
                                                        {manager.name} - {manager.territory || manager.department}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Active Status</label>
                                        <div className="flex items-center space-x-4 mt-2">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name="isActive"
                                                    checked={formData.isActive === true}
                                                    onChange={() => setFormData(prev => ({ ...prev, isActive: true }))}
                                                    className="form-radio h-4 w-4 text-primary-600"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">Active</span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name="isActive"
                                                    checked={formData.isActive === false}
                                                    onChange={() => setFormData(prev => ({ ...prev, isActive: false }))}
                                                    className="form-radio h-4 w-4 text-red-600"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">Inactive</span>
                                            </label>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                        <select
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            className="input-field"
                                            required
                                        >
                                            {roles.map(role => (
                                                <option key={role.value} value={role.value}>{role.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                        <input
                                            type="text"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleInputChange}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="input-field"
                                            required
                                        >
                                            {statuses.map(status => (
                                                <option key={status.value} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}

                            <div className="flex space-x-3 pt-4">
                                <button type="submit" className="btn-primary flex-1">
                                    {editingUser
                                        ? `Update ${formType === 'manager' ? 'Manager' : 'Tele-caller'}`
                                        : `Add ${formType === 'manager' ? 'Manager' : 'Tele-caller'}`
                                    }
                                </button>
                                <button type="button" onClick={resetForm} className="btn-secondary flex-1">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* HR Modal */}
            {showHRForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="card max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {editingHR ? 'Edit HR User' : 'Add HR User'}
                            </h3>
                            <button
                                onClick={() => { setShowHRForm(false); setEditingHR(null); }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleHRSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={hrData.name}
                                    onChange={handleHRInputChange}
                                    className="input-field"
                                    placeholder="Enter HR user name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">No. of Calls Made</label>
                                <input
                                    type="number"
                                    name="callsMade"
                                    value={hrData.callsMade}
                                    onChange={handleHRInputChange}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">No. of Interviews Scheduled</label>
                                <input
                                    type="number"
                                    name="interviewsScheduled"
                                    value={hrData.interviewsScheduled}
                                    onChange={handleHRInputChange}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">No. of Interviews Conducted</label>
                                <input
                                    type="number"
                                    name="interviewsConducted"
                                    value={hrData.interviewsConducted}
                                    onChange={handleHRInputChange}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">No. of Joinings</label>
                                <input
                                    type="number"
                                    name="joinings"
                                    value={hrData.joinings}
                                    onChange={handleHRInputChange}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks / Follow-up Notes</label>
                                <textarea
                                    name="remarks"
                                    value={hrData.remarks}
                                    onChange={handleHRInputChange}
                                    className="input-field"
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="flex space-x-3 pt-4">
                                <button type="submit" className="btn-primary flex-1">
                                    {editingHR ? 'Update HR User' : 'Add HR User'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setShowHRForm(false); setEditingHR(null); }}
                                    className="btn-secondary flex-1"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="card max-w-sm w-full p-6">
                        <div className="text-center">
                            <TrashIcon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Delete User</h3>
                            <p className="text-gray-500 mb-6">
                                Are you sure you want to delete {userToDelete?.name}? This action cannot be undone.
                            </p>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => handleDelete(userToDelete)}
                                    className="btn-primary bg-red-600 hover:bg-red-700 flex-1"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setUserToDelete(null);
                                    }}
                                    className="btn-secondary flex-1"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* User Details Modal */}
            {showDetails && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="card max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">User Details</h3>
                            <button
                                onClick={() => setShowDetails(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="text-center mb-6">
                            <div className="text-6xl mb-4">{selectedUser.avatar}</div>
                            <h4 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h4>
                            <p className="text-gray-500">{selectedUser.territory || selectedUser.department}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Email:</span>
                                <span className="font-medium">{selectedUser.email}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Phone:</span>
                                <span className="font-medium">{selectedUser.phone}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Territory / Team:</span>
                                <span className="font-medium">{selectedUser.territory || selectedUser.location}</span>
                            </div>
                            {selectedUser.managerId && (
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Assigned Manager:</span>
                                    <span className="font-medium">
                                        {managers.find(m => m.id === selectedUser.managerId)?.name || 'N/A'}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Role:</span>
                                <RoleBadge role={selectedUser.role} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Status:</span>
                                <StatusBadge status={selectedUser.isActive === false ? 'inactive' : selectedUser.status || 'active'} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Join Date:</span>
                                <span className="font-medium">
                                    {new Date(selectedUser.joinDate).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Last Login:</span>
                                <span className="font-medium">
                                    {selectedUser.lastLogin
                                        ? new Date(selectedUser.lastLogin).toLocaleDateString()
                                        : 'Never'
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
