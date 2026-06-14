import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS — IntersectionObserver based, no scroll listener cost
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,        // animate once per element, not every scroll
  offset: 80,        // trigger 80px before element enters viewport
  delay: 0,
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