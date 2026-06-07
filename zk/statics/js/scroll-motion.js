(function () {
  const MOTION_SELECTOR = [
    '.sec-head',
    '.page-kicker',
    '.detail-hero h1',
    '.detail-hero p',
    '.pain-card',
    '.product-card',
    '.trust-card',
    '.news-card',
    '.step',
    '.partner-card',
    '.detail-block',
    '.side-card',
    '.faq-card',
    '.contact-info-panel',
    '.join-panel',
    '.case-card',
    '.expert-card',
    '.assistant-card',
    '.course-card',
    '.system-card',
    '.feature-card',
    '.contact-map',
    '.contact-info',
    '.quote-box',
    '.assess-item',
    '.flow-item'
  ].join(',');

  const CARD_SELECTOR = [
    '.pain-card', '.product-card', '.trust-card', '.news-card', '.step', '.partner-card',
    '.faq-card', '.case-card', '.expert-card', '.assistant-card', '.course-card',
    '.system-card', '.feature-card', '.assess-item', '.flow-item'
  ].join(',');

  function ensureStyle() {
    const oldStyle = document.getElementById('scrollMotionStyle');
    if (oldStyle) oldStyle.remove();

    const style = document.createElement('style');
    style.id = 'scrollMotionStyle';
    style.textContent = `
      .scroll-motion {
        opacity: 0;
        transform: translate3d(0, 34px, 0);
        transition-property: opacity, transform;
        transition-duration: .9s, .95s;
        transition-timing-function: cubic-bezier(.19, 1, .22, 1), cubic-bezier(.19, 1, .22, 1);
        transition-delay: var(--motion-delay, 0ms), var(--motion-delay, 0ms);
        will-change: opacity, transform;
      }

      .scroll-motion.motion-soft {
        transform: translate3d(0, 22px, 0);
        transition-duration: 1s, 1.05s;
      }

      .scroll-motion.motion-card {
        transform: translate3d(0, 38px, 0);
      }

      .scroll-motion.motion-in {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      @media (prefers-reduced-motion: reduce) {
        .scroll-motion {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function getDelay(el) {
    if (!el.matches(CARD_SELECTOR)) return 0;
    const parent = el.parentElement;
    if (!parent) return 0;
    const siblings = Array.from(parent.children).filter(child => child.matches && child.matches(CARD_SELECTOR));
    const index = Math.max(0, siblings.indexOf(el));
    return Math.min(220, (index % 6) * 52);
  }

  function prepareElements() {
    const seen = new Set();
    const elements = Array.from(document.querySelectorAll(MOTION_SELECTOR)).filter(el => {
      if (seen.has(el)) return false;
      seen.add(el);
      if (el.closest('header') || el.closest('.footer')) return false;
      if (el.classList.contains('scroll-motion')) return false;
      return true;
    });

    elements.forEach(el => {
      el.classList.remove('show', 'motion-in');
      el.classList.add('scroll-motion');

      if (el.matches('.sec-head,.page-kicker,.detail-hero h1,.detail-hero p,.quote-box')) {
        el.classList.add('motion-soft');
      }

      if (el.matches(CARD_SELECTOR)) {
        el.classList.add('motion-card');
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
      elements.forEach(el => el.classList.add('motion-in'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add('motion-in');
        } else if (entry.boundingClientRect.top > window.innerHeight * 0.95 || entry.boundingClientRect.bottom < 0) {
          el.classList.remove('motion-in');
        }
      });
    }, {
      threshold: 0.16,
      rootMargin: '0px 0px -6% 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMotion);
  } else {
    initMotion();
  }
})();
