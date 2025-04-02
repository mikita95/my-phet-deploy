import React from 'react';
import ShadowPortal from './ShadowPortal';

const TutorialBar: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
    return (
        <ShadowPortal>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                background: '#f0f0f0',
                padding: '10px 20px',
                zIndex: 999999,
                fontFamily: 'sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
                <strong>Tutorial Mode</strong>
                <button
                    onClick={() => {
                        console.log('[TutorialBar] Finish clicked');
                        onFinish();
                    }}
                    style={{
                        padding: '6px 12px',
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer'
                    }}
                >
                    Finish Tutorial
                </button>
            </div>
        </ShadowPortal>
    );
};

export default TutorialBar;
