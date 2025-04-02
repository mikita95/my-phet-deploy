// src/components/SimulationLoader.tsx
import React, { useEffect, useRef } from 'react';
import postscribe from 'postscribe';

interface Props {
    path: string;
}

const SimulationLoader: React.FC<Props> = ({ path }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !path) return;

        const loadSim = async () => {
            try {
                const res = await fetch(path);
                const html = await res.text();

                // Clear and inject using postscribe
                containerRef.current!.innerHTML = '';
                postscribe(containerRef.current!, html, {
                    done: () => console.log('[SimLoader] Simulation loaded via postscribe'),
                    error: (err) => console.error('[SimLoader] Error loading sim:', err)
                });
            } catch (e) {
                console.error('[SimLoader] Failed to fetch sim HTML:', e);
                containerRef.current!.innerHTML = `<p style="color:red;">Failed to load simulation.</p>`;
            }
        };

        loadSim();
    }, [path]);

    return (
        <div
            id="sim-container"
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            }}
        />
    );
};

export default SimulationLoader;
