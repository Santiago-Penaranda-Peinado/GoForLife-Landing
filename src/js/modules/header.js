// src/js/modules/header.js

export const initHeader = () => {
  const siteHeader = document.getElementById('header');
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  const navLinks = navMenu?.querySelectorAll('a');

  if (!siteHeader || !navToggle || !navMenu) {
    console.warn('Elementos del header no encontrados.');
    return;
  }

  // Menú móvil
  const toggleMobileMenu = () => {
    const isActive = navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll', isActive);
  };

  navToggle.addEventListener('click', toggleMobileMenu);

  // Cerrar menú al hacer clic en enlaces
  navLinks?.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href').startsWith('#')) {
        if (navMenu.classList.contains('active')) {
          toggleMobileMenu();
        }
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          const headerOffset = siteHeader.offsetHeight + 20;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // Header scroll effect
  const updateHeader = () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Cerrar menú al redimensionar
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
      toggleMobileMenu();
    }
  });

  // Cerrar menú con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleMobileMenu();
    }
  });

  console.log('Header inicializado correctamente');
};

export const closeMobileMenu = () => {
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  
  if (navToggle && navMenu) {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
};