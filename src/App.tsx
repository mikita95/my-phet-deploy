import React, { useEffect, useState } from 'react';
import SimulationLoader from './components/SimulationLoader';
import './app.css';

export interface ScenarioConfig {
    sim: string;
    form: string | null;
    redirect?: string;
    locale?: string;
}

export const scenarios: Record<string, ScenarioConfig> = {
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
    const initialScenario = new URLSearchParams(window.location.search).get('scenario') || 'tutorial_gas';
    const [scenario] = useState<string>(initialScenario);
    const config = scenarios[scenario] || scenarios['tutorial_gas'];

    useEffect(() => {
        console.log('[App] Selected scenario:', scenario);
        console.log('[App] Config:', config);

        if (scenario.startsWith('tutorial_') && config.redirect) {
            setTimeout(() => {
                console.log('[App] Auto redirect after tutorial timeout');
                window.location.href = config.redirect!;
            }, 5 * 60 * 1000);
        }
    }, [scenario]);

    const handleFinishTutorial = () => {
        console.log('[App] Manual tutorial finish clicked');
        if (config.redirect) {
            window.location.href = config.redirect;
        }
    };

    const simPath = `${config.sim}index.html${config.locale ? `?locale=${config.locale}` : ''}`;
    const isTutorial = scenario.startsWith('tutorial_');

    return (
        <div className={`app ${isTutorial ? 'tutorial-mode' : ''}`}>
            <div className="toolbar">
                <button onClick={() => document.documentElement.requestFullscreen()}>
                    Full Screen
                </button>
                <button onClick={() => window.opener?.postMessage('re-test-end-without-interaction', '*')}>
                    End Test
                </button>
            </div>

            {isTutorial && (
                <div className="tutorial-bar" data-re-aoi-name="Tutorial Info">
                    <strong>Tutorial Mode</strong> — Explore the simulation.
                    <button onClick={handleFinishTutorial}>Finish Tutorial</button>
                </div>
            )}

            {config.form ? (
                <div className="container">
                    <div className="left-panel">
                        <iframe src={config.form} title="Google Form" className="form-frame" />
                    </div>
                    <div className="right-panel">
                        <SimulationLoader path={simPath} />
                    </div>
                </div>
            ) : (
                <div className="container full-width">
                    <div className="right-panel">
                        <SimulationLoader path={simPath} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
