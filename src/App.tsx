import React, { useEffect, useState } from 'react';
import { scenarios, ScenarioConfig } from './utils/scenarioConfig';
import SimulationLoader from './components/SimulationLoader';
import GoogleForm from './components/GoogleForm';
import TutorialOverlay from './components/TutorialOverlay';

const App: React.FC = () => {
    const params = new URLSearchParams(window.location.search);
    const scenarioKey = params.get('scenario') || 'tutorial_agg';
    const config: ScenarioConfig = scenarios[scenarioKey] || scenarios.tutorial_agg;
    const [html, setHtml] = useState<string>('');

    useEffect(() => {
        fetch(`${config.sim}index.html`)
            .then(res => res.text())
            .then(htmlText => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlText, 'text/html');
                const bodyContent = doc.body.innerHTML;
                setHtml(bodyContent);
            })
            .catch(e => {
                setHtml(`<p style="color:red">Failed to load simulation: ${e.message}</p>`);
            });
    }, [config.sim]);

    const finishTutorial = () => {
        if (window.opener) window.opener.postMessage('re-test-end-without-interaction', '*');
        window.location.href = config.redirect || '/';
    };

    return (
        <div className={`app-container ${config.form ? '' : 'full-sim'}`}>
            {config.form && <GoogleForm src={config.form} />}
            <SimulationLoader html={html} />
            {scenarioKey.startsWith('tutorial') && <TutorialOverlay onFinish={finishTutorial} />}
        </div>
    );
};

export default App;
