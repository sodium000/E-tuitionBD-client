import React, { useState } from 'react';
// Import necessary icons from react-icons
// You might need to install this: npm install react-icons
import { 
  MdCheckCircle, 
  MdCancel, 
  MdSearch, 
  MdVisibility, 
  MdDateRange 
} from 'react-icons/md';

// --- 1. Mock Data ---
const initialPendingPosts = [
  {
    id: 501,
    title: 'Urgent: Calculus 3 Prep for Final',
    student: 'Fiona Grant',
    postedDate: '2025-12-10',
    subject: 'Mathematics',
    budget: 35, // hourly rate
    status: 'Pending Review',
  },
  {
    id: 502,
    title: 'Help with Essay on Shakespeare',
    student: 'George Harrison',
    postedDate: '2025-12-08',
    subject: 'English Literature',
    budget: 25,
    status: 'Pending Review',
  },
  {
    id: 503,
    title: 'Introduction to C++ Programming',
    student: 'Hannah Abbott',
    postedDate: '2025-12-11',
    subject: 'Computer Science',
    budget: 40,
    status: 'Pending Review',
  },
];

// --- 2. Main Component ---
const TuitionPostReview = () => {
  const [posts, setPosts] = useState(initialPendingPosts);

  // Function to handle Approval
  const handleApprove = (id) => {
    if (window.confirm(`Are you sure you want to APPROVE post ID: ${id}?`)) {
      // API call to approve the post (make it visible to tutors)
      setPosts(posts.filter(post => post.id !== id));
      alert(`Post ID: ${id} approved and is now live.`);
    }
  };

  // Function to handle Rejection
  const handleReject = (id) => {
    if (window.confirm(`Are you sure you want to REJECT post ID: ${id}?`)) {
      // API call to reject the post (delete or mark as rejected)
      setPosts(posts.filter(post => post.id !== id));
      alert(`Post ID: ${id} rejected and removed.`);
    }
  };
  
  // Placeholder to view full details of the post
  const handleViewDetails = (id) => {
      alert(`Viewing full details for Post ID: ${id}`);
      // In a real app, this would open a modal showing the full description, schedule, etc.
  };

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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-green-50 transition duration-150">
                
                {/* Title & Subject */}
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  <p className="font-semibold">{post.title}</p>
                  <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                    {post.subject}
                  </span>
                </td>

                {/* Student */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {post.student}
                </td>

                {/* Posted Date */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {post.postedDate}
                </td>

                {/* Budget */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-green-600">
                  ${post.budget.toFixed(2)}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex justify-center space-x-2">
                    
                    {/* View Details */}
                    <button
                        onClick={() => handleViewDetails(post.id)}
                        className="p-2 rounded-full text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition"
                        title="View Full Post Details"
                    >
                        <MdVisibility className="text-xl" />
                    </button>
                    
                    {/* Approve Button */}
                    <button
                      onClick={() => handleApprove(post.id)}
                      className="inline-flex items-center gap-1 px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition"
                      title="Approve Post"
                    >
                      <MdCheckCircle className="text-lg" />
                      Approve
                    </button>

                    {/* Reject Button */}
                    <button
                      onClick={() => handleReject(post.id)}
                      className="inline-flex items-center gap-1 px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition"
                      title="Reject Post"
                    >
                      <MdCancel className="text-lg" />
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div className="text-center py-10 text-gray-500 bg-white">
            🎉 No new tuition posts require review. The queue is clear!
          </div>
        )}
      </div>
    </div>
  );
};

export default TuitionPostReview;