import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Remove loading screen once app is ready
const removeLoader = () => {
  const loader = document.querySelector('.loading-screen');
  if (loader) {
    loader.classList.add('fade-out');
    setTimeout(() => loader.remove(), 300);
  }
};

// Create root and render
const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Remove loader after first render
removeLoader();