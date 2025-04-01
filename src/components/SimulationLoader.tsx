import React, { useEffect, useRef } from 'react';

type Props = {
    path: string;
};

const SimulationLoader: React.FC<Props> = ({ path }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const load = async () => {
            if (!ref.current) return;

            const res = await fetch(path);
            const html = await res.text();

            ref.current.innerHTML = html;

            const scripts = ref.current.querySelectorAll('script');
            scripts.forEach((script) => {
                const newScript = document.createElement('script');
                Array.from(script.attributes).forEach((attr) =>
                    newScript.setAttribute(attr.name, attr.value)
                );
                newScript.text = script.textContent || '';
                script.replaceWith(newScript);
            });
        };

        load();
    }, [path]);

    return <div id="sim-container" ref={ref} />;
};

export default SimulationLoader;
