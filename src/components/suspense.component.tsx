import React, { JSX } from 'react';

const Spinner = () => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            minHeight: '100px',
        }}
    >
        <div
            style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #3498db',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
            }}
        />
        <style>
            {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}
        </style>
    </div>
);

export function Suspense(element: JSX.Element): JSX.Element {
    return <React.Suspense fallback={<Spinner />}>{element}</React.Suspense>;
}
