import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Remove .jsx extension

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
