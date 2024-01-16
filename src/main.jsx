/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { DarkModeProvider } from './context/DarkModeContext.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ui/ErrorFallback'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <ErrorBoundary onReset={()=>window.location.replace('/')} FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </DarkModeProvider>
  </React.StrictMode>
);
