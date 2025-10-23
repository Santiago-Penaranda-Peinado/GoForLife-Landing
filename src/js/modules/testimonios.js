// src/js/modules/testimonios.js

export const initTestimonials = () => {
  const container = document.getElementById('testimonial-slider-container');
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  if (!track || !prevBtn || !nextBtn) {
    // Si no existen los elementos, no hacemos nada
    return; 
  }

  const slides = Array.from(track.children);
  if (slides.length === 0) return;

  let currentIndex = 0;
  const slideCount = slides.length;

  // Función para mover el slider y actualizar clases/accesibilidad
  const goToSlide = (index) => {
    // Manejo de "loop" (circular)
    if (index < 0) {
      index = slideCount - 1;
    } else if (index >= slideCount) {
      index = 0;
    }

    // Movemos el track
    track.style.transform = `translateX(-${index * 100}%)`;

    // Actualizamos clases y ARIA (accesibilidad)
    slides.forEach((slide, i) => {
      slide.classList.remove('is-active');
      slide.setAttribute('aria-hidden', 'true');
      slide.setAttribute('tabindex', '-1');
    });

    slides[index].classList.add('is-active');
    slides[index].setAttribute('aria-hidden', 'false');
    slides[index].setAttribute('tabindex', '0');

    currentIndex = index;
  };

  // Event Listeners para los botones
  prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });
  
  // Inicializamos el primer slide como activo
  goToSlide(0);

  console.log('Testimonial Slider inicializado');
};