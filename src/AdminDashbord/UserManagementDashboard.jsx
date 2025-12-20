import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {
    MdPerson,
    MdAdminPanelSettings,
    MdVisibility,
    MdClose
} from 'react-icons/md';
import useAxiosSecure from '../hook/useAxiosSecure';
import Swal from 'sweetalert2';

const ROLES = ['admin', 'tutor', 'student'];

const UserDetailsModal = ({ user, onClose, onSave, isSaving }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            displayName: user?.displayName || '',
            Email: user?.Email || '',
            Phone: user?.Phone || '',
            PreferredArea: user?.PreferredArea || '',
            TuitionRegion: user?.TuitionRegion || '',
            selectDistrict: user?.selectDistrict || '',
            role: user?.role || 'student',
        },
    });

    React.useEffect(() => {
        if (user) {
            reset({
                displayName: user?.displayName || '',
                Email: user?.Email || '',
                Phone: user?.Phone || '',
                PreferredArea: user?.PreferredArea || '',
                TuitionRegion: user?.TuitionRegion || '',
                selectDistrict: user?.selectDistrict || '',
                role: user?.role || 'student',
            });
        }
    }, [user, reset]);

    const onSubmit = (data) => {
        onSave(user?._id, data);
    };

    if (!user) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                        User Details & Edit
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 transition duration-150"
                    >
                        <MdClose className="text-2xl" />
                    </button>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4 mb-4">
                        {user.photoURL && (
                            <img
                                src={user.photoURL}
                                alt={user.displayName}
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        )}
                        <div>
                            <h4 className="text-lg font-semibold">{user.displayName}</h4>
                            <p className="text-sm text-gray-600">{user.Email}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <label className="block text-xs font-medium text-gray-500">Created At</label>
                            <p className="text-gray-900">{user.createdAt || 'N/A'}</p>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500">Photo URL</label>
                            <p className="text-gray-900 truncate">{user.photoURL || 'N/A'}</p>
                        </div>
                    </div>
                </div>


                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Display Name</label>
                            <input
                                {...register("displayName", { required: true })}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                            {errors.displayName && <p className="text-red-500 text-xs mt-1">Name is required.</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                {...register("Email", { required: true })}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                                disabled
                            />
                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                {...register("Phone")}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <select
                                {...register("role", { required: true })}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            >
                                {ROLES.map(role => (
                                    <option key={role} value={role}>
                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preferred Area</label>
                            <input
                                {...register("PreferredArea")}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tuition Region</label>
                            <input
                                {...register("TuitionRegion")}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">District</label>
                            <input
                                {...register("selectDistrict")}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-150 mt-6 disabled:opacity-60"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const UserManagementDashboard = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['allusers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/alluser');
            return res.data || [];
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }) => {
            const res = await axiosSecure.patch(`/users/${id}`, data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['allusers']);
            setSelectedUser(null);
        },
    });

    const handleViewEdit = (user) => {
        setSelectedUser(user);
    };

    const handleSave = (id, data) => {
        updateMutation.mutate({ id, data });
    };

    const handleRoleChange = async (userId, newRole) => {
        if (newRole === 'admin' && !window.confirm(`Are you sure you want to promote this user to Admin?`)) {
            return;
        }

        try {
            await axiosSecure.patch(`/users/${userId}/role`, { role: newRole });
            queryClient.invalidateQueries(['allusers']);
        } catch (error) {
            console.error('Error updating role:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    };


    const getRoleStyle = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return 'bg-red-500 text-white';
            case 'tutor':
                return 'bg-indigo-100 text-indigo-700';
            case 'student':
                return 'bg-green-100 text-green-700';
            default:
                return 'bg-gray-200 text-gray-700';
        }
    };

    if (isLoading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-gray-600">Loading users...</div>
            </div>
        );
    }


    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <MdAdminPanelSettings className="text-red-600" /> Admin User Management
            </h2>
            <p className="text-gray-600 mb-8">
                Admins can update user information and change user roles.
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
                            <tr key={user._id} className="hover:bg-indigo-50 transition duration-150">

                                {/* Name */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <div className="flex items-center gap-2">
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt={user.displayName}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        ) : (
                                            <MdPerson className="text-xl text-gray-500" />
                                        )}
                                        <span>{user.displayName || 'N/A'}</span>
                                    </div>
                                </td>

                                {/* Email */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {user.Email || 'N/A'}
                                </td>

                                {/* Role Dropdown */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <select
                                        value={user.role || 'student'}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className={`p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${getRoleStyle(user.role)} bg-opacity-70`}
                                    >
                                        {ROLES.map(role => (
                                            <option key={role} value={role}>
                                                {role.charAt(0).toUpperCase() + role.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                {/* Status - showing active for now */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Active
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <div className="flex justify-center space-x-3">
                                        {/* View/Edit Button */}
                                        <button
                                            onClick={() => handleViewEdit(user)}
                                            className="text-indigo-600 hover:text-indigo-900 transition duration-150 p-2 rounded-full hover:bg-indigo-100"
                                            title="View/Edit User Details"
                                        >
                                            <MdVisibility className="text-xl" />
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

            {/* Modal for user details and edit */}
            {selectedUser && (
                <UserDetailsModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onSave={handleSave}
                    isSaving={updateMutation.isPending}
                />
            )}
        </div>
    );
};

export default UserManagementDashboard;