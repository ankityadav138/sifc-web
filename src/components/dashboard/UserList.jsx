import React from 'react';
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';

const getRoleColor = (role) => {
    const colors = {
        manager: 'blue',
        tele_caller: 'yellow',
        hr: 'green',
        admin: 'purple'
    };
    return colors[role] || 'gray';
};

const getRoleLabel = (role) => {
    const labels = {
        manager: 'Manager',
        tele_caller: 'Tele-caller',
        hr: 'HR',
        admin: 'Admin'
    };
    return labels[role] || role;
};

const UserList = ({ users, title }) => (
    <div className="card p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <span className="text-sm text-gray-500">
                {users.length} user{users.length !== 1 ? 's' : ''}
            </span>
        </div>
        
        {users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
                No users found
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <div key={user.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow bg-white">
                        <div className="flex items-start space-x-4">
                            <div className="text-3xl">{user.avatar}</div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-${getRoleColor(user.role)}-100 text-${getRoleColor(user.role)}-800 mt-1`}>
                                    {getRoleLabel(user.role)}
                                </span>
                                
                                <div className="mt-3 space-y-1 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                                        <span className="truncate">{user.email}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <PhoneIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                                        {user.phone}
                                    </div>
                                    <div className="flex items-center">
                                        <MapPinIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                                        {user.location}
                                    </div>
                                </div>
                                
                                {/* Show stats based on context */}
                                <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-gray-500">Calls:</span>
                                        <span className="font-medium ml-1">{user.callsMade || 0}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Follow-ups:</span>
                                        <span className="font-medium ml-1">{user.followUps || 0}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-gray-500">DSR:</span>
                                        <span className={`ml-1 font-medium ${user.dsrStatus === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
                                            {user.dsrStatus === 'completed' ? 'Completed' : 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export { getRoleColor, getRoleLabel };
export default UserList;
