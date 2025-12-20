/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

export default function ErrorPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-purple-500 to-indigo-500 text-white text-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-lg bg-white text-gray-800 rounded-2xl shadow-2xl p-10 flex flex-col items-center"
            >
                <img
                    src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                    alt="error illustration"
                    className="w-64 mb-6 rounded-lg"
                />
                <h1 className="text-6xl font-extrabold text-purple-700 mb-4">404</h1>
                <h2 className="text-2xl font-bold mb-2">Oops! Page Not Found</h2>
                <p className="text-gray-500 mb-6">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <a
                    href="/"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-md"
                >
                    Go Back Home
                </a>
            </motion.div>

            <p className="mt-8 text-white/70 text-sm">
                Designed by <span className="font-semibold">Raisul Islam Tonmoy</span>
            </p>
        </div>
    );
}
