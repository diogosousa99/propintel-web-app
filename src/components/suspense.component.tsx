import React, { JSX } from 'react';

export function Suspense(element: JSX.Element): JSX.Element {
    return <React.Suspense fallback={<h1>Loading...</h1>}>{element}</React.Suspense>;
}
