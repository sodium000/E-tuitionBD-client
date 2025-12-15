import React, { useState, useEffect } from 'react';
    import { useQuery } from '@tanstack/react-query';
    import useAxiosSecure from '../hook/useAxiosSecure';
    import { useForm } from 'react-hook-form';
    import {
        MdEdit,
        MdDelete,
        MdCheckCircle,
        MdAccessTime,
        MdCancel,
        MdClose
    } from 'react-icons/md';
    import useAuth from '../hook/useAuth';
    import Loading from '../Component/Loading/Loading';
    import Swal from 'sweetalert2';

    const StatusPill = ({ status }) => {
        let icon, color;
        switch (status) {
            case 'Approved':
                icon = <MdCheckCircle className="text-lg" />;
                color = 'text-green-700 bg-green-100';
                break;
            case 'Pending':
                icon = <MdAccessTime className="text-lg" />;
                color = 'text-yellow-700 bg-yellow-100';
                break;
            case 'Rejected':
                icon = <MdCancel className="text-lg" />;
                color = 'text-red-700 bg-red-100';
                break;
            default:
                icon = <MdAccessTime className="text-lg" />;
                color = 'text-gray-700 bg-gray-100';
        }

        return (
            <div className={`inline-flex items-center gap-1 px-3 py-1 font-semibold rounded-full ${color}`}>
                {icon}
                <span>{status}</span>
            </div>
        );
    };

    const EditModal = ({ isOpen, onClose, application, onUpdate }) => {
        const axiosSecure = useAxiosSecure();
        const { register, handleSubmit, formState: { errors }, reset } = useForm();
        
        useEffect(() => {
            if (application) {
                reset({
                    _id: application._id, 
                    qualifications: application.qualifications || '',
                    experience: application.experience || '',
                    expectedSalary: application.expectedSalary || ''
                });
            }
        }, [application, reset]);

        if (!isOpen) return null;

        const onSubmit = async (data) => {
            try {
                const updateData = {
                    qualifications: data.qualifications,
                    experience: data.experience,
                    expectedSalary: data.expectedSalary
                };
                
                const res = await axiosSecure.patch(`/applications/${data._id}`, updateData);
                
                if (res.data) {
                    if (onUpdate) {
                        onUpdate();
                    }
                    Swal.fire({
                        title: "Updated!",
                        text: "Your application has been updated.",
                        icon: "success"
                    });
                    onClose();
                }
            } catch (error) {
                console.error('Error updating application:', error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update application. Please try again.",
                    icon: "error"
                });
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center p-6 border-b">
                        <h2 className="text-2xl font-bold text-gray-800">Edit Application</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition duration-150"
                        >
                            <MdClose className="text-2xl" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                        <div>
                            <input type="hidden" {...register("_id")} />
                            <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-2">
                                Qualifications <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="qualifications"
                                {...register('qualifications', { required: 'Qualifications are required' })}
                                rows="4"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.qualifications ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="e.g., BSC CSE, Master's in Mathematics"
                            />
                            {errors.qualifications && (
                                <p className="text-red-500 text-sm mt-1">{errors.qualifications.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                                Experience (Years) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="experience"
                                {...register('experience', {
                                    required: 'Experience is required',
                                    min: { value: 0, message: 'Experience cannot be negative' }
                                })}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.experience ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="e.g., 4"
                            />
                            {errors.experience && (
                                <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="expectedSalary" className="block text-sm font-medium text-gray-700 mb-2">
                                Expected Salary <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="expectedSalary"
                                {...register('expectedSalary', {
                                    required: 'Expected salary is required',
                                    min: { value: 0, message: 'Salary cannot be negative' }
                                })}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.expectedSalary ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="e.g., 5000"
                            />
                            {errors.expectedSalary && (
                                <p className="text-red-500 text-sm mt-1">{errors.expectedSalary.message}</p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-4 pt-4 border-t">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150"
                            >
                                Update Application
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    // Component to fetch and display post information
    const PostInfo = ({ postId }) => {
        const axiosSecure = useAxiosSecure();
        
        const { data: post, isLoading: postLoading } = useQuery({
            queryKey: ['post', postId],
            enabled: !!postId,
            queryFn: async () => {
                if (!postId) return null;
                const postIdValue = typeof postId === 'string' ? postId : postId._id || postId;
                const res = await axiosSecure.get(`/post/${postIdValue}`);
                return res.data;
            }
        });

        if (postLoading) {
            return <span className="text-gray-400">Loading...</span>;
        }

        if (!post) {
            return <span className="text-gray-400">N/A</span>;
        }

        const getSubjects = (subject) => {
            if (!subject) return 'N/A';
            if (Array.isArray(subject)) return subject.join(', ');
            if (typeof subject === "string") {
                return subject.split(",").map((s) => s.trim()).filter(Boolean).join(', ');
            }
            return subject;
        };

        return (
            <div className="space-y-1">
                <div className="font-medium text-gray-900">
                    {post.Subject ? getSubjects(post.Subject).substring(0, 30) + (getSubjects(post.Subject).length > 30 ? '...' : '') : 'N/A'}
                </div>
                <div className="text-xs text-gray-500">
                    {post.Medium || 'N/A'} - {post.Class || 'N/A'}
                </div>
                <div className="text-xs text-gray-400">
                    ID: {post._id ? post._id.slice(-6).toUpperCase() : 'N/A'}
                </div>
            </div>
        );
    };

    const MyApplications = () => {
        const axiosSecure = useAxiosSecure();
        const { user } = useAuth();
        const [isEditModalOpen, setIsEditModalOpen] = useState(false);
        const [selectedApplication, setSelectedApplication] = useState(null);

        const { data: Application, isLoading, refetch } = useQuery({
            queryKey: ['applications', user?.email],
            enabled: !!user?.email,
            queryFn: async () => {
                const res = await axiosSecure.get(`/applications/${user.email}/apply`);
                return res.data;
            }
        });



        const handleParcelDelete = id => {

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {

                    axiosSecure.delete(`/applications/${id}/deleted`)
                        .then(res => {
                            console.log(res.data);

                            if (res.data.deletedCount) {
                                refetch();

                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your parcel request has been deleted.",
                                    icon: "success"
                                });
                            }

                        })


                }
            });

        }


        const handleEdit = (app) => {
            setSelectedApplication(app);
        setIsEditModalOpen(true);
        }


        const formatDate = (dateString) => {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        };

        if (isLoading) {
            return <Loading />;
        }

        const applications = Application || [];


        return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    My Applications
                </h2>
                <p className="text-gray-600 mb-8">
                    Track the status of your tuition applications. Tutors can update or delete their requests until they are approved.
                </p>

                <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Post Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Qualifications
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Experience
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Expected Salary
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date Submitted
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {applications.map((app) => {
                                const postId = app.postId 
                                    ? (typeof app.postId === 'string' 
                                        ? app.postId 
                                        : app.postId._id || app.postId)
                                    : null;

                                return (
                                <tr key={app._id} className="hover:bg-indigo-50 transition duration-150">
                                    {/* Post Details */}
                                    <td className="px-6 py-4 text-sm">
                                        {postId ? (
                                            <PostInfo postId={postId} />
                                        ) : (
                                            <span className="text-gray-400">N/A</span>
                                        )}
                                    </td>

                                    {/* Qualifications */}
                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                                        {app.qualifications || 'N/A'}
                                    </td>

                                    {/* Experience */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {app.experience || 'N/A'} {app.experience ? 'years' : ''}
                                    </td>

                                    {/* Expected Salary */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {app.expectedSalary ? `৳${app.expectedSalary}` : 'N/A'}
                                    </td>

                                    {/* Date Submitted */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {formatDate(app.createdAt)}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <StatusPill status={app.status} />
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        {app.status !== 'Approved' ? (
                                            <div className="flex justify-center space-x-3">
                                                <button
                                                    onClick={() => handleEdit(app)}
                                                    className="text-indigo-600 hover:text-indigo-900 transition duration-150 p-2 rounded-full hover:bg-indigo-100"
                                                    title="Edit Application"
                                                >
                                                    <MdEdit className="text-xl" />
                                                </button>
                                                <button
                                                    onClick={() => handleParcelDelete(app._id)}
                                                    className="text-red-600 hover:text-red-900 transition duration-150 p-2 rounded-full hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Delete Application"
                                                >
                                                    <MdDelete className="text-xl" />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 italic text-xs">
                                                Actions locked
                                            </span>
                                        )}
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {applications.length === 0 && (
                        <div className="text-center py-10 text-gray-500 bg-white">
                            No applications found.
                        </div>
                    )}
                </div>

                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedApplication(null);
                    }}
                    application={selectedApplication}
                    onUpdate={() => {
                        refetch();
                    }}
                />
            </div>
        );
    };

    export default MyApplications;