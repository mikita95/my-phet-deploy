import React, { useEffect, useState } from 'react';
import TutorialBar from './components/TutorialBar';

interface Scenario {
    sim: string;
    form: string | null;
    redirect?: string;
    realeyeTest?: string;
}

const scenarios: Record<string, Scenario> = {
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
        redirect: 'https://app.realeye.io/test/fcbfae10-27e6-4a17-b17c-0fa23d5ee6be/run'
    },
    tutorial_gas: {
        sim: '/gas-properties/',
        form: null,
        redirect: 'https://app.realeye.io/test/74d1b04c-53d9-4883-9019-35941a398926/run'
    }
};

const App: React.FC = () => {
    const [scenarioKey, setScenarioKey] = useState('tutorial_gas');
    const [config, setConfig] = useState<Scenario | null>(null);

    useEffect(() => {
        const s = new URLSearchParams(window.location.search).get('scenario') || 'tutorial_gas';
        setScenarioKey(s);
        setConfig(scenarios[s] || scenarios['tutorial_gas']);
    }, []);

    if (!config) return <div>Loading...</div>;

    const handleTutorialFinish = () => {
        if (config.redirect) {
            window.location.href = config.redirect;
        }
    };

    return (
        <div className="app">
            {scenarioKey.startsWith('tutorial_') && (
                <TutorialBar onFinish={handleTutorialFinish} />
            )}
            <div className="container">
                {config.form && (
                    <div className="left-panel">
                        <iframe className="form-frame" src={config.form} />
                    </div>
                )}
                <div className="right-panel">
                    <object data={`${config.sim}index.html`} type="text/html" className="sim-object" />
                </div>
            </div>
        </div>
    );
};

export default App;
