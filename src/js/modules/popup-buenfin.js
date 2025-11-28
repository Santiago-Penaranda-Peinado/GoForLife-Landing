// Popup Promocional (Buen Fin / Black Friday) - Go For Life
// Reutiliza estilos y permite alternar textos/campaña con configuración mínima

export function initPopupBuenFin() {
  try {
    // Configuración de campaña
    // campaign puede ser 'buenfin' o 'blackfriday'
    const campaign = 'blackfriday';
    const POPUP_ENABLED = true; // cámbialo a false para apagar manualmente
    // Ajusta fechas (hora local CDMX -06:00). Déjalas en null para no usar ventana de fechas.
    const START_DATE = null; // ej: new Date('2025-11-27T00:00:00-06:00')
    const END_DATE = null;   // ej: new Date('2025-11-28T23:59:59-06:00')

    // Textos por campaña (se reutilizan estilos actuales)
    const COPY = {
      buenfin: {
        id: 'buenFinPopup',
        storageKey: 'buenFinPopupShown',
        title: '¡El Buen Fin llegó a <br>Go For Life!',
        badge: '🎉 OFERTA EXCLUSIVA 🎉',
        offerTitle: 'Precios Especiales y Promociones Exclusivas',
        offerSubtitle: '¡Aprovecha hasta!',
        priceMain: '12 MESES',
        priceSub: 'SIN INTERESES',
        features: [
          'Aprovecha nuestros precios especiales',
          'Regalos inigualables',
          'Bonos flexibles de descuento'
        ],
        cta: '¡Solicita Información!',
        terms: '*Válido durante El Buen Fin. Aplican términos y condiciones.'
      },
      blackfriday: {
        id: 'blackFridayPopup',
        storageKey: 'blackFridayPopupShown',
        title: '¡Black Friday en <br>Go For Life!',
        badge: '🔥 BLACK FRIDAY 🔥',
        offerTitle: 'Descuentos Especiales y Promos Limitadas',
        offerSubtitle: '¡Solo por Black Friday!',
        priceMain: 'DESCUENTOS',
        priceSub: 'HASTA 12 MSI',
        features: [
          'Precios especiales por tiempo limitado',
          'Beneficios exclusivos en tu compra',
          'Bonos y facilidades de pago'
        ],
        cta: '¡Aprovechar Black Friday!',
        terms: '*Válido durante Black Friday. Aplican términos y condiciones.'
      }
    };
    const cfg = COPY[campaign] || COPY.buenfin;

    // Overrides rápidos vía storage (útiles para QA):
    // localStorage.setItem('promoPopupOff', '1') para desactivar sin tocar código
    // localStorage.setItem('promoPopupOn', '1') para forzar mostrar (ignora fechas)
    const forceOff = typeof localStorage !== 'undefined' && localStorage.getItem('promoPopupOff') === '1';
    const forceOn = typeof localStorage !== 'undefined' && localStorage.getItem('promoPopupOn') === '1';

    if (!forceOn) {
      if (!POPUP_ENABLED || forceOff) return; // apagado manual o forzado
      const now = new Date();
      if (START_DATE instanceof Date && !isNaN(START_DATE) && now < START_DATE) return;
      if (END_DATE instanceof Date && !isNaN(END_DATE) && now > END_DATE) return;
    }
    // Mostrar solo una vez por sesión
    const storageKey = cfg.storageKey;
    const alreadyShown = sessionStorage.getItem(storageKey);
    if (alreadyShown) return;

    // Evitar duplicados si el DOM ya lo tiene
    if (document.getElementById(cfg.id)) return;

    // Template del popup (HTML)
    const template = document.createElement('div');
    template.innerHTML = `
      <div class="popup-overlay ${campaign === 'blackfriday' ? 'popup--blackfriday' : 'popup--buenfin'}" id="${cfg.id}" aria-hidden="true" role="dialog" aria-labelledby="promoPopupTitle">
        <div class="popup-container" role="document">
          <button class="popup-close" id="closePopup" aria-label="Cerrar">&times;</button>
          <div class="popup-header">
            <div class="popup-badge">${cfg.badge}</div>
            <h2 class="popup-title" id="promoPopupTitle">${cfg.title}</h2>
          </div>
          <div class="popup-body">
            <div class="popup-offer">
              <h3 class="popup-offer-title">${cfg.offerTitle}</h3>
              <h3 class="popup-offer-subtitle">${cfg.offerSubtitle}</h3>
              <div class="popup-price">
                ${cfg.priceMain}
                <small>${cfg.priceSub}</small>
              </div>
              <ul class="popup-features">
                ${cfg.features.map(f => `<li>${f}</li>`).join('')}
              </ul>
            </div>
            <div class="popup-cta">
              <a href="#contacto" class="popup-btn">${cfg.cta}</a>
            </div>
            <p class="popup-terms">${cfg.terms}</p>
          </div>
        </div>
      </div>
    `;

    // Agregar al body
    document.body.appendChild(template.firstElementChild);

    const overlay = document.getElementById(cfg.id);
    const closeBtn = document.getElementById('closePopup');
    const body = document.body;

    const openPopup = () => {
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      body.style.overflow = 'hidden';
    };

    const closePopup = () => {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      body.style.overflow = '';
      try { sessionStorage.setItem(storageKey, 'true'); } catch (_) {}
    };

    // Mostrar después de 2s
    setTimeout(openPopup, 2000);

    // Cerrar con botón X
    closeBtn.addEventListener('click', closePopup);

    // Cerrar cuando se hace clic en CTA y desplazar al formulario
    const cta = overlay.querySelector('.popup-btn');
    if (cta) {
      cta.addEventListener('click', (e) => {
        // Evitar que el overlay bloquee la percepción del scroll
        e.preventDefault();
        const target = document.querySelector('#contacto');
        closePopup();
        if (target && typeof target.scrollIntoView === 'function') {
          // Scroll suave al formulario
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Actualizar hash sin recargar
          try { history.pushState(null, '', '#contacto'); } catch (_) {}
        } else {
          // Fallback
          window.location.hash = 'contacto';
        }
      });
    }

    // Cerrar al hacer click fuera del contenedor
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePopup();
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closePopup();
      }
    });
  } catch (err) {
    console.warn('No se pudo inicializar el Popup Buen Fin:', err);
  }
}
