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

  const STAGGER_PARENT_SELECTOR = [
    '[class*="grid"]', '[class*="list"]', '[class*="steps"]', '[class*="cards"]',
    '[class*="wrap"]', '.course-flow', '.detail-main', '.detail-layout'
  ].join(',');

  function ensureStyle() {
    const oldStyle = document.getElementById('scrollMotionStyle');
    if (oldStyle) oldStyle.remove();

    const style = document.createElement('style');
    style.id = 'scrollMotionStyle';
    style.textContent = `
      .scroll-motion {
        opacity: 0;
        transform: translate3d(0, 26px, 0);
        transition-property: opacity, transform;
        transition-duration: .86s, .96s;
        transition-timing-function: cubic-bezier(.19, 1, .22, 1), cubic-bezier(.19, 1, .22, 1);
        transition-delay: var(--motion-delay, 0ms), var(--motion-delay, 0ms);
        will-change: opacity, transform;
      }

      .scroll-motion.motion-soft {
        transform: translate3d(0, 18px, 0);
        transition-duration: .9s, 1.02s;
      }

      .scroll-motion.motion-card {
        transform: translate3d(0, 30px, 0);
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

  function getVisibleChildren(parent) {
    if (!parent) return [];
    return Array.from(parent.children).filter(child => {
      if (!child.matches || !child.matches(TARGET_SELECTOR)) return false;
      return isVisibleContent(child) || child.classList.contains('scroll-motion');
    });
  }

  function getStaggerGroup(el) {
    const parent = el.parentElement;
    if (!parent) return null;

    if (parent.matches(STAGGER_PARENT_SELECTOR)) return parent;

    const grand = parent.parentElement;
    if (grand && grand.matches(STAGGER_PARENT_SELECTOR) && parent.children.length <= 1) return grand;

    return parent;
  }

  function getGroupIndex(el) {
    const group = getStaggerGroup(el);
    if (!group) return 0;
    const siblings = getVisibleChildren(group);
    const index = siblings.indexOf(el);
    return index < 0 ? 0 : index;
  }

  function getDelay(el) {
    const index = getGroupIndex(el);
    const isCard = el.matches(CARD_LIKE_SELECTOR);
    const group = getStaggerGroup(el);
    const isStaggerGroup = group && group.matches && group.matches(STAGGER_PARENT_SELECTOR);

    if (isCard && isStaggerGroup) return Math.min(240, index * 62);
    if (isCard) return Math.min(180, (index % 4) * 46);
    return Math.min(120, (index % 3) * 34);
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
