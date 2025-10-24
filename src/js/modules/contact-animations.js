// src/js/modules/contact-animations.js
export const initContactAnimations = () => {
  const section = document.querySelector('.contact-section');
  if (!section) return;

  const animatedElements = section.querySelectorAll('.contact-info, .contact-form-wrapper, .contact-details__item');
  
  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Delay escalonado para los elementos de contacto
        const delay = index * 100;
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add('is-visible');
        
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
  
  // Efectos interactivos para los inputs
  const inputs = section.querySelectorAll('.form-group__input, .form-group__select');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
  });
};