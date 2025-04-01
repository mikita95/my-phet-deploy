import React, { useEffect, useState } from 'react';
import './app.css';
import SimulationLoader from './components/SimulationLoader';

const scenarios: Record<string, string> = {
    gas: '/gas-properties/index.html',
    tutorial_gas: '/gas-properties/index.html'
};

const App = () => {
    const [scenario, setScenario] = useState('tutorial_gas');
    const [isTutorial, setIsTutorial] = useState(false);

    useEffect(() => {
        const p = new URLSearchParams(window.location.search);
        const s = p.get('scenario') || 'tutorial_gas';
        setScenario(s);
        setIsTutorial(s.startsWith('tutorial_'));
    }, []);

    const handleFinishTutorial = () => {
        window.location.href = '/?scenario=gas';
    };

    return (
        <div>
            {isTutorial && (
                <div className="tutorial-overlay">
                    <strong>Tutorial Mode</strong>
                    <p>Explore the simulation, then click when ready.</p>
                    <button onClick={handleFinishTutorial}>Finish Tutorial</button>
                </div>
            )}
            <SimulationLoader path={scenarios[scenario] || scenarios['tutorial_gas']!} />
        </div>
    );
};

export default App;
