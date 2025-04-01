import React, { useEffect, useState } from 'react';
import SimulationLoader from './components/SimulationLoader';

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
    const [config, setConfig] = useState<ScenarioConfig | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const scenario = params.get('scenario') || 'tutorial_gas';
        const selected = scenarios[scenario] || scenarios['tutorial_gas'];
        setConfig(selected);

        if (scenario.startsWith('tutorial_') && selected.redirect) {
            setTimeout(() => {
                window.location.href = selected.redirect!;
            }, 5 * 60 * 1000);
        }
    }, []);

    const handleFinish = () => {
        if (config?.redirect) {
            window.location.href = config.redirect;
        }
    };

    if (!config) return <p>Loading...</p>;

    const simPath = `${config.sim}index.html${config.locale ? `?locale=${config.locale}` : ''}`;

    return (
        <div className="app">
            <div className="toolbar">
                <button onClick={() => document.documentElement.requestFullscreen()}>Full Screen</button>
                <button onClick={() => window.opener?.postMessage('re-test-end-without-interaction', '*')}>End Test</button>
            </div>

            {config.form && (
                <div className="form-panel">
                    <iframe src={config.form} title="Google Form" />
                </div>
            )}

            {!config.form && (
                <div className="tutorial-info">
                    <strong>Tutorial Mode</strong> – Explore the simulation.
                    <br />
                    <button onClick={handleFinish}>Finish Tutorial</button>
                </div>
            )}

            <SimulationLoader path={simPath} />
        </div>
    );
};

export default App;
