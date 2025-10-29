// src/main.js
import './scss/main.scss';
import { initHeader } from './js/modules/header.js';
import { initScrollAnimations } from './js/modules/animations.js';
import { initTestimonials } from './js/modules/testimonios.js';
import { initTecnologiaEnhanced } from './js/modules/tecnologia-enhanced.js';
import { initContactAnimations } from './js/modules/contact-animations.js';
import { initImageGallery } from './js/modules/image-gallery.js';

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

// Animaciones de aparición al hacer scroll
function initBenefitsAnimations() {
  const benefitCards = document.querySelectorAll('.benefit-card');
  const benefitInfo = document.querySelector('.benefits-header');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  benefitCards.forEach(card => {
    observer.observe(card);
  });
  
  if (benefitInfo) {
    observer.observe(benefitInfo);
  }
}

function initModelsAnimations() {
  const modelCards = document.querySelectorAll('.model-card');
  const modelsHeader = document.querySelector('.models-header');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  modelCards.forEach(card => {
    observer.observe(card);
  });
  
  if (modelsHeader) {
    observer.observe(modelsHeader);
  }
}

// Inicializar todo en un solo DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Inicializando aplicación...');
  
  // Inicializar preloader primero
  initPreloader();
  
  // Inicializar módulos
  initHeader();
  initScrollAnimations();
  initTestimonials();
  initTecnologiaEnhanced();
  initContactAnimations();
  initImageGallery();
  
  // Inicializar animaciones de las secciones que acabamos de mejorar
  initBenefitsAnimations();
  initModelsAnimations();
  
  console.log('Aplicación inicializada correctamente');
});

// Manejar errores de módulos
window.addEventListener('error', function(e) {
  console.error('Error en la aplicación:', e.error);
  
  // Si hay errores en módulos, al menos inicializar las funciones locales
  try {
    initBenefitsAnimations();
    initModelsAnimations();
  } catch (err) {
    console.error('Error inicializando animaciones locales:', err);
  }
});