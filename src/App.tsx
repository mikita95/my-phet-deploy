import React, { useEffect, useState } from 'react';
import SimulationLoader from './components/SimulationLoader';
import './app.css';

interface ScenarioConfig {
    sim: string;
    form: string | null;
    redirect?: string;
}

const scenarios: Record<string, ScenarioConfig> = {
    agg: {
        form: 'https://docs.google.com/forms/d/e/1FAIpQLSfXrS_c5MG_qMR41DcnMGG4mBf3uADQAIr-IONgqiRDxBdJTg/viewform?embedded=true',
        sim: '/states-of-matter-basics/'
    },
    gas: {
        form: 'https://docs.google.com/forms/d/e/1FAIpQLSc2UIJpF88ebRojX_tceWbsp8PAgiokJvu-govVeRl3CpBVEw/viewform?embedded=true',
        sim: '/gas-properties/'
    },
    tutorial_agg: {
        sim: '/states-of-matter-basics/',
        form: null,
        redirect: '/?scenario=agg'
    },
    tutorial_gas: {
        sim: '/gas-properties/',
        form: null,
        redirect: '/?scenario=gas'
    }
};

const App = () => {
    const [scenario, setScenario] = useState<string>('tutorial_gas');
    const [config, setConfig] = useState<ScenarioConfig>(scenarios['tutorial_gas']);
    const isTutorial = scenario.startsWith('tutorial_');

    useEffect(() => {
        const s = new URLSearchParams(location.search).get('scenario') || 'tutorial_gas';
        console.log('[App] Selected scenario:', s);
        console.log('[App] Config:', scenarios[s]);
        setScenario(s);
        setConfig(scenarios[s]);
    }, []);


    const handleFinishTutorial = () => {
        if (config.redirect) {
            window.location.href = config.redirect;
        }
    };

    return (
        <div className={`app-container ${isTutorial ? 'tutorial-mode' : ''}`}>
            {!isTutorial && config.form && (
                <div className="left-panel">
                    <iframe
                        title="Google Form"
                        src={config.form}
                        className="form-frame"
                        data-re-aoi-name="Google Form"
                    ></iframe>
                </div>
            )}

            <div className="right-panel">
                {isTutorial && (
                    <div className="tutorial-overlay">
                        <strong>Tutorial Mode</strong>
                        <p>Explore the simulation. When ready, click below.</p>
                        <button onClick={handleFinishTutorial}>Finish Tutorial</button>
                    </div>
                )}
                <SimulationLoader path={config.sim + 'index.html'} />
            </div>
        </div>
    );
};

export default App;
