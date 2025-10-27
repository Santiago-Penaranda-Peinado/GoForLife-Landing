// src/js/modules/animations.js

export const initScrollAnimations = () => {
  // Seleccionamos las tarjetas de ambas secciones
  const animatedElements = document.querySelectorAll('.benefit-card, .model-card, .feature-item, .contact-info, .contact-form-wrapper');
  
  if (animatedElements.length === 0) return;

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // 10% del elemento visible
  };

  const callback = (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        
        // --- FIX: Añadimos una clase en lugar de un estilo inline ---
        
        // Aplicamos un delay escalonado (como estilo, esto está bien)
        const delay = index % 4 * 100; // 0ms, 100ms, 200ms, 300ms
        entry.target.style.animationDelay = `${delay}ms`;
        
        // Añadimos la clase que dispara la animación
        entry.target.classList.add('is-visible');
        
        // Dejamos de observar
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  
  // Ya no necesitamos ocultarlos con JS, lo hará el CSS
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  
};