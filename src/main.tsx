import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import '@fontsource/inter';

import './index.css';
import { App } from './app';
import './app/i18n';

// Register the service worker immediately and enable automatic updates.
// https://vite-pwa-org.netlify.app/guide/auto-update
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
