(function () {
  const MOTION_SELECTOR = [
    '.sec-head', '.sec-title', '.sec-desc', '.page-kicker', '.detail-hero h1', '.detail-hero p',
    '.pain-card', '.product-card', '.trust-card', '.news-card', '.step', '.partner-card',
    '.detail-block', '.side-card', '.faq-card', '.contact-info-panel', '.join-panel', '.join-steps .step',
    '.case-card', '.expert-card', '.assistant-card', '.course-card', '.system-card', '.feature-card',
    '.contact-map', '.contact-info', '.quote-box', '.assess-item', '.flow-item'
  ].join(',');

  function ensureStyle() {
    if (document.getElementById('scrollMotionStyle')) return;
    const style = document.createElement('style');
    style.id = 'scrollMotionStyle';
    style.textContent = `
      .scroll-motion {
        opacity: 0;
        transform: translate3d(0, 54px, 0) scale(.985);
        filter: blur(4px);
        transition:
          opacity .78s cubic-bezier(.22,.61,.36,1) var(--motion-delay, 0ms),
          transform .9s cubic-bezier(.22,.61,.36,1) var(--motion-delay, 0ms),
          filter .9s ease var(--motion-delay, 0ms);
        will-change: opacity, transform, filter;
      }
      .scroll-motion.motion-down { transform: translate3d(0, -46px, 0) scale(.99); }
      .scroll-motion.motion-left { transform: translate3d(54px, 0, 0) scale(.99); }
      .scroll-motion.motion-right { transform: translate3d(-54px, 0, 0) scale(.99); }
      .scroll-motion.motion-zoom { transform: translate3d(0, 30px, 0) scale(.94); }
      .scroll-motion.motion-in {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
        filter: blur(0);
      }
      @media (prefers-reduced-motion: reduce) {
        .scroll-motion { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function prepareElements() {
    const elements = Array.from(document.querySelectorAll(MOTION_SELECTOR))
      .filter(el => !el.closest('header') && !el.closest('.footer') && !el.classList.contains('scroll-motion'));

    elements.forEach((el, index) => {
      el.classList.add('scroll-motion');
      const localIndex = Array.from(el.parentElement ? el.parentElement.children : []).indexOf(el);
      const delay = Math.max(0, Math.min(180, (localIndex % 4) * 55));
      el.style.setProperty('--motion-delay', `${delay}ms`);

      if (el.matches('.sec-head,.page-kicker,.detail-hero h1')) el.classList.add('motion-down');
      else if (el.matches('.side-card,.contact-map')) el.classList.add('motion-left');
      else if (el.matches('.contact-info,.join-panel')) el.classList.add('motion-right');
      else if (el.matches('.partner-card,.flow-item')) el.classList.add('motion-zoom');
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
        if (entry.isIntersecting) {
          entry.target.classList.add('motion-in');
        } else if (entry.boundingClientRect.top > window.innerHeight) {
          entry.target.classList.remove('motion-in');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    elements.forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMotion);
  else initMotion();
})();
