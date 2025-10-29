// src/js/modules/image-gallery.js
export class ImageGallery {
  constructor(container) {
    this.container = container;
    this.track = container.querySelector('.image-gallery__track');
    this.slides = Array.from(container.querySelectorAll('.image-gallery__slide'));
    this.prevBtn = container.querySelector('.image-gallery__btn--prev');
    this.nextBtn = container.querySelector('.image-gallery__btn--next');
    this.dots = Array.from(container.querySelectorAll('.image-gallery__pagination .dot'));
    this.modal = document.querySelector('.image-modal');
    this.modalImage = this.modal?.querySelector('.image-modal__image');
    this.modalClose = this.modal?.querySelector('.image-modal__close');
    this.modalPrev = this.modal?.querySelector('.image-modal__nav--prev');
    this.modalNext = this.modal?.querySelector('.image-modal__nav--next');
    this.modalCounter = this.modal?.querySelector('.image-modal__counter');
    
    this.currentIndex = 0;
    this.modalIndex = 0;
    this.slidesPerView = this.getSlidesPerView();
    this.autoPlayInterval = null;
    this.isAutoPlaying = true;
    
    this.init();
  }
  
  getSlidesPerView() {
    const width = window.innerWidth;
    if (width < 576) return 1;
    if (width < 992) return 2;
    return 3;
  }
  
  init() {
    this.setupEventListeners();
    this.updateSlider();
    this.startAutoPlay();
    this.createDots();
  }
  
  setupEventListeners() {
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());
    
    // Modal events
    this.slides.forEach((slide, index) => {
      slide.addEventListener('click', () => this.openModal(index));
    });
    
    this.modalClose?.addEventListener('click', () => this.closeModal());
    this.modalPrev?.addEventListener('click', () => this.modalPrevImage());
    this.modalNext?.addEventListener('click', () => this.modalNextImage());
    
    // Pausar autoplay al hover
    this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    
    // Cerrar modal con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
      if (e.key === 'ArrowLeft') this.modalPrevImage();
      if (e.key === 'ArrowRight') this.modalNextImage();
    });
    
    // Cerrar modal haciendo click fuera de la imagen
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });
    
    window.addEventListener('resize', () => this.handleResize());
  }
  
  createDots() {
    const totalSlides = this.slides.length;
    const totalDots = Math.ceil(totalSlides / this.slidesPerView);
    
    this.dotsContainer = this.container.querySelector('.image-gallery__pagination');
    this.dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = `dot ${i === 0 ? 'is-active' : ''}`;
      dot.setAttribute('aria-label', `Ir a grupo de imágenes ${i + 1}`);
      dot.addEventListener('click', () => this.goToSlide(i * this.slidesPerView));
      this.dotsContainer.appendChild(dot);
    }
    
    this.dots = Array.from(this.dotsContainer.querySelectorAll('.dot'));
  }
  
  updateSlider() {
    const slideWidth = this.slides[0]?.offsetWidth + 16; // + gap
    const translateX = -this.currentIndex * slideWidth;
    this.track.style.transform = `translateX(${translateX}px)`;
    
    this.updateDots();
    this.updateButtons();
  }
  
  updateDots() {
    const activeDot = Math.floor(this.currentIndex / this.slidesPerView);
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === activeDot);
    });
  }
  
  updateButtons() {
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex >= this.slides.length - this.slidesPerView;
  }
  
  next() {
    if (this.currentIndex < this.slides.length - this.slidesPerView) {
      this.currentIndex++;
      this.updateSlider();
    }
  }
  
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlider();
    }
  }
  
  goToSlide(index) {
    this.currentIndex = Math.max(0, Math.min(index, this.slides.length - this.slidesPerView));
    this.updateSlider();
  }
  
  startAutoPlay() {
    if (this.isAutoPlaying) {
      this.autoPlayInterval = setInterval(() => {
        if (this.currentIndex < this.slides.length - this.slidesPerView) {
          this.next();
        } else {
          this.goToSlide(0);
        }
      }, 4000); // Cambia cada 4 segundos
    }
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
  
  handleResize() {
    this.slidesPerView = this.getSlidesPerView();
    this.createDots();
    this.updateSlider();
  }
  
  openModal(index) {
    this.modalIndex = index;
    this.updateModal();
    this.modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }
  
  closeModal() {
    this.modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }
  
  modalNextImage() {
    this.modalIndex = (this.modalIndex + 1) % this.slides.length;
    this.updateModal();
  }
  
  modalPrevImage() {
    this.modalIndex = (this.modalIndex - 1 + this.slides.length) % this.slides.length;
    this.updateModal();
  }
  
  updateModal() {
    const imageSrc = this.slides[this.modalIndex]?.querySelector('img')?.src;
    if (imageSrc && this.modalImage) {
      this.modalImage.src = imageSrc;
      this.modalImage.alt = this.slides[this.modalIndex]?.querySelector('img')?.alt || 'Imagen';
    }
    
    if (this.modalCounter) {
      this.modalCounter.textContent = `${this.modalIndex + 1} / ${this.slides.length}`;
    }
  }
}

// Función de inicialización
export function initImageGallery() {
  const galleryContainer = document.querySelector('.image-gallery');
  if (galleryContainer) {
    new ImageGallery(galleryContainer);
    console.log('Image Gallery inicializado correctamente');
  }
}