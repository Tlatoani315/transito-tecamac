/**
 * scripts.js — Tránsito y Seguridad Vial | H. Ayuntamiento de Tecámac
 * Autor: Gabriel Alberto Sánchez Martínez — Técnico en Informática, 2026
 *
 * Módulos:
 *  1. Navbar: scroll shadow + menú hamburguesa + nav-link activo
 *  2. Animaciones al scroll (IntersectionObserver)
 *  3. Botón "volver arriba"
 *  4. Modales nativos (<dialog>)
 *  5. Formulario de contacto: validación + contador de caracteres + feedback
 */

'use strict';

/* ============================================================
   CONSTANTES DE CONFIGURACIÓN
   ============================================================ */
const MAX_MESSAGE_LENGTH = 500;

/* ============================================================
   1. NAVBAR
   ============================================================ */

/**
 * Agrega la clase 'scrolled' al header cuando el usuario baja de la posición 0.
 * Motivo: da feedback visual (sombra) de que el navbar está flotando sobre contenido.
 */
function initNavbarScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Maneja el toggle del menú hamburguesa en mobile.
 * Actualiza aria-expanded para accesibilidad con lectores de pantalla.
 */
function initHamburgerMenu() {
  const btn = document.getElementById('hamburger-btn');
  const nav = document.getElementById('main-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(isOpen));
    btn.setAttribute(
      'aria-label',
      isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
    );
  });

  // Cierra el menú al hacer clic en un enlace (navegación single-page)
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Abrir menú de navegación');
    });
  });

  // Cierra el menú si se hace clic fuera de él
  document.addEventListener('click', (event) => {
    const clickedOutside = !nav.contains(event.target) && !btn.contains(event.target);
    if (clickedOutside && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Resalta el enlace del navbar que corresponde a la sección visible en pantalla.
 * Motivo: orientación visual al usuario durante el scroll.
 */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', isActive);
      });
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}


/* ============================================================
   2. ANIMACIONES AL SCROLL (IntersectionObserver)
   ============================================================ */

/**
 * Observa todos los elementos con clase 'animate-on-scroll'.
 * Cuando entran en el viewport, agrega 'is-visible' para activar la animación CSS.
 * Motivo: más eficiente y preciso que escuchar el evento scroll manualmente.
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observerOptions = {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      // Deja de observar una vez que ya se animó (no se repite)
      obs.unobserve(entry.target);
    });
  }, observerOptions);

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   3. BOTÓN VOLVER ARRIBA
   ============================================================ */

/**
 * Muestra/oculta el botón de volver arriba según la posición del scroll.
 * Aparece cuando el usuario ha bajado más de 300px.
 */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  const toggleVisibility = () => {
    const shouldShow = window.scrollY > 300;
    btn.hidden = !shouldShow;
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   4. MODALES NATIVOS (<dialog>)
   ============================================================ */

/**
 * Abre el modal por ID usando la API nativa del elemento <dialog>.
 * @param {string} modalId - El id del elemento <dialog> a abrir.
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.showModal();

  // Cierra con Escape (comportamiento nativo de <dialog>, pero reforzamos el foco)
  modal.addEventListener('keydown', handleModalKeydown);

  // Cierra si el usuario hace clic en el backdrop (fuera del contenido)
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal(modalId);
  });
}

/**
 * Cierra el modal por ID.
 * @param {string} modalId - El id del elemento <dialog> a cerrar.
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.close();
  modal.removeEventListener('keydown', handleModalKeydown);
}

/**
 * Maneja la tecla Escape dentro del modal para cerrarlo correctamente.
 * La API nativa ya lo hace, pero limpiamos el listener extra.
 * @param {KeyboardEvent} event
 */
function handleModalKeydown(event) {
  if (event.key === 'Escape') {
    event.currentTarget.close();
    event.currentTarget.removeEventListener('keydown', handleModalKeydown);
  }
}

// Exponemos openModal y closeModal globalmente para los onclick del HTML
window.openModal = openModal;
window.closeModal = closeModal;


/* ============================================================
   5. FORMULARIO DE CONTACTO — Netlify Forms
   ============================================================ */

/* --- Reglas de validación por campo --- */
const FIELD_RULES = {
  name: {
    minLength: 3,
    maxLength: 80,
    // Solo letras (incluyendo acentos y ñ), espacios y guiones
    pattern: /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s\-']+$/,
    messages: {
      empty:      'El nombre es obligatorio.',
      minLength:  'El nombre debe tener al menos 3 caracteres.',
      maxLength:  'El nombre no puede superar 80 caracteres.',
      pattern:    'El nombre solo puede contener letras y espacios.',
    },
  },
  email: {
    // RFC 5322 simplificado — cubre casos reales
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    messages: {
      empty:   'El correo electrónico es obligatorio.',
      pattern: 'Ingresa un correo electrónico válido (ej. nombre@dominio.com).',
    },
  },
  message: {
    minLength: 10,
    maxLength: MAX_MESSAGE_LENGTH,
    messages: {
      empty:      'El mensaje es obligatorio.',
      minLength:  'El mensaje debe tener al menos 10 caracteres.',
      maxLength:  `El mensaje no puede superar ${MAX_MESSAGE_LENGTH} caracteres.`,
    },
  },
};

/**
 * Valida un campo individual contra sus reglas definidas en FIELD_RULES.
 * Retorna { isValid: boolean, message: string }.
 * @param {HTMLInputElement|HTMLTextAreaElement} field
 * @returns {{ isValid: boolean, message: string }}
 */
function validateField(field) {
  const value = field.value.trim();
  const rules = FIELD_RULES[field.name];

  // Si el campo no tiene reglas definidas, se considera válido
  if (!rules) return { isValid: true, message: '' };

  // 1. Campo vacío (requerido)
  if (field.required && value === '') {
    return { isValid: false, message: rules.messages.empty };
  }

  // Si está vacío pero no es requerido, pasa sin más validaciones
  if (value === '') return { isValid: true, message: '' };

  // 2. Longitud mínima
  if (rules.minLength && value.length < rules.minLength) {
    return { isValid: false, message: rules.messages.minLength };
  }

  // 3. Longitud máxima
  if (rules.maxLength && value.length > rules.maxLength) {
    return { isValid: false, message: rules.messages.maxLength };
  }

  // 4. Expresión regular
  if (rules.pattern && !rules.pattern.test(value)) {
    return { isValid: false, message: rules.messages.pattern };
  }

  return { isValid: true, message: '' };
}

/**
 * Aplica el estado visual de error o éxito al campo y su mensaje de error en el DOM.
 * @param {HTMLElement} field
 * @param {{ isValid: boolean, message: string }} result
 */
function applyFieldFeedback(field, result) {
  const errorEl = document.getElementById(`${field.id}-error`);

  field.classList.toggle('is-error', !result.isValid);
  field.classList.toggle('is-valid', result.isValid && field.value.trim() !== '');

  if (errorEl) {
    errorEl.textContent = result.isValid ? '' : result.message;
  }
}

/**
 * Valida todos los campos requeridos del formulario.
 * Retorna true solo si todos son válidos. En caso contrario,
 * hace foco en el primer campo con error.
 * @param {HTMLFormElement} form
 * @returns {boolean}
 */
function validateForm(form) {
  const fields = form.querySelectorAll('input[required], textarea[required]');
  let firstInvalidField = null;

  fields.forEach(field => {
    const result = validateField(field);
    applyFieldFeedback(field, result);
    if (!result.isValid && !firstInvalidField) {
      firstInvalidField = field;
    }
  });

  // Lleva el foco al primer campo inválido para accesibilidad
  if (firstInvalidField) {
    firstInvalidField.focus();
    return false;
  }

  return true;
}

/**
 * Envía el formulario a Netlify Forms via fetch (sin recarga de página).
 * - El body debe ser application/x-www-form-urlencoded.
 * - El campo `form-name` le indica a Netlify a qué formulario pertenece.
 * - Se envía a la ruta raíz '/'; Netlify intercepta el POST antes de servir el HTML.
 * @param {HTMLFormElement} form
 * @returns {Promise<Response>}
 */
function submitToNetlify(form) {
  const data = new URLSearchParams(new FormData(form));

  return fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: data.toString(),
  });
}

/**
 * Controla el estado visual del botón de envío durante la petición.
 * @param {HTMLButtonElement} btn
 * @param {boolean} isLoading
 */
function setButtonLoading(btn, isLoading) {
  btn.disabled = isLoading;
  btn.classList.toggle('is-loading', isLoading);
}

/**
 * Muestra el estado de éxito y oculta los campos del formulario.
 * @param {HTMLFormElement} form
 * @param {HTMLButtonElement} submitBtn
 * @param {HTMLElement} successEl
 */
function showSuccessState(form, submitBtn, successEl) {
  form.querySelectorAll('.form-group, .form-row').forEach(el => {
    el.style.display = 'none';
  });
  submitBtn.hidden = true;
  successEl.hidden = false;
  // Mueve el foco al mensaje de éxito para lectores de pantalla
  successEl.focus();
}

/**
 * Muestra un error general de red o servidor debajo del formulario.
 * @param {HTMLFormElement} form
 * @param {string} message
 */
function showNetworkError(form, message) {
  let errorBanner = form.querySelector('.form-network-error');

  // Crea el banner solo si no existe todavía
  if (!errorBanner) {
    errorBanner = document.createElement('div');
    errorBanner.className = 'form-network-error';
    errorBanner.setAttribute('role', 'alert');
    errorBanner.setAttribute('aria-live', 'assertive');
    form.appendChild(errorBanner);
  }

  errorBanner.textContent = message;
  errorBanner.hidden = false;
}

/**
 * Inicializa toda la lógica del formulario de contacto:
 * validación en tiempo real, contador de caracteres y envío a Netlify.
 */
function initContactForm() {
  const form         = document.getElementById('contact-form');
  const submitBtn    = document.getElementById('submit-btn');
  const successEl    = document.getElementById('form-success');
  const messageField = document.getElementById('input-message');
  const charCounter  = document.getElementById('char-counter');

  if (!form || !submitBtn) return;

  // --- Contador de caracteres en el textarea ---
  if (messageField && charCounter) {
    messageField.addEventListener('input', () => {
      const count = messageField.value.length;
      const isOverLimit = count > MAX_MESSAGE_LENGTH;
      charCounter.textContent = `${count} / ${MAX_MESSAGE_LENGTH} caracteres`;
      charCounter.style.color = isOverLimit ? 'var(--color-error)' : 'var(--color-mid)';
    });
  }

  // --- Validación en tiempo real al salir del campo (blur) ---
  form.querySelectorAll('input[name], textarea[name]').forEach(field => {
    // Valida cuando el usuario abandona el campo
    field.addEventListener('blur', () => {
      const result = validateField(field);
      applyFieldFeedback(field, result);
    });

    // Revalida mientras escribe si ya había un error visible
    field.addEventListener('input', () => {
      if (field.classList.contains('is-error')) {
        const result = validateField(field);
        applyFieldFeedback(field, result);
      }
    });
  });

  // --- Envío del formulario ---
  form.addEventListener('submit', async (event) => {
    // Siempre prevenimos el envío nativo; nosotros lo manejamos
    event.preventDefault();

    // Ocultar cualquier error de red previo
    const prevError = form.querySelector('.form-network-error');
    if (prevError) prevError.hidden = true;

    // Paso 1: validar todos los campos antes de intentar el envío
    const isFormValid = validateForm(form);
    if (!isFormValid) return;

    // Paso 2: bloquear el botón y mostrar spinner
    setButtonLoading(submitBtn, true);

    try {
      const response = await submitToNetlify(form);

      if (!response.ok) {
        // Netlify devolvió un error HTTP (ej. 404 si el formulario no está registrado)
        throw new Error(`Error del servidor: ${response.status}`);
      }

      // Éxito: mostrar mensaje y ocultar el formulario
      showSuccessState(form, submitBtn, successEl);

    } catch (error) {
      // El envío falló (sin conexión, error de servidor, etc.)
      // Nunca falla en silencio: siempre informamos al usuario qué pasó
      showNetworkError(
        form,
        'No se pudo enviar el mensaje. Verifica tu conexión e intenta de nuevo.'
      );
      setButtonLoading(submitBtn, false);
    }
  });
}

/* ============================================================
   INICIALIZACIÓN — Se ejecuta cuando el DOM está listo
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initHamburgerMenu();
  initActiveNavLink();
  initScrollAnimations();
  initBackToTop();
  initContactForm();
});
