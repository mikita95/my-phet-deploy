import React, {useEffect, useState} from 'react';
import SimulationLoader from './components/SimulationLoader';
import './app.css';
import TutorialBar from "./components/TutorialBar";

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

        setScenario(s);
        setConfig(selectedConfig);

        if (s.startsWith('tutorial_') && selectedConfig.redirect) {
            setTimeout(() => {
                window.location.href = selectedConfig.redirect!;
            }, 5 * 60 * 1000);
        }
    }, []);

    const handleFinishTutorial = () => {
        console.log('[App] Tutorial finished, redirecting');
        if (config?.redirect) {
            window.location.href = config.redirect;
        }
    };

    if (!config) return <p>Loading...</p>;

    const simPath = `${config.sim}index.html${config.locale ? `?locale=${config.locale}` : ''}`;

    return (
        <div className="app">
            {scenario.startsWith('tutorial_') && <TutorialBar onFinish={handleFinishTutorial}/>}

            <div className="toolbar">
                <button onClick={() => document.documentElement.requestFullscreen()}>Full Screen</button>
                <button onClick={() => window.opener?.postMessage('re-test-end-without-interaction', '*')}>
                    End Test
                </button>
            </div>

            <div className="app-container">
                {config.form && (
                    <div className="left-panel">
                        <iframe className="form-frame" src={config.form} title="Google Form"/>
                    </div>
                )}
                <div className="right-panel">
                    <SimulationLoader path={simPath}/>
                </div>
            </div>
        </div>
    );
};

export default App;
