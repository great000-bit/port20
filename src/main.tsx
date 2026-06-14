import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS — IntersectionObserver based, no scroll listener cost
AOS.init({
  duration: 650,
  easing: 'ease-out-quad',
  once: true,
  offset: 60,
  delay: 0,
  startEvent: 'DOMContentLoaded',
  initClassName: 'aos-init',
  animatedClassName: 'aos-animate',
  disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
});

// Remove loading screen once app is ready
const removeLoader = () => {
  const loader = document.querySelector('.loading-screen');
  if (loader) {
    loader.classList.add('fade-out');
    setTimeout(() => loader.remove(), 300);
  }
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

removeLoader();