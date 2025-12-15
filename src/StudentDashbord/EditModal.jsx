import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MdEdit, MdDelete, MdClose } from 'react-icons/md';
import useAxiosSecure from '../hook/useAxiosSecure';
import useAuth from '../hook/useAuth';
import Loading from '../Component/Loading/Loading';

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const getSubjects = (subject) => {
    if (!subject) return '';
    if (Array.isArray(subject)) return subject.join(', ');
    if (typeof subject === 'string') return subject.split(',').map((s) => s.trim()).filter(Boolean).join(', ');
    return String(subject);
};

const mapPostToForm = (post) => ({
    Medium: post?.Medium || '',
    Class: post?.Class || '',
    Subject: getSubjects(post?.Subject),
    Gender: post?.Gender || '',
    Day: post?.Day || '',
    Salary: post?.Salary || '',
    Tutoring: post?.Tutoring || '',
    TuitionRegion: post?.TuitionRegion || '',
    selectDistrict: post?.selectDistrict || '',
});

const EditModal = ({ post, onClose, onSave, isSaving }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: mapPostToForm(post),
    });

    useEffect(() => {
        reset(mapPostToForm(post));
    }, [post, reset]);

    const onSubmit = (data) => {
        onSave(post?._id, data);
    };

    if (!post) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-2xl transform transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                        Edit Post Details ({post?._id?.slice(-6).toUpperCase() || 'N/A'})
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 transition duration-150"
                    >
                        <MdClose className="text-2xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Medium</label>
                            <input {...register("Medium", { required: true })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                            {errors.Medium && <p className="text-red-500 text-xs mt-1">Medium is required.</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Class</label>
                            <input {...register("Class", { required: true })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Subject(s)</label>
                            <input {...register("Subject")} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Comma separated" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preferred Tutor</label>
                            <input {...register("Gender")} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Male / Female / Any" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tutoring Days</label>
                            <input {...register("Day")} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tutoring Type</label>
                            <input {...register("Tutoring")} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Online / In-Person" />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location (Region)</label>
                            <input {...register("TuitionRegion")} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">District</label>
                            <input {...register("selectDistrict")} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Salary</label>
                            <input {...register("Salary")} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
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

const PostTable = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [editingPost, setEditingPost] = useState(null);

    const { data: posts = [], isLoading, isFetching } = useQuery({
        queryKey: ['posts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/post/${user.email}/all`);
            return res.data || [];
        },
        enabled: !!axiosSecure,
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }) => axiosSecure.patch(`/post/${id}/postdata`, payload),
        onSuccess: () => {
            queryClient.invalidateQueries(['posts', user?.email]);
            setEditingPost(null);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/post/${id}/deleted`),
        onSuccess: () => {
            queryClient.invalidateQueries(['posts', user?.email]);
        },
    });

    const handleView = (post) => setEditingPost(post);

    const handleDelete = (id) => {
        if (!id) return;
        const confirmed = window.confirm('Are you sure you want to delete this post?');
        if (!confirmed) return;
        deleteMutation.mutate(id);
    };

    const handleSave = (id, updatedData) => {
        if (!id) return;
        const payload = {
            ...updatedData,
            Subject: getSubjects(updatedData.Subject).split(',').map((s) => s.trim()).filter(Boolean),
        };
        updateMutation.mutate({ id, payload });
    };

    if (isLoading || isFetching) {
        return <Loading />;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Post Management</h2>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medium / Class</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {posts.map((post) => (
                            <tr key={post._id} className="hover:bg-gray-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {post?._id?.slice(-6).toUpperCase() || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(post?.createdAt)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    <div className="font-semibold text-gray-900">{post?.Medium || 'N/A'}</div>
                                    <div className="text-xs text-gray-500">{post?.Class || 'N/A'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {getSubjects(post?.Subject) || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {post?.Salary ? `৳${post.Salary}` : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post?.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {post?.status || 'Pending'}
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
                                        onClick={() => handleDelete(post?._id)}
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
                {posts.length === 0 && (
                    <div className="text-center py-10 text-gray-500 bg-white">
                        No posts found.
                    </div>
                )}
            </div>

            {editingPost && (
                <EditModal
                    post={editingPost}
                    onClose={() => setEditingPost(null)}
                    onSave={handleSave}
                    isSaving={updateMutation.isLoading}
                />
            )}
        </div>
    );
};

export default PostTable;