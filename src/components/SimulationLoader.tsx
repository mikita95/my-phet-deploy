import React, { useEffect, useRef } from 'react';

type Props = {
    path: string;
};

const SimulationLoader: React.FC<Props> = ({ path }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const load = async () => {
            if (!ref.current || !path) return;
            console.log('[SimLoader] Fetching:', path);

            try {
                const res = await fetch(path);
                const html = await res.text();
                ref.current.innerHTML = html;

                ref.current.querySelectorAll('script').forEach((oldScript) => {
                    const newScript = document.createElement('script');
                    Array.from(oldScript.attributes).forEach((attr) =>
                        newScript.setAttribute(attr.name, attr.value)
                    );
                    newScript.text = oldScript.textContent || '';
                    oldScript.replaceWith(newScript);
                });

                console.log('[SimLoader] Sim loaded into DOM.');
            } catch (err) {
                console.error('[SimLoader] Failed to load sim:', err);
            }
        };

        load();
    }, [path]);


    return <div id="sim-container" ref={ref} />;
};

export default SimulationLoader;
