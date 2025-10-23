// src/main.js
import './scss/main.scss';
import { initHeader } from './js/modules/header.js';

// Mantenemos el preloader existente
const initPreloader = () => {
  const preloader = document.getElementById('preloader');
  const progressFill = preloader?.querySelector('.preloader__progress-fill');
  const progressText = preloader?.querySelector('.preloader__progress-text');
  const message = preloader?.querySelector('.preloader__message p');

  if (!preloader || !progressFill || !progressText) {
    console.warn('Elementos del preloader no encontrados.');
    if(preloader) preloader.classList.add('loaded');
    return;
  }

  const dynamicMessages = [
    "Preparando tu futuro negocio...",
    "Cargando tecnología de vanguardia...",
    "Optimizando tu inversión...",
    "Listo para revolucionar el mercado..."
  ];

  let progress = 0;
  const targetProgress = 100;
  const intervalTime = 20;
  const totalTime = 2000;
  const increment = (targetProgress / totalTime) * intervalTime;
  let messageIndex = 0;

  const updateMessage = () => {
    if (message && dynamicMessages[messageIndex]) {
      message.textContent = dynamicMessages[messageIndex];
      messageIndex = (messageIndex + 1) % dynamicMessages.length;
    }
  };

  const messageIntervals = [25, 50, 75];
  let messageIntervalIndex = 0;

  const progressInterval = setInterval(() => {
    progress += increment;
    
    if (messageIntervalIndex < messageIntervals.length && 
        progress >= messageIntervals[messageIntervalIndex]) {
      updateMessage();
      messageIntervalIndex++;
    }

    if (progress >= targetProgress) {
      progress = targetProgress;
      clearInterval(progressInterval);
      
      setTimeout(() => {
        preloader.classList.add('loaded');
        
        preloader.addEventListener('transitionend', () => {
          setTimeout(() => {
            preloader.remove();
          }, 1000);
        });
      }, 600);
    }
    
    const easedProgress = easeOutQuart(progress / targetProgress) * targetProgress;
    progressFill.style.width = `${easedProgress}%`;
    progressText.textContent = `${Math.floor(easedProgress)}%`;
  }, intervalTime);

  function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (progress < 90) {
        clearInterval(progressInterval);
        progress = 100;
        progressFill.style.width = `100%`;
        progressText.textContent = `100%`;
        updateMessage();
        
        setTimeout(() => {
          preloader.classList.add('loaded');
        }, 500);
      }
    }, 3000);
  });

  setTimeout(() => {
    if (!preloader.classList.contains('loaded')) {
      console.warn('Preloader forzado a ocultarse por timeout.');
      clearInterval(progressInterval);
      preloader.classList.add('loaded');
    }
  }, 8000);
};

// Inicializar
document.addEventListener('DOMContentLoaded', initPreloader);
document.addEventListener('DOMContentLoaded', initHeader);