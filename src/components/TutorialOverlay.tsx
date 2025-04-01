import React, { useEffect } from 'react';

const TutorialOverlay: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
    useEffect(() => {
        const timeout = setTimeout(() => onFinish(), 5 * 60 * 1000);
        return () => clearTimeout(timeout);
    }, [onFinish]);

    return (
        <div className="tutorial-overlay">
            <strong>Tutorial Mode</strong> — Explore the simulation.
            <br />
            <button onClick={onFinish}>Finish Tutorial</button>
        </div>
    );
};

export default TutorialOverlay;
