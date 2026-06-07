(function () {
  const MOTION_SELECTOR = [
    '.sec-head', '.sec-title', '.sec-desc', '.page-kicker', '.detail-hero h1', '.detail-hero p',
    '.pain-card', '.product-card', '.trust-card', '.news-card', '.step', '.partner-card',
    '.detail-block', '.side-card', '.faq-card', '.contact-info-panel', '.join-panel', '.join-steps .step',
    '.case-card', '.expert-card', '.assistant-card', '.course-card', '.system-card', '.feature-card',
    '.contact-map', '.contact-info', '.quote-box', '.assess-item', '.flow-item', '.contact-wrap', '.join-wrap',
    '.detail-main > *', '.course-flow > *', '.faq-grid > *', '.product-grid > *', '.pain-grid > *', '.trust-grid > *', '.news-grid > *'
  ].join(',');

  function ensureStyle() {
    const oldStyle = document.getElementById('scrollMotionStyle');
    if (oldStyle) oldStyle.remove();

    const style = document.createElement('style');
    style.id = 'scrollMotionStyle';
    style.textContent = `
      .scroll-motion {
        opacity: 0 !important;
        transform: translate3d(0, 72px, 0) !important;
        filter: none !important;
        transition:
          opacity .82s cubic-bezier(.22,.61,.36,1) var(--motion-delay, 0ms),
          transform .92s cubic-bezier(.22,.61,.36,1) var(--motion-delay, 0ms),
          box-shadow .35s ease !important;
        will-change: opacity, transform;
      }

      .scroll-motion.motion-soft {
        transform: translate3d(0, 42px, 0) !important;
      }

      .scroll-motion.motion-in {
        opacity: 1 !important;
        transform: translate3d(0, 0, 0) !important;
        filter: none !important;
      }

      .scroll-motion.motion-out {
        opacity: 0 !important;
        transform: translate3d(0, 72px, 0) !important;
        filter: none !important;
      }

      .scroll-motion.motion-out.motion-soft {
        transform: translate3d(0, 42px, 0) !important;
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

  function getDelay(el) {
    const parent = el.parentElement;
    if (!parent) return 0;
    const siblings = Array.from(parent.children).filter(child => child.matches && child.matches(MOTION_SELECTOR));
    const index = Math.max(0, siblings.indexOf(el));
    return Math.min(300, (index % 6) * 70);
  }

  function prepareElements() {
    const seen = new Set();
    const elements = Array.from(document.querySelectorAll(MOTION_SELECTOR))
      .filter(el => {
        if (seen.has(el)) return false;
        seen.add(el);
        if (el.closest('header') || el.closest('.footer')) return false;
        if (el.classList.contains('scroll-motion')) return false;
        return true;
      });

    elements.forEach(el => {
      el.classList.remove('show', 'motion-in');
      el.classList.add('scroll-motion', 'motion-out');

      if (el.matches('.sec-head,.sec-title,.sec-desc,.page-kicker,.detail-hero h1,.detail-hero p,.quote-box')) {
        el.classList.add('motion-soft');
      }

      el.style.setProperty('--motion-delay', `${getDelay(el)}ms`);
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
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.remove('motion-out');
          el.classList.add('motion-in');
        } else {
          el.classList.remove('motion-in');
          el.classList.add('motion-out');
        }
      });
    }, {
      threshold: 0.14,
      rootMargin: '0px 0px -10% 0px'
    });

    requestAnimationFrame(() => {
      elements.forEach(el => observer.observe(el));
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMotion);
  else initMotion();
})();
