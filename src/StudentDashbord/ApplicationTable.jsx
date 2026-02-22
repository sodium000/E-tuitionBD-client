/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import useAxiosSecure from '../hook/useAxiosSecure';
import useAuth from '../hook/useAuth';

const ApplicationTable = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();


  const { data: posts = [], } = useQuery({
    queryKey: ['posts', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/post/${user?.email}/getpost`);
      return res.data || [];
    },
  });

  const { data: applications = [], refetch } = useQuery({
    queryKey: ['applications', posts.map(p => p._id)],
    enabled: posts.length > 0,
    queryFn: async () => {
      const responses = await Promise.all(
        posts.map(post => axiosSecure.get(`/post/${post._id}/apply`))
      )
      const all = responses.flatMap(res => res.data || []);
      return all;
    },
  });


  const updateStatus = async (id, status) => {
    // const response = await axiosSecure.patch(`/post/${id}/update`, { status });
    const newArray = applications.filter(item => item._id === id);
    const pay = newArray.map( async (data) => {
      const paymentInfo = {
        TutorName: data.TutorName,
        TutorEmail: data.TutorEmail,
        TutorFee: data.expectedSalary,
        PostORTutorId: data.postId,
        StudentEmail: user.email,
        StudentName: user.displayName
      }
      const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
      
      window.location.assign(res.data.url);
    })
    refetch();

  };

  const updateReject = async (id, status) => {
    const res = await axiosSecure.patch(`/post/${id}/update`, { status });
    refetch();

  };


  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen overflow-x-hidden">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Tutor Applications
      </h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Tutor</th>
              <th className="px-6 py-3 text-left">Qualifications</th>
              <th className="px-6 py-3 text-left">Experience</th>
              <th className="px-6 py-3 text-left">Expected Salary</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {applications.map(app => (
              <tr key={app._id} className="hover:bg-gray-50">
                {/* Tutor Info */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <span className="font-medium">{app.TutorName}</span>
                </td>

                <td className="px-6 py-4">{app.qualifications}</td>
                <td className="px-6 py-4">{app.experience}</td>
                <td className="px-6 py-4">{app.expectedSalary}</td>

                {/* Actions */}
                <td className="px-6 py-4 space-x-2">
                  {app.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(app._id, 'Accepted')}
                        className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        <FaCheckCircle className="mr-1" /> Accept
                      </button>

                      <button
                        onClick={() => updateReject(app._id, 'Rejected')}
                        className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <FaTimesCircle className="mr-1" /> Reject
                      </button>
                    </>
                  )}

                  {app.status !== 'Pending' && (
                    <span className="text-gray-500  text-sm">
                      {app.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationTable;