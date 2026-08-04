import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Handle cross-origin script errors or third-party CDN worker errors gracefully
window.addEventListener('error', (e) => {
  if (e.message === 'Script error.' || e.message?.includes('Script error')) {
    e.preventDefault();
  }
});

window.addEventListener('unhandledrejection', (e) => {
  if (e.reason?.message === 'Script error.' || e.reason?.message?.includes('Script error')) {
    e.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

