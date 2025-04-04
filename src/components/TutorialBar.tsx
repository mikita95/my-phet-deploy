import React, { useEffect } from 'react';

interface Props {
    onFinish: () => void;
}

const TutorialBar: React.FC<Props> = ({ onFinish }) => {
    useEffect(() => {
        const timeout = setTimeout(onFinish, 5 * 60 * 1000); // 5 minutes
        return () => clearTimeout(timeout); // cleanup on unmount
    }, [onFinish]);

    return (
        <div style={styles.bar}>
            <span style={styles.text}>Tutorial Mode – Explore the simulation.</span>
            <button style={styles.button} onClick={onFinish}>
                Finish Tutorial
            </button>
        </div>
    );
};

const styles = {
    bar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: '#fffbe6',
        borderBottom: '1px solid #ffe58f',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontFamily: 'sans-serif',
    },
    text: {
        fontSize: '16px',
        color: '#333',
    },
    button: {
        backgroundColor: '#1890ff',
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

// Optional: add hover effect via native CSS (if not using CSS-in-JS)
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
    button:hover {
        background-color: #40a9ff !important;
    }
`;
document.head.appendChild(styleSheet);

export default TutorialBar;
