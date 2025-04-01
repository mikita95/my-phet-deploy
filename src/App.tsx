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
        form: 'https://docs.google.com/forms/d/e/1FAIpQLSfXrS_c5MG_qMR41DcnMGG4mBf3uADQAIr-IONgqiRDxBdJTg/viewform?embedded=true',
    },
    gas: {
        sim: '/gas-properties/',
        form: 'https://docs.google.com/forms/d/e/1FAIpQLSc2UIJpF88ebRojX_tceWbsp8PAgiokJvu-govVeRl3CpBVEw/viewform?embedded=true',
    },
    tutorial_agg: {
        sim: '/states-of-matter-basics/',
        form: null,
        redirect: '/?scenario=agg',
        locale: 'de',
    },
    tutorial_gas: {
        sim: '/gas-properties/',
        form: null,
        redirect: '/?scenario=gas',
        locale: 'de',
    }
};

const App: React.FC = () => {
    const [scenario, setScenario] = useState<string>('tutorial_gas');
    const [config, setConfig] = useState<ScenarioConfig | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const s = params.get('scenario') || 'tutorial_gas';
        const selectedConfig = scenarios[s] || scenarios.tutorial_gas;

        console.log('[App] Selected scenario:', s);
        console.log('[App] Config:', selectedConfig);

        setScenario(s);
        setConfig(selectedConfig);

        // Auto-end test on unload or tab hidden
        const endTest = () => {
            window.opener?.postMessage('re-test-end-without-interaction', '*');
            console.log('[App] Test end triggered');
        };

        window.addEventListener('beforeunload', endTest);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') endTest();
        });

        // Auto redirect after 5 mins in tutorial
        if (s.startsWith('tutorial_') && selectedConfig.redirect) {
            const timeout = setTimeout(() => {
                console.log('[App] Redirecting after tutorial timeout');
                window.location.href = selectedConfig.redirect!;
            }, 5 * 60 * 1000);
            return () => clearTimeout(timeout);
        }

        return () => {
            window.removeEventListener('beforeunload', endTest);
        };
    }, []);

    const handleFinishTutorial = () => {
        console.log('[App] Finish Tutorial → Redirect');
        if (config?.redirect) {
            window.location.href = config.redirect;
        }
    };

    if (!config) return <p>Loading...</p>;

    const simPath = `${config.sim}index.html${config.locale ? `?locale=${config.locale}` : ''}`;
    const isTutorial = !config.form;

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

            <div className={`container ${isTutorial ? 'full-width' : ''}`}>
                {!isTutorial && (
                    <div className="left-panel">
                        <iframe src={config.form!} title="Google Form" />
                    </div>
                )}
                <div className="right-panel">
                    <SimulationLoader path={simPath} />

                    {isTutorial && (
                        <div id="tutorialInfo">
                            <strong>Tutorial Mode</strong> – Explore the simulation.
                            <br />
                            <button id="finishTutorialButton" onClick={handleFinishTutorial}>
                                Finish Tutorial
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
