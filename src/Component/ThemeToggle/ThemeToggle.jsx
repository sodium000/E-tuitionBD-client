import React from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import useTheme from '../../hook/useTheme';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle relative overflow-hidden"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <div className="relative w-6 h-6 flex items-center justify-center">
                <MdLightMode
                    className={`absolute w-5 h-5 text-yellow-500 transition-all duration-300 ${
                        theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
                    }`}
                />
                <MdDarkMode
                    className={`absolute w-5 h-5 text-gray-700 dark:text-gray-300 transition-all duration-300 ${
                        theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                    }`}
                />
            </div>
        </button>
    );
};

export default ThemeToggle;

