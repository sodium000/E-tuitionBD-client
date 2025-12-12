import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdEdit, MdDelete, MdClose } from 'react-icons/md';

// --- 1. DUMMY DATA ---
const initialPosts = [
    {
        id: '1001',
        time: '2025-12-12 14:30',
        status: 'Active',
        medium: 'English',
        class: 'Class 10',
        subject: 'English',
        tutor: 'Male',
        days: 'Mon, Wed, Fri',
        duration: '2 Hours',
        students: 1,
        salary: '10,000 BDT',
    },
    {
        id: '1002',
        time: '2025-12-10 09:15',
        status: 'Pending',
        medium: 'Bengali',
        class: 'Class 8',
        subject: 'bangla',
        tutor: 'Any',
        days: 'Daily',
        duration: '1.5 Hours',
        students: 2,
        salary: '12,000 BDT',
    },
];

// --- 2. MODAL COMPONENT ---
const EditModal = ({ post, onClose, onSave }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: post,
    });

    const onSubmit = (data) => {
        onSave(post.id, data);
    };

    return (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg transform transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-xl font-semibold text-gray-800">Edit Post Details ({post.id})</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 transition duration-150"
                    >
                        <MdClose className="text-2xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Form Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Medium</label>
                            <input {...register("medium", { required: true })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                            {errors.medium && <p className="text-red-500 text-xs mt-1">Medium is required.</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Class</label>
                            <input {...register("class", { required: true })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Subject</label>
                            <input {...register("subject")} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preferred Tutor</label>
                            <input {...register("tutor")} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tutoring Days</label>
                            <input {...register("days")} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Post Time (Edit)</label>
                            <input {...register("time")} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Duration</label>
                            <input {...register("duration")} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">No of Students</label>
                            <input type="number" {...register("students", { valueAsNumber: true })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Monthly Salary</label>
                            <input {...register("salary")} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-150 mt-6"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

const PostTable = () => {
    const [posts, setPosts] = useState(initialPosts);
    const [editingPost, setEditingPost] = useState(null); // Holds the post object being edited or null

    // Handler for opening the modal
    const handleView = (post) => {
        setEditingPost(post);
    };

    // Handler for deleting a post (simulated)
    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete Post #${id}?`)) {
            setPosts(posts.filter(post => post.id !== id));
            alert(`Post #${id} deleted!`);
        }
    };

    // Handler for saving changes from the modal (simulated)
    const handleSave = (id, updatedData) => {
        setPosts(posts.map(post =>
            post.id === id ? { ...post, ...updatedData } : post
        ));
        setEditingPost(null); // Close modal
        alert(`Post #${id} updated successfully!`);
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-800"> Post Management</h2>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {posts.map((post) => (
                            <tr key={post.id} className="hover:bg-gray-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{post.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.time}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {post.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    <button
                                        onClick={() => handleView(post)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                                    >
                                        <MdEdit className="mr-1 h-5 w-5" />
                                        View / Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
                                    >
                                        <MdDelete className="mr-1 h-5 w-5" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Render Modal only if a post is selected for editing */}
            {editingPost && (
                <EditModal
                    post={editingPost}
                    onClose={() => setEditingPost(null)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default PostTable;