// src/components/SimulationLoader.tsx
import React, { useEffect, useRef } from 'react';
import postscribe from 'postscribe';

interface Props {
    path: string;
}

const SimulationLoader: React.FC<Props> = ({ path }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        fetch(path)
            .then(res => res.text())
            .then(html => {
                if (!ref.current) return;
                ref.current.innerHTML = ''; // Clear
                postscribe(ref.current, html, {
                    done: () => {
                        console.log('[SimLoader] Injected and hydrated via postscribe');
                    },
                });
            })
            .catch(err => {
                console.error('[SimLoader] Error loading sim:', err);
                if (ref.current) ref.current.innerHTML = `<p style="color:red;">Failed to load simulation.</p>`;
            });
    }, [path]);

    return (
        <div id="sim-container" ref={ref} style={{ width: '100%', height: '100%' }} />
    );
};

export default SimulationLoader;
