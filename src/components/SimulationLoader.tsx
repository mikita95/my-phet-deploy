// src/SimulationLoader.tsx

import React, { useEffect, useRef } from 'react';

interface SimulationLoaderProps {
    path: string; // simulation HTML path
}

const SimulationLoader: React.FC<SimulationLoaderProps> = ({ path }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!path || !wrapperRef.current) return;

        const container = wrapperRef.current;

        const loadSimulation = async () => {
            try {
                console.log('[SimulationLoader] Fetching simulation:', path);

                const response = await fetch(path);
                const rawHtml = await response.text();

                // Create a DOM fragment for safe parsing
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = rawHtml;

                // Strip outer <html>, <head>, <body> if present
                const mainContent = tempDiv.querySelector('body') || tempDiv;

                // Inject HTML
                container.innerHTML = mainContent.innerHTML;

                // Re-execute all script tags
                const scripts = container.querySelectorAll('script');

                scripts.forEach((script) => {
                    const newScript = document.createElement('script');
                    [...script.attributes].forEach(attr => {
                        newScript.setAttribute(attr.name, attr.value);
                    });
                    newScript.textContent = script.textContent;
                    script.replaceWith(newScript);
                });

                console.log('[SimulationLoader] Simulation loaded successfully');
            } catch (error) {
                console.error('[SimulationLoader] Error loading simulation:', error);
                container.innerHTML = `<p style="color:red;">Failed to load simulation.</p>`;
            }
        };

        loadSimulation();
    }, [path]);

    return (
        <div
            id="sim-loader-container"
            ref={wrapperRef}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            }}
        />
    );
};

export default SimulationLoader;
