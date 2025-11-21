// Popup Buen Fin - Go For Life
// Crea e inicializa un modal promocional mostrando oferta del Buen Fin

export function initPopupBuenFin() {
  try {
    // Configuración rápida: desactivar por fecha o con flag
    // Ajusta START_DATE y END_DATE a las fechas del Buen Fin (hora local CDMX -06:00)
    const POPUP_ENABLED = false; // cámbialo a false para apagarlo manualmente
    const START_DATE = null; // ej: new Date('2025-11-15T00:00:00-06:00')
    const END_DATE = null;   // ej: new Date('2025-11-18T23:59:59-06:00')

    // Overrides rápidos vía storage (útiles para QA):
    // localStorage.setItem('buenFinPopupOff', '1') para desactivar sin tocar código
    // localStorage.setItem('buenFinPopupOn', '1') para forzar mostrar (ignora fechas)
    const forceOff = typeof localStorage !== 'undefined' && localStorage.getItem('buenFinPopupOff') === '1';
    const forceOn = typeof localStorage !== 'undefined' && localStorage.getItem('buenFinPopupOn') === '1';

    if (!forceOn) {
      if (!POPUP_ENABLED || forceOff) return; // apagado manual o forzado
      const now = new Date();
      if (START_DATE instanceof Date && !isNaN(START_DATE) && now < START_DATE) return;
      if (END_DATE instanceof Date && !isNaN(END_DATE) && now > END_DATE) return;
    }
    // Mostrar solo una vez por sesión
    const storageKey = 'buenFinPopupShown';
    const alreadyShown = sessionStorage.getItem(storageKey);
    if (alreadyShown) return;

    // Evitar duplicados si el DOM ya lo tiene
    if (document.getElementById('buenFinPopup')) return;

    // Template del popup (HTML)
    const template = document.createElement('div');
    template.innerHTML = `
      <div class="popup-overlay" id="buenFinPopup" aria-hidden="true" role="dialog" aria-labelledby="buenFinTitle">
        <div class="popup-container" role="document">
          <button class="popup-close" id="closePopup" aria-label="Cerrar">&times;</button>
          <div class="popup-header">
            <div class="popup-badge">🎉 OFERTA EXCLUSIVA 🎉</div>
            <h2 class="popup-title" id="buenFinTitle">¡El Buen Fin llegó a <br>Go For Life!</h2>
          </div>
          <div class="popup-body">
            <div class="popup-offer">
              <h3 class="popup-offer-title">Precios Especiales y Promociones Exclusivas</h3>
              <h3 class="popup-offer-subtitle">¡Aprovecha hasta!</h3>
              <div class="popup-price">
                12 MESES
                <small>SIN INTERESES</small>
              </div>
              <ul class="popup-features">
                <li>Aprovecha nuestros precios especiales</li>
                <li>Regalos inigualables</li>
                <li>Bonos flexibles de descuento</li>
              </ul>
            </div>
            <div class="popup-cta">
              <a href="#contacto" class="popup-btn">¡Solicita Información!</a>
            </div>
            <p class="popup-terms">*Válido durante El Buen Fin. Aplican términos y condiciones.</p>
          </div>
        </div>
      </div>
    `;

    // Agregar al body
    document.body.appendChild(template.firstElementChild);

    const overlay = document.getElementById('buenFinPopup');
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
