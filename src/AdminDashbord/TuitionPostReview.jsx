import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
// Import necessary icons from react-icons
// You might need to install this: npm install react-icons
import { 
  MdCheckCircle, 
  MdCancel, 
  MdSearch, 
  MdVisibility, 
  MdDateRange,
  MdClose
} from 'react-icons/md';
import useAxiosSecure from '../hook/useAxiosSecure';

// Modal Component to display post details
const PostDetailsModal = ({ post, onClose, onApprove, onReject, isLoading }) => {
  if (!post) return null;

  const isAccepted = post.status === 'accepted';
  const isRejected = post.status === 'rejected';
  const isDisabled = isAccepted || isRejected;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-300">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-xl font-semibold text-gray-800">
            Post Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition duration-150"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Class</label>
            <p className="mt-1 text-sm text-gray-900">{post.Class || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Day</label>
            <p className="mt-1 text-sm text-gray-900">{post.Day || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <p className="mt-1 text-sm text-gray-900">{post.Gender || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Medium</label>
            <p className="mt-1 text-sm text-gray-900">{post.Medium || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Salary</label>
            <p className="mt-1 text-sm text-gray-900">{post.Salary || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <p className="mt-1 text-sm text-gray-900">{post.Subject || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tuition Region</label>
            <p className="mt-1 text-sm text-gray-900">{post.TuitionRegion || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tutoring</label>
            <p className="mt-1 text-sm text-gray-900">{post.Tutoring || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Created At</label>
            <p className="mt-1 text-sm text-gray-900">{post.createdAt || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Posted By</label>
            <p className="mt-1 text-sm text-gray-900">{post.postedBy || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">District</label>
            <p className="mt-1 text-sm text-gray-900">{post.selectDistrict || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <p className="mt-1 text-sm text-gray-900">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                post.status === 'accepted' ? 'bg-green-100 text-green-800' :
                post.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {post.status || 'pending'}
              </span>
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Post ID</label>
            <p className="mt-1 text-sm text-gray-900 font-mono">{post._id || 'N/A'}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={onApprove}
            disabled={isDisabled || isLoading}
            className={`inline-flex items-center gap-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition ${
              isDisabled || isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <MdCheckCircle className="text-lg" />
            {isAccepted ? 'Accepted' : 'Accept'}
          </button>
          <button
            onClick={onReject}
            disabled={isDisabled || isLoading}
            className={`inline-flex items-center gap-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition ${
              isDisabled || isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            <MdCancel className="text-lg" />
            {isRejected ? 'Rejected' : 'Reject'}
          </button>
        </div>
      </div>
    </div>
  );
};

const TuitionPostReview = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Function to handle Approval
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/post/${id}/postdata`, { status: 'accepted' });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['alldta']);
      setSelectedPost(null);
    },
  });

  // Function to handle Rejection
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/post/${id}/postdata`, { status: 'rejected' });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['alldta']);
      setSelectedPost(null);
    },
  });

  const handleApprove = (post) => {
    if (window.confirm(`Are you sure you want to APPROVE this post?`)) {
      approveMutation.mutate(post._id);
    }
  };

  const handleReject = (post) => {
    if (window.confirm(`Are you sure you want to REJECT this post?`)) {
      rejectMutation.mutate(post._id);
    }
  };
  
  // Handle view details - open modal
  const handleViewDetails = (post) => {
    setSelectedPost(post);
  };

    const { data: alldata = [] } = useQuery({
        queryKey: ['alldta'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/alldata`);
            return res.data || [];
        },
    });


  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <MdSearch className="text-green-600" /> Pending Tuition Post Review
      </h2>
      <p className="text-gray-600 mb-8">
        Review and approve or reject new tuition posts before they become **visible to tutors** on the platform.
      </p>

      <div className="overflow-x-auto shadow-2xl rounded-xl border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-green-50 border-b border-green-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                Title & Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                <MdDateRange className="inline mr-1" /> Posted Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-green-700 uppercase tracking-wider">
                Budget (Hourly)
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-green-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-green-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {alldata.map((post) => {
              const isAccepted = post.status === 'accepted';
              const isRejected = post.status === 'rejected';
              const isDisabled = isAccepted || isRejected;
              
              return (
                <tr key={post._id} className="hover:bg-green-50 transition duration-150">
                  
                  {/* Title & Subject */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <p className="font-semibold">{post.Medium}</p>
                    <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                      {post.Subject}
                    </span>
                  </td>

                  {/* Student */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {post.postedBy}
                  </td>

                  {/* Posted Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {post.createdAt}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-green-600">
                    ${post.Salary}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      isAccepted ? 'bg-green-100 text-green-800' :
                      isRejected ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status || 'pending'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex justify-center space-x-2">
                      
                      {/* View Details */}
                      <button
                          onClick={() => handleViewDetails(post)}
                          className="p-2 rounded-full text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition"
                          title="View Full Post Details"
                      >
                          <MdVisibility className="text-xl" />
                      </button>
                      
                      {/* Approve Button */}
                      <button
                        onClick={() => handleApprove(post)}
                        disabled={isDisabled || approveMutation.isPending || rejectMutation.isPending}
                        className={`inline-flex items-center gap-1 px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition ${
                          isDisabled || approveMutation.isPending || rejectMutation.isPending
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                        title="Approve Post"
                      >
                        <MdCheckCircle className="text-lg" />
                        {isAccepted ? 'Accepted' : 'Approve'}
                      </button>

                      {/* Reject Button */}
                      <button
                        onClick={() => handleReject(post)}
                        disabled={isDisabled || approveMutation.isPending || rejectMutation.isPending}
                        className={`inline-flex items-center gap-1 px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition ${
                          isDisabled || approveMutation.isPending || rejectMutation.isPending
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-700'
                        }`}
                        title="Reject Post"
                      >
                        <MdCancel className="text-lg" />
                        {isRejected ? 'Rejected' : 'Reject'}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {alldata.length === 0 && (
          <div className="text-center py-10 text-gray-500 bg-white">
            🎉 No new tuition posts require review. The queue is clear!
          </div>
        )}
      </div>

      {/* Modal for post details */}
      {selectedPost && (
        <PostDetailsModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onApprove={() => handleApprove(selectedPost)}
          onReject={() => handleReject(selectedPost)}
          isLoading={approveMutation.isPending || rejectMutation.isPending}
        />
      )}
    </div>
  );
};

export default TuitionPostReview;