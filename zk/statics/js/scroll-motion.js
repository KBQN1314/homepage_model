(function () {
  const MOTION_SELECTOR = [
    '.sec-head', '.sec-title', '.sec-desc', '.page-kicker', '.detail-hero h1', '.detail-hero p',
    '.pain-card', '.product-card', '.trust-card', '.news-card', '.step', '.partner-card',
    '.detail-block', '.side-card', '.faq-card', '.contact-info-panel', '.join-panel', '.join-steps .step',
    '.case-card', '.expert-card', '.assistant-card', '.course-card', '.system-card', '.feature-card',
    '.contact-map', '.contact-info', '.quote-box', '.assess-item', '.flow-item', '.contact-wrap', '.join-wrap'
  ].join(',');

  function ensureStyle() {
    const oldStyle = document.getElementById('scrollMotionStyle');
    if (oldStyle) oldStyle.remove();

    const style = document.createElement('style');
    style.id = 'scrollMotionStyle';
    style.textContent = `
      .scroll-motion {
        opacity: 0 !important;
        transform: translate3d(0, 14px, 0) !important;
        filter: none !important;
        transition:
          opacity .72s cubic-bezier(.22,.61,.36,1) var(--motion-delay, 0ms),
          transform .72s cubic-bezier(.22,.61,.36,1) var(--motion-delay, 0ms) !important;
        will-change: opacity, transform;
      }

      .scroll-motion.motion-in {
        opacity: 1 !important;
        transform: translate3d(0, 0, 0) !important;
        filter: none !important;
      }

      .scroll-motion.motion-out {
        opacity: 0 !important;
        transform: translate3d(0, 14px, 0) !important;
        filter: none !important;
      }

      @media (prefers-reduced-motion: reduce) {
        .scroll-motion {
          opacity: 1 !important;
          transform: none !important;
          filter: none !important;
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function prepareElements() {
    const elements = Array.from(document.querySelectorAll(MOTION_SELECTOR))
      .filter(el => !el.closest('header') && !el.closest('.footer') && !el.classList.contains('scroll-motion'));

    elements.forEach(el => {
      el.classList.remove('show');
      el.classList.add('scroll-motion', 'motion-out');

      const siblings = Array.from(el.parentElement ? el.parentElement.children : []);
      const localIndex = Math.max(0, siblings.indexOf(el));
      const delay = Math.min(160, (localIndex % 4) * 45);
      el.style.setProperty('--motion-delay', `${delay}ms`);
    });

    return elements;
  }

  function initMotion() {
    ensureStyle();
    const elements = prepareElements();
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => {
        el.classList.remove('motion-out');
        el.classList.add('motion-in');
      });
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('motion-out');
          entry.target.classList.add('motion-in');
        } else {
          entry.target.classList.remove('motion-in');
          entry.target.classList.add('motion-out');
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -6% 0px'
    });

    requestAnimationFrame(() => {
      elements.forEach(el => observer.observe(el));
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMotion);
  else initMotion();
})();
