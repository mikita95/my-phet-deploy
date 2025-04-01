import React, { useEffect, useRef } from 'react';

interface SimulationLoaderProps {
    html: string;
}

const SimulationLoader: React.FC<SimulationLoaderProps> = ({ html }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !html) return;

        // Clear previous content
        container.innerHTML = '';

        // Create a new div to inject HTML safely
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Extract scripts for re-execution
        const scripts = tempDiv.querySelectorAll('script');
        scripts.forEach(script => script.remove());

        // Append non-script content
        Array.from(tempDiv.childNodes).forEach(node => container.appendChild(node.cloneNode(true)));

        // Re-append and execute each script
        scripts.forEach(originalScript => {
            const newScript = document.createElement('script');
            // Copy all attributes (type, src, etc.)
            Array.from(originalScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });
            // Copy inline script content
            if (originalScript.textContent) {
                newScript.textContent = originalScript.textContent;
            }
            container.appendChild(newScript);
        });
    }, [html]);

    return <div id="sim-container" ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default SimulationLoader;
