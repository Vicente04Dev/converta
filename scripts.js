/* ================================================
   LOADER
================================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
    initReveal();
    initCounters();
  }, 950);
});


/* ================================================
   HAMBURGER / MOBILE MENU
================================================ */
function toggleMenu() {
  const hb = document.getElementById('hamburger');
  const mm = document.getElementById('mobile-menu');
  if (!hb || !mm) return;
  const isOpen = hb.classList.contains('open');
  hb.classList.toggle('open');
  mm.classList.toggle('open');
  document.body.style.overflow = isOpen ? '' : '';
}

// Close menu on outside click
document.addEventListener('click', (e) => {
  const hb = document.getElementById('hamburger');
  const mm = document.getElementById('mobile-menu');
  if (!hb || !mm) return;
  if (mm.classList.contains('open') && !mm.contains(e.target) && !hb.contains(e.target)) {
    hb.classList.remove('open');
    mm.classList.remove('open');
  }
});

/* ================================================
   SCROLL REVEAL
================================================ */
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ================================================
   COUNTER ANIMATION
================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num, .number-val, .about-visual-num');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const original = el.innerHTML;
  const num = parseInt(original.replace(/\D/g, ''));
  if (!num || num < 2) return;

  const suffix = el.querySelector('sup, span') ? el.innerHTML.replace(/^\d+/, '') : original.replace(/^\d+/, '');
  const duration = 1600;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * num);
    el.innerHTML = current + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ================================================
   SCROLL TO NEXT SECTION
================================================ */
function scrollToNext() {
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
}

/* ================================================
   CONTACT FORM
================================================ */
function submitForm() {
  const fields = [
    { id: 'fname', label: 'nome' },
    { id: 'femail', label: 'email' },
    { id: 'fservice', label: 'serviço' },
    { id: 'fmessage', label: 'mensagem' },
  ];
  let valid = true;

  fields.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) {
      valid = false;
      if (el) {
        el.style.borderColor = '#e74c3c';
        el.style.boxShadow = '0 0 0 3px rgba(231,76,60,0.12)';
        el.addEventListener('input', () => {
          el.style.borderColor = '';
          el.style.boxShadow = '';
        }, { once: true });
      }
    }
  });

  if (!valid) return;

  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (form && success) {
    form.style.opacity = '0';
    form.style.transform = 'translateY(-8px)';
    setTimeout(() => {
      form.style.display = 'none';
      success.style.display = 'block';
      success.style.opacity = '0';
      success.style.transform = 'translateY(8px)';
      requestAnimationFrame(() => {
        success.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        success.style.opacity = '1';
        success.style.transform = 'translateY(0)';
      });
    }, 300);
  }
}

function resetForm() {
  ['fname','femail','fphone','fcompany','fservice','fmessage'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (form && success) {
    success.style.display = 'none';
    form.style.display = 'block';
    form.style.opacity = '1';
    form.style.transform = '';
  }
}

/* ================================================
   INIT
================================================ */
setTimeout(initReveal, 1050);
