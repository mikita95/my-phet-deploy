import React, { useEffect, useRef } from 'react';

interface SimulationLoaderProps {
    path: string;
}

const SimulationLoader: React.FC<SimulationLoaderProps> = ({ path }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!path || !wrapperRef.current) return;

        const load = async () => {
            try {
                const res = await fetch(path);
                const html = await res.text();

                const temp = document.createElement('div');
                temp.innerHTML = html;

                const simHtml = temp.querySelector('body') || temp;

                wrapperRef.current!.innerHTML = simHtml.innerHTML;

                wrapperRef.current!.querySelectorAll('script').forEach((script) => {
                    const newScript = document.createElement('script');
                    [...script.attributes].forEach(attr =>
                        newScript.setAttribute(attr.name, attr.value)
                    );
                    newScript.textContent = script.textContent;
                    script.replaceWith(newScript);
                });

                console.log('[SimLoader] Injected and rehydrated scripts');
            } catch (err) {
                console.error('[SimLoader] Failed to load:', err);
            }
        };

        load();
    }, [path]);

    return <div id="sim-wrapper" ref={wrapperRef} style={{ width: '100%', height: '100%' }} />;
};

export default SimulationLoader;
