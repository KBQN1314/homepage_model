(function () {
  const EXCLUDE_SELECTOR = [
    'header', '.footer', 'footer', 'nav', '.nav-wrap', '.nav-cta', '.hamb', '.sticky',
    'script', 'style', '.loading', '.zk-page-transition', '.hero-dots', '.progress-line',
    '.btn', 'button', 'input', 'select', 'textarea', 'form'
  ].join(',');

  const TARGET_SELECTOR = [
    '.sec-head', '.sec-title', '.sec-desc', '.page-kicker', '.breadcrumb',
    '.hero .floating-card', '.quote-box', '.assess-wrap', '.contact-wrap', '.join-wrap',
    '.detail-hero h1', '.detail-hero p', '.detail-tags', '.detail-layout > *',
    '.detail-main > *', '.side-card', '.detail-cta-wrap',
    '.container > :where(div,article,section,ul,ol):not(.hero-dots):not(.nav-wrap)',
    '.grid > *', '[class*="grid"] > *', '[class*="list"] > *', '[class*="wrap"] > *',
    '[class$="-card"]', '[class*="-card "]', '[class$="-item"]', '[class*="-item "]',
    '[class$="-step"]', '[class*="-step "]', '.detail-block', '.flow-item'
  ].join(',');

  const CARD_LIKE_SELECTOR = [
    '[class$="-card"]', '[class*="-card "]', '[class$="-item"]', '[class*="-item "]',
    '[class$="-step"]', '[class*="-step "]', '.flow-item', '.detail-block'
  ].join(',');

  function ensureStyle() {
    const oldStyle = document.getElementById('scrollMotionStyle');
    if (oldStyle) oldStyle.remove();

    const style = document.createElement('style');
    style.id = 'scrollMotionStyle';
    style.textContent = `
      .scroll-motion {
        opacity: 0;
        transform: translate3d(0, 30px, 0);
        transition-property: opacity, transform;
        transition-duration: .82s, .92s;
        transition-timing-function: cubic-bezier(.19, 1, .22, 1), cubic-bezier(.19, 1, .22, 1);
        transition-delay: var(--motion-delay, 0ms), var(--motion-delay, 0ms);
        will-change: opacity, transform;
      }

      .scroll-motion.motion-soft {
        transform: translate3d(0, 20px, 0);
        transition-duration: .88s, 1s;
      }

      .scroll-motion.motion-card {
        transform: translate3d(0, 34px, 0);
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

  function isVisibleContent(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.closest(EXCLUDE_SELECTOR)) return false;
    if (el.classList.contains('scroll-motion')) return false;
    if (el.classList.contains('motion-ignore')) return false;

    const tag = el.tagName.toLowerCase();
    if (['br', 'hr', 'img', 'svg', 'path'].includes(tag)) return false;

    const rect = el.getBoundingClientRect();
    if (rect.width < 24 || rect.height < 18) return false;

    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;

    return true;
  }

  function getGroupIndex(el) {
    const parent = el.parentElement;
    if (!parent) return 0;
    const siblings = Array.from(parent.children).filter(child => child.matches && child.matches(TARGET_SELECTOR) && isVisibleContent(child));
    return Math.max(0, siblings.indexOf(el));
  }

  function getDelay(el) {
    const index = getGroupIndex(el);
    const isCard = el.matches(CARD_LIKE_SELECTOR);
    const base = isCard ? 48 : 36;
    return Math.min(240, (index % 6) * base);
  }

  function shouldAnimateParentInstead(el, selected) {
    const parent = el.parentElement;
    if (!parent) return false;
    if (selected.has(parent) && !el.matches(CARD_LIKE_SELECTOR)) return true;
    return false;
  }

  function prepareElements() {
    const selected = new Set();
    const raw = Array.from(document.querySelectorAll(TARGET_SELECTOR));

    raw.forEach(el => {
      if (!isVisibleContent(el)) return;
      selected.add(el);
    });

    const elements = Array.from(selected).filter(el => !shouldAnimateParentInstead(el, selected));

    elements.forEach(el => {
      el.classList.remove('show', 'motion-in');
      el.classList.add('scroll-motion');

      if (el.matches('.sec-head,.sec-title,.sec-desc,.page-kicker,.breadcrumb,.detail-hero h1,.detail-hero p,.detail-tags,.quote-box')) {
        el.classList.add('motion-soft');
      }

      if (el.matches(CARD_LIKE_SELECTOR)) {
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
        } else if (entry.boundingClientRect.top > window.innerHeight * 0.94 || entry.boundingClientRect.bottom < 0) {
          el.classList.remove('motion-in');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -5% 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMotion);
  } else {
    initMotion();
  }
})();
