import React, { useEffect } from 'react';
import './app.css'

interface Props {
    onFinish: () => void;
}

const TutorialBar: React.FC<Props> = ({ onFinish }) => {
    useEffect(() => {
        const timeout = setTimeout(onFinish, 5 * 60 * 1000); // 5 minutes
        return () => clearTimeout(timeout); // cleanup on unmount
    }, [onFinish]);

    return (
        <div className="tutorial-bar flex items-center justify-between px-4 py-2 bg-yellow-100 border-b border-yellow-300 shadow-md">
            <span className="text-gray-800 font-medium">Tutorial Mode – Explore the simulation.</span>
            <button
                onClick={onFinish}
                className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
                Finish Tutorial
            </button>
        </div>
    );
};

export default TutorialBar;
