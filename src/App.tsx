import React, { useEffect, useState } from 'react';
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
                <div style={styles.overlay}>
                    <div>
                        <strong>Tutorial Mode</strong>
                        <br />
                        <button onClick={handleFinishTutorial} style={styles.button}>
                            Finish Tutorial
                        </button>
                    </div>
                </div>
            )}
            <SimulationLoader path={scenarios[scenario] || scenarios['tutorial_gas']!} />
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed' as const,
        top: '20px',
        left: '20px',
        zIndex: 999,
        background: '#fff',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        marginTop: '8px',
        padding: '6px 12px',
        fontSize: '14px',
    },
};

export default App;
