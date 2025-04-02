import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const ShadowPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const hostRef = useRef<HTMLDivElement | null>(null);
    const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

    useEffect(() => {
        const host = document.createElement('div');
        document.body.appendChild(host);
        const shadow = host.attachShadow({ mode: 'open' });
        setShadowRoot(shadow);
        hostRef.current = host;

        return () => {
            host.remove();
        };
    }, []);

    return shadowRoot ? createPortal(children, shadowRoot) : null;
};

export default ShadowPortal;
