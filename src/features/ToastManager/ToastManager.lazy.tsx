/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { lazy, Suspense } from 'react';

const LazyToastManager = lazy(() => import('./ToastManager'));

const ToastManager = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }) => (
  <Suspense fallback={null}>
    <LazyToastManager {...props} />
  </Suspense>
);

export default ToastManager;
