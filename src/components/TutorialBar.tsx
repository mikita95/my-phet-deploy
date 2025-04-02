import React from 'react';

interface Props {
    onFinish: () => void;
}

const TutorialBar: React.FC<Props> = ({ onFinish }) => {
    return (
        <div className="tutorial-bar">
            <span>Tutorial Mode – Explore the simulation.</span>
            <button onClick={onFinish}>Finish Tutorial</button>
        </div>
    );
};

export default TutorialBar;
