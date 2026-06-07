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
    'section :where(article,li)',
    'section :where(div[class],article[class],li[class])',
    '[class*="grid"] > *', '[class*="list"] > *', '[class*="wrap"] > *',
    '[class$="-card"]', '[class*="-card "]', '[class$="-item"]', '[class*="-item "]',
    '[class$="-step"]', '[class*="-step "]', '.detail-block', '.flow-item'
  ].join(',');

  const CARD_LIKE_SELECTOR = [
    'article', 'li', '[class$="-card"]', '[class*="-card "]', '[class$="-item"]', '[class*="-item "]',
    '[class$="-step"]', '[class*="-step "]', '.flow-item', '.detail-block'
  ].join(',');

  const NAMED_GROUP_SELECTOR = [
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
        transform: translate3d(0, 28px, 0);
        transition-property: opacity, transform;
        transition-duration: .94s, 1.08s;
        transition-timing-function: cubic-bezier(.19, 1, .22, 1), cubic-bezier(.19, 1, .22, 1);
        transition-delay: var(--motion-delay, 0ms), var(--motion-delay, 0ms);
        will-change: opacity, transform;
      }

      .scroll-motion.motion-soft {
        transform: translate3d(0, 18px, 0);
        transition-duration: .98s, 1.12s;
      }

      .scroll-motion.motion-card {
        transform: translate3d(0, 32px, 0);
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
    if (el.classList.contains('motion-ignore')) return false;

    const tag = el.tagName.toLowerCase();
    if (['br', 'hr', 'img', 'svg', 'path'].includes(tag)) return false;

    const rect = el.getBoundingClientRect();
    if (rect.width < 24 || rect.height < 18) return false;

    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;

    return true;
  }

  function isMeaningfulModule(el) {
    if (!isVisibleContent(el)) return false;
    const tag = el.tagName.toLowerCase();
    if (['a', 'span', 'b', 'strong', 'em', 'i', 'small', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) return false;
    const rect = el.getBoundingClientRect();
    return rect.width >= 80 && rect.height >= 42;
  }

  function looksLikeModuleGroup(parent) {
    if (!parent || parent.nodeType !== 1) return false;
    if (parent.closest(EXCLUDE_SELECTOR)) return false;
    if (parent.matches('body,html,main,section,.container')) return false;

    const children = Array.from(parent.children).filter(isMeaningfulModule);
    if (children.length < 2) return false;

    const first = children[0];
    const firstTag = first.tagName;
    const similarCount = children.filter(child => {
      const sameTag = child.tagName === firstTag;
      const childClass = Array.from(child.classList).find(cls => /card|item|step|block|panel|box|col|cell|article|news|case|expert|course|faq|flow/i.test(cls));
      const firstClass = Array.from(first.classList).find(cls => /card|item|step|block|panel|box|col|cell|article|news|case|expert|course|faq|flow/i.test(cls));
      return sameTag || (childClass && firstClass && childClass === firstClass);
    }).length;

    return similarCount >= 2;
  }

  function getModuleChildren(parent) {
    if (!parent) return [];
    return Array.from(parent.children).filter(isMeaningfulModule);
  }

  function findStructuralGroup(el) {
    let current = el.parentElement;
    while (current && current !== document.body) {
      if (current.matches(NAMED_GROUP_SELECTOR) || looksLikeModuleGroup(current)) return current;
      current = current.parentElement;
    }
    return null;
  }

  function getGroupIndex(el) {
    const group = findStructuralGroup(el);
    if (!group) return 0;
    const siblings = getModuleChildren(group);
    const index = siblings.indexOf(el);
    return index < 0 ? 0 : index;
  }

  function getDelay(el) {
    const group = findStructuralGroup(el);
    const index = getGroupIndex(el);
    const isCard = el.matches(CARD_LIKE_SELECTOR);

    if (group && isCard) return Math.min(420, index * 96);
    if (group) return Math.min(340, index * 78);
    if (isCard) return Math.min(260, (index % 4) * 72);
    return Math.min(150, (index % 3) * 50);
  }

  function shouldAnimateParentInstead(el, selected) {
    const parent = el.parentElement;
    if (!parent) return false;
    if (selected.has(parent) && !el.matches(CARD_LIKE_SELECTOR) && !findStructuralGroup(el)) return true;
    return false;
  }

  function addStructuralGroupChildren(selected) {
    const candidates = Array.from(document.querySelectorAll('section *'));
    candidates.forEach(parent => {
      if (!looksLikeModuleGroup(parent) && !parent.matches(NAMED_GROUP_SELECTOR)) return;
      getModuleChildren(parent).forEach(child => selected.add(child));
    });
  }

  function prepareElements() {
    const selected = new Set();
    const raw = Array.from(document.querySelectorAll(TARGET_SELECTOR));

    raw.forEach(el => {
      if (!isVisibleContent(el)) return;
      selected.add(el);
    });

    addStructuralGroupChildren(selected);

    const elements = Array.from(selected).filter(el => !shouldAnimateParentInstead(el, selected));

    elements.forEach(el => {
      el.classList.remove('show', 'motion-in');
      el.classList.add('scroll-motion');

      if (el.matches('.sec-head,.sec-title,.sec-desc,.page-kicker,.breadcrumb,.detail-hero h1,.detail-hero p,.detail-tags,.quote-box')) {
        el.classList.add('motion-soft');
      }

      if (el.matches(CARD_LIKE_SELECTOR) || findStructuralGroup(el)) {
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
