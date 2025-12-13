import React, { useState } from 'react';
// Import necessary icons from react-icons
// You might need to install this: npm install react-icons
import {
    MdEdit,
    MdDelete,
    MdPerson,
    MdAdminPanelSettings
} from 'react-icons/md';

// --- 1. Mock Data and Constants ---
const initialUsers = [
    {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice.j@platform.com',
        role: 'Admin', // 'Admin', 'Tutor', 'Student'
        status: 'Active',
    },
    {
        id: 2,
        name: 'Bob Smith',
        email: 'bob.s@platform.com',
        role: 'Tutor',
        status: 'Active',
    },
    {
        id: 3,
        name: 'Charlie Brown',
        email: 'charlie.b@platform.com',
        role: 'Student',
        status: 'Active',
    },
    {
        id: 4,
        name: 'Diana Prince',
        email: 'diana.p@platform.com',
        role: 'Student',
        status: 'Suspended',
    },
];

const ROLES = ['Admin', 'Tutor', 'Student'];

// --- 2. Main Component ---
const UserManagementDashboard = () => {
    const [users, setUsers] = useState(initialUsers);

    // Placeholder for the actual API call to update user data
    const handleUpdate = (id) => {
        alert(`Initiating Edit for User ID: ${id}`);
        // In a real app, this would open a modal/form to edit name/email/status
    };

    // Placeholder for the actual API call to delete a user
    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete User ID: ${id}?`)) {
            // API call here. If successful:
            setUsers(users.filter(user => user.id !== id));
            alert(`User ID: ${id} deleted.`);
        }
    };

    // Logic to change the user's role
    const handleRoleChange = (userId, newRole) => {
        if (newRole === 'Admin' && !window.confirm(`Are you sure you want to promote this user to Admin?`)) {
            return;
        }

        // API call here to update role. If successful:
        setUsers(users.map(user =>
            user.id === userId ? { ...user, role: newRole } : user
        ));
    };

    // Helper to determine role styling
    const getRoleStyle = (role) => {
        switch (role) {
            case 'Admin':
                return 'bg-red-500 text-white';
            case 'Tutor':
                return 'bg-indigo-100 text-indigo-700';
            case 'Student':
                return 'bg-green-100 text-green-700';
            default:
                return 'bg-gray-200 text-gray-700';
        }
    };


    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <MdAdminPanelSettings className="text-red-600" /> Admin User Management
            </h2>
            <p className="text-gray-600 mb-8">
                Admins can update user information, delete user accounts, or change user roles.
            </p>

            <div className="overflow-x-auto shadow-2xl rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-indigo-50 transition duration-150">

                                {/* Name */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <MdPerson className="text-xl text-gray-500" />
                                    {user.name}
                                </td>

                                {/* Email */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {user.email}
                                </td>

                                {/* Role Dropdown */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className={`p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${getRoleStyle(user.role)} bg-opacity-70`}
                                    >
                                        {ROLES.map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span
                                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <div className="flex justify-center space-x-3">

                                        {/* Edit Button */}
                                        <button
                                            onClick={() => handleUpdate(user.id)}
                                            className="text-indigo-600 hover:text-indigo-900 transition duration-150 p-2 rounded-full hover:bg-indigo-100"
                                            title="Edit User Details"
                                        >
                                            <MdEdit className="text-xl" />
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-900 transition duration-150 p-2 rounded-full hover:bg-red-100"
                                            title="Delete Account"
                                        >
                                            <MdDelete className="text-xl" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && (
                    <div className="text-center py-10 text-gray-500 bg-white">
                        No users found in the database.
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManagementDashboard;