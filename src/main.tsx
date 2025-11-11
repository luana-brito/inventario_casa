import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles.css';

async function enablePWA() {
  if ('serviceWorker' in navigator) {
    const { registerSW } = await import('virtual:pwa-register');
    registerSW({ immediate: true });
  }
}

enablePWA().catch(() => {
  // noop: falha silenciosa na ativação do PWA não deve quebrar a aplicação
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


