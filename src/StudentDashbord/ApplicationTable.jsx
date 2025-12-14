import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const initialApplications = [
  {
    id: 'A001',
    name: 'Aisha Rahman',
    photo: 'https://i.pravatar.cc/100?img=1',
    qualifications: 'BSc in Mathematics',
    experience: '3 Years',
    salary: 'BDT 10,000 / Month',
    status: 'Pending',
  },
  {
    id: 'A002',
    name: 'Karim Ahmed',
    photo: 'https://i.pravatar.cc/100?img=2',
    qualifications: 'BA in English',
    experience: '2 Years',
    salary: 'BDT 8,500 / Month',
    status: 'Pending',
  },
  {
    id: 'A003',
    name: 'Nadia Khan',
    photo: 'https://i.pravatar.cc/100?img=3',
    qualifications: 'MSc in Physics',
    experience: '5 Years',
    salary: 'BDT 12,000 / Month',
    status: 'Accepted',
  },
];

const ApplicationTable = () => {
  const [applications, setApplications] = useState(initialApplications);

  const updateStatus = (id, status) => {
    setApplications(apps =>
      apps.map(app =>
        app.id === id ? { ...app, status } : app
      )
    );
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
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
              <tr key={app.id} className="hover:bg-gray-50">
                {/* Tutor Info */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={app.photo}
                    alt={app.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{app.name}</span>
                </td>

                <td className="px-6 py-4">{app.qualifications}</td>
                <td className="px-6 py-4">{app.experience}</td>
                <td className="px-6 py-4">{app.salary}</td>

                {/* Actions */}
                <td className="px-6 py-4 space-x-2">
                  {app.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(app.id, 'Accepted')}
                        className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        <FaCheckCircle className="mr-1" /> Accept
                      </button>

                      <button
                        onClick={() => updateStatus(app.id, 'Rejected')}
                        className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <FaTimesCircle className="mr-1" /> Reject
                      </button>
                    </>
                  )}

                  {app.status !== 'Pending' && (
                    <span className="text-gray-500 text-sm">
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