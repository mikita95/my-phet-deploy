import React, { useEffect } from 'react';

interface Props {
    onFinish: () => void;
}

const TutorialBar: React.FC<Props> = ({ onFinish }) => {
    useEffect(() => {
        const timeout = setTimeout(onFinish, 5 * 60 * 1000); // 5 minutes
        return () => clearTimeout(timeout); // cleanup on unmount
    }, [onFinish]);

    return (
        <div className="tutorial-bar">
            <span>Tutorial Mode – Explore the simulation.</span>
            <button onClick={onFinish}>Finish Tutorial</button>
        </div>
    );
};

export default TutorialBar;
