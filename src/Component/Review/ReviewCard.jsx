import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    const { userName, review: testimonial, user_photoURL } = review;
    return (
        <div className="max-w-sm bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:bg-blue-200 dark:hover:bg-gray-700 transition-colors">
            <FaQuoteLeft className="text-purple-600 dark:text-purple-400 text-2xl mb-4" />


            <p className="mb-4 text-gray-700 dark:text-gray-300">
                {testimonial}
            </p>

            <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-4"></div>


            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary overflow-hidden">
                    <img src={user_photoURL} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{userName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Senior Product Designer</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;