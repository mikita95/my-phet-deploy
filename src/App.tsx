import React, { useEffect, useState } from 'react';
import SimulationLoader from './components/SimulationLoader';
import './app.css';

export interface ScenarioConfig {
    sim: string;
    form: string | null;
    redirect?: string;
    locale?: string;
}

const scenarios: Record<string, ScenarioConfig> = {
    agg: {
        sim: '/states-of-matter-basics/',
        form: 'https://docs.google.com/forms/d/e/1FAIpQLSfXrS_c5MG_qMR41DcnMGG4mBf3uADQAIr-IONgqiRDxBdJTg/viewform?embedded=true'
    },
    gas: {
        sim: '/gas-properties/',
        form: 'https://docs.google.com/forms/d/e/1FAIpQLSc2UIJpF88ebRojX_tceWbsp8PAgiokJvu-govVeRl3CpBVEw/viewform?embedded=true'
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

const App: React.FC = () => {
    const [scenario, setScenario] = useState<string>('tutorial_gas');
    const [config, setConfig] = useState<ScenarioConfig | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const s = params.get('scenario') || 'tutorial_gas';
        const selectedConfig = scenarios[s] || scenarios['tutorial_gas'];

        console.log('[App] Selected scenario:', s);
        console.log('[App] Config:', selectedConfig);

        setScenario(s);
        setConfig(selectedConfig);

        // Auto redirect after 5 mins (only in tutorial mode)
        if (s.startsWith('tutorial_') && selectedConfig.redirect) {
            setTimeout(() => {
                console.log('[App] Auto redirecting after tutorial timeout...');
                window.location.href = selectedConfig.redirect!;
            }, 5 * 60 * 1000);
        }
    }, []);

    const handleFinishTutorial = () => {
        console.log('[App] Finish tutorial clicked');
        if (config?.redirect) {
            console.log('[App] Redirecting to', config.redirect);
            window.location.href = config.redirect;
        } else {
            console.warn('[App] No redirect set in config');
        }
    };

    if (!config) return <p>Loading config...</p>;

    const simPath = `${config.sim}index.html${config.locale ? `?locale=${config.locale}` : ''}`;

    return (
        <div className={`app ${!config.form ? 'tutorial-mode' : ''}`}>
            <div className="toolbar">
                <button onClick={() => document.documentElement.requestFullscreen()}>Full Screen</button>
                <button onClick={() => window.opener?.postMessage('re-test-end-without-interaction', '*')}>End Test</button>
            </div>

            {config.form ? (
                <div className="container">
                    <div className="left-panel">
                        <iframe src={config.form} title="Google Form" />
                    </div>
                    <div className="right-panel">
                        <SimulationLoader path={simPath} />
                    </div>
                </div>
            ) : (
                <div className="container full-width">
                    <div className="right-panel">
                        <div className="tutorial-overlay" id="tutorialInfo">
                            <strong>Tutorial Mode</strong> – Explore the simulation.
                            <br />
                            <button onClick={handleFinishTutorial}>Finish Tutorial</button>
                        </div>
                        <SimulationLoader path={simPath} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
