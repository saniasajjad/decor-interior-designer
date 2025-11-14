import React from 'react';

const Loader: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-500"></div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8">Generating Your Designs...</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">{message}</p>
    </div>
);

export default Loader;
