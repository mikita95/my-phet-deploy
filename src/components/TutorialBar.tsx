import React, {useEffect, useState} from 'react';

interface Props {
    onFinish: () => void;
}

const TutorialBar: React.FC<Props> = ({onFinish}) => {
    const totalDurationMs = 5 * 60 * 1000; // 5 minutes
    const [timeLeft, setTimeLeft] = useState(totalDurationMs);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1000) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1000;
            });
        }, 1000);

        const timeout = setTimeout(onFinish, totalDurationMs);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [onFinish]);

    const formatTime = (ms: number): string => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div style={styles.bar}>
            <span style={styles.text}>Tutorial Mode – Explore the simulation.</span>
            <div style={styles.controls}>
                <span style={styles.timer}>{formatTime(timeLeft)}</span>
                <button style={styles.button} onClick={onFinish}>
                    Finish Tutorial
                </button>
            </div>
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
    controls: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    timer: {
        fontSize: '14px',
        color: '#555',
        fontWeight: 'bold',
        fontVariantNumeric: 'tabular-nums' as const,
    },
    button: {
        backgroundColor: '#1890ff',
        color: '#fff',
        fontSize: '14px',
    }
}

// Optional: add hover effect via native CSS (if not using CSS-in-JS)
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
    button:hover {
        background-color: #40a9ff !important;
    }
`;
document.head.appendChild(styleSheet);

export default TutorialBar;
