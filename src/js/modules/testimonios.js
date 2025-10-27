// src/js/modules/testimonios.js

export const initTestimonials = () => {
  const section = document.querySelector('.testimonios-section');
  if (!section) return;

  // --- LÓGICA DE SLIDER PREMIUM v5 (DESDE CERO) ---

  // 1. SELECTORES
  const track = section.querySelector('.slider-track');
  const slides = Array.from(section.querySelectorAll('.slide'));
  const prevBtn = section.querySelector('.slider-btn--prev');
  const nextBtn = section.querySelector('.slider-btn--next');
  const pagination = section.querySelector('.slider-pagination');
  const wrapper = section.querySelector('.slider-wrapper');

  if (!track || slides.length === 0) return;

  // 2. ESTADO INICIAL
  const realSlideCount = slides.length;
  let currentIndex = 0; // Empezamos en el slide 0
  let isTransitioning = false;
  let autoPlayInterval = null;
  let slidesPerView = 1; // Se recalculará

  // 3. CLONACIÓN PARA LOOP INFINITO
  // Clonamos el primero y el último
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[realSlideCount - 1].cloneNode(true);
  firstClone.classList.add('clone');
  lastClone.classList.add('clone');
  track.appendChild(firstClone);
  track.prepend(lastClone);

  // Actualizamos la lista de slides para incluir clones
  const allSlides = Array.from(track.children);
  currentIndex = 1; // Empezamos en el primer slide REAL

  // 4. CREAR PAGINACIÓN (DOTS)
  if (pagination) {
    pagination.innerHTML = '';
    for (let i = 0; i < realSlideCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `Ir al testimonio ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i + 1)); // i + 1 por el clon
      pagination.appendChild(dot);
    }
  }
  const dots = Array.from(pagination.children);

  // 5. FUNCIONES PRINCIPALES

  /**
   * Esta es la función principal.
   * Mueve el track y actualiza las clases.
   */
  function updateSlider(animate = true) {
    // A. CÁLCULO DE MOVIMIENTO
    
    // 1. Ancho de un solo slide
    const slideWidth = allSlides[0].offsetWidth;
    
    // 2. Cuántos slides se ven (basado en el ancho del wrapper)
    const wrapperWidth = wrapper.offsetWidth;
    slidesPerView = Math.round(wrapperWidth / slideWidth);
    
    // 3. Distancia para centrar
    // (Ancho del wrapper / 2) - (Ancho del slide / 2)
    const offset = (wrapperWidth / 2) - (slideWidth / 2);
    
    // 4. Posición final
    const newPosition = (currentIndex * slideWidth) * -1 + offset;

    track.style.transition = animate 
      ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' 
      : 'none';
      
    track.style.transform = `translateX(${newPosition}px)`;

    // B. ACTUALIZACIÓN DE CLASES Y DOTS
    const realDotIndex = (currentIndex - 1 + realSlideCount) % realSlideCount;
    
    allSlides.forEach((slide, index) => {
      // El índice "central" visible
      const centralIndex = currentIndex + Math.floor(slidesPerView / 2);
      
      // Aplicamos 'is-active' solo al slide del centro
      const isActive = index === currentIndex;
      slide.classList.toggle('is-active', isActive);
    });
    
    if (dots.length > 0) {
      dots.forEach((dot, index) => {
        dot.classList.toggle('is-active', index === realDotIndex);
      });
    }
  }

  /**
   * Función para ir a un slide específico
   */
  function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    currentIndex = index;
    updateSlider(true); // Mover CON animación
    
    resetAutoPlay();
  }

  // 6. MANEJADORES DE EVENTOS

  // Click en botones
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

  // Loop infinito
  track.addEventListener('transitionend', () => {
    isTransitioning = false; // Desbloqueamos

    // Si estamos en el ÚLTIMO clon (clon del slide 0)
    if (currentIndex === allSlides.length - 1) {
      currentIndex = 1; // Saltamos al primer slide REAL
      updateSlider(false); // Mover SIN animación
    }
    
    // Si estamos en el PRIMER clon (clon del slide 3)
    if (currentIndex === 0) {
      currentIndex = realSlideCount; // Saltamos al último slide REAL
      updateSlider(false); // Mover SIN animación
    }
  });

  // Autoplay
  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 3500); // 3.5 segundos
  }
  function stopAutoPlay() { clearInterval(autoPlayInterval); }
  function resetAutoPlay() { stopAutoPlay(); startAutoPlay(); }

  // Pausar con hover/touch
  section.addEventListener('mouseenter', stopAutoPlay);
  section.addEventListener('mouseleave', startAutoPlay);
  section.addEventListener('touchstart', stopAutoPlay, { passive: true });
  section.addEventListener('touchend', startAutoPlay);
  
  // Swipe (Touch)
  let touchStartX = 0;
  wrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  
  wrapper.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) { // Mínimo 50px de swipe
      diff > 0 ? goToSlide(currentIndex + 1) : goToSlide(currentIndex - 1);
    }
  });

  // Recalcular en resize (MUY IMPORTANTE)
  window.addEventListener('resize', () => {
    updateSlider(false); // Recalculamos posición SIN animación
  });

  // 7. INICIALIZACIÓN
  track.style.opacity = 0;
  setTimeout(() => {
    updateSlider(false); // Colocamos en posición inicial
    track.style.opacity = 1; // Mostramos
    startAutoPlay();
  }, 100);
  
  console.log('Slider Premium v5 inicializado.');
};