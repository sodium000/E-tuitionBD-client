import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdEdit, MdClose, MdAccountCircle, MdEmail, MdPerson } from 'react-icons/md';


const initialUserData = {
    name: 'Ahmed Kabir',
    email: 'ahmed.kabir@example.com',
    phone: '+880 17XX XXX 789',
    address: 'Dhaka, Bangladesh',
    bio: 'Dedicated tutor focused on student success.',
    profilePicUrl: 'https://via.placeholder.com/150/007bff/ffffff?text=AK', // Placeholder image URL
};


const EditProfileModal = ({ userData, onClose, onSave }) => {
    // Initialize React Hook Form with the current user data
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: userData,
    });

    const onSubmit = (data) => {
        onSave(data);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h3 className="text-2xl font-bold text-gray-800">Update Profile Details</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 transition duration-150"
                    >
                        <MdClose className="text-3xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center mb-1"><MdPerson className="mr-1" /> Full Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>


                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center mb-1"><MdEmail className="mr-1" /> Email Address</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email format"
                                }
                            })}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center mb-1">Phone Number</label>
                        <input
                            {...register("phone")}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5"
                        />
                    </div>


                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center mb-1">Address</label>
                        <input
                            {...register("address")}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5"
                        />
                    </div>


                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center mb-1">Bio</label>
                        <textarea
                            {...register("bio")}
                            rows="3"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150 mt-6 shadow-md"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};


const ProfileSection = () => {
    const [userData, setUserData] = useState(initialUserData);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = (updatedData) => {
        setUserData(updatedData);
        setIsModalOpen(false); // Close modal
        alert('Profile updated successfully!');
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-start">

            {/* Profile Card */}
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-200">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-3xl font-extrabold text-gray-900">My Profile</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                    >
                        <MdEdit className="mr-2 h-5 w-5" />
                        Update Details
                    </button>
                </div>

                <div className="flex flex-col items-center border-b pb-6 mb-6">

                    <div className="relative">

                        <img
                            className="h-24 w-24 rounded-full object-cover ring-4 ring-indigo-500 ring-offset-2 shadow-lg"
                            src={userData.profilePicUrl}
                            alt="User Profile"
                        />
                    </div>

                    <h3 className="mt-4 text-2xl font-bold text-gray-900 flex items-center">
                        <MdPerson className="mr-2 text-indigo-600" />
                        {userData.name}
                    </h3>
                    <p className="text-lg text-gray-500 flex items-center mt-1">
                        <MdEmail className="mr-1 text-gray-400" />
                        {userData.email}
                    </p>
                </div>


                <div className="space-y-4">
                    <DetailBlock icon={<MdAccountCircle />} label="Phone" value={userData.phone} />
                    <DetailBlock icon={<MdAccountCircle />} label="Address" value={userData.address} />
                    <DetailBlock icon={<MdAccountCircle />} label="Bio" value={userData.bio} />
                </div>
            </div>


            {isModalOpen && (
                <EditProfileModal
                    userData={userData}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

const DetailBlock = ({ icon, label, value }) => (
    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
        <div className="text-indigo-600 mr-3 mt-1">{icon}</div>
        <div>
            <p className="text-xs font-medium text-gray-500 uppercase">{label}</p>
            <p className="text-sm font-semibold text-gray-800">{value}</p>
        </div>
    </div>
);

export default ProfileSection;