// src/js/modules/tecnologia-enhanced.js
export const initTecnologiaEnhanced = () => {
  const section = document.getElementById('tecnologia');
  if (!section) return;

  // Intersection Observer mejorado
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        // Animación escalonada para features
        const features = entry.target.querySelectorAll('.feature-item');
        features.forEach((feature, index) => {
          feature.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Animación para imagen y contenido
        const imageContent = entry.target.querySelector('.tecnologia__image-content');
        const featuresContent = entry.target.querySelector('.tecnologia__features-content');
        
        if (imageContent) imageContent.classList.add('is-visible');
        if (featuresContent) featuresContent.classList.add('is-visible');
      }
    });
  }, observerOptions);

  // Observar elementos
  const elementsToObserve = section.querySelectorAll(
    '.feature-item, .tecnologia__image-content, .tecnologia__features-content'
  );
  
  elementsToObserve.forEach(el => observer.observe(el));

  // Efectos de cursor para features
  const features = section.querySelectorAll('.feature-item');
  
  features.forEach(feature => {
    feature.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 992) return;
      
      const rect = feature.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      feature.style.setProperty('--mouse-x', `${x}%`);
      feature.style.setProperty('--mouse-y', `${y}%`);
    });
  });
};