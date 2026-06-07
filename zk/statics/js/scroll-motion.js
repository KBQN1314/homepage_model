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
    '[class*="wrap"]', '.course-flow', '.detail-main', '.detail-layout', '.container'
  ].join(',');

  const SELF_COURSE_REPLACEMENTS = [
    ['心脑学习力自主营（数学）（数学）', '心脑学习力自主营'],
    ['心脑学习力自主营（数学）', '心脑学习力自主营'],
    ['心脑学习力自主营 （数学）', '心脑学习力自主营'],
    ['自主营（数学）', '自主营'],
    ['自主营 （数学）', '自主营'],
    ['数学自学', 'AI自主'],
    ['数学自主营', 'AI自主'],
    ['面向小学三年级至初中三年级，围绕数学教材自学训练', '面向小学三年级至初中三年级，围绕语文、数学、英语等课本进行自主学习训练'],
    ['围绕数学教材自学训练', '围绕语文、数学、英语等课本进行自主学习训练'],
    ['很多孩子数学学不好，并不只是知识点不会，而是没有形成独立学习新知识的路径。', '很多孩子学不好，并不只是知识点不会，而是没有形成独立学习新知识的路径。'],
    ['一本数学教材', '一本课本或教材'],
    ['围绕一本数学教材', '围绕一本课本或教材'],
    ['数学教材', '课本/教材'],
    ['新数学教材', '新课本'],
    ['数学书', '课本'],
    ['数学定义', '定义'],
    ['数学定理', '定理'],
    ['数学知识全景图', '知识全景图'],
    ['跨章节数学知识全景图', '跨章节知识全景图'],
    ['数学知识点', '知识点'],
    ['数学教材的核心学习任务', '课本/教材的核心学习任务'],
    ['数学教材完成核心学习任务', '课本/教材完成核心学习任务']
  ];

  function normalizeSelfCourseTextValue(value) {
    let next = value;
    SELF_COURSE_REPLACEMENTS.forEach(([from, to]) => { next = next.replaceAll(from, to); });
    next = next.replaceAll('心脑学习力自主营（数学）', '心脑学习力自主营');
    next = next.replaceAll('心脑学习力自主营  ', '心脑学习力自主营 ');
    return next;
  }

  function normalizeSelfCourseTexts(root = document.body) {
    if (!root) return;
    document.title = normalizeSelfCourseTextValue(document.title);
    document.querySelectorAll('meta[content]').forEach(meta => { meta.content = normalizeSelfCourseTextValue(meta.content); });

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (parent && ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return SELF_COURSE_REPLACEMENTS.some(([from]) => node.nodeValue.includes(from)) || node.nodeValue.includes('心脑学习力自主营（数学）')
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => { node.nodeValue = normalizeSelfCourseTextValue(node.nodeValue); });
  }

  function ensureStyle() {
    const oldStyle = document.getElementById('scrollMotionStyle');
    if (oldStyle) oldStyle.remove();

    const style = document.createElement('style');
    style.id = 'scrollMotionStyle';
    style.textContent = `
      .scroll-motion,
      .scroll-motion.reveal,
      .scroll-motion.reveal.show {
        opacity: 0 !important;
        transform: translate3d(0, 34px, 0) !important;
        transition-property: opacity, transform !important;
        transition-duration: 1.02s, 1.16s !important;
        transition-timing-function: cubic-bezier(.19, 1, .22, 1), cubic-bezier(.19, 1, .22, 1) !important;
        transition-delay: var(--motion-delay, 0ms), var(--motion-delay, 0ms) !important;
        will-change: opacity, transform;
      }

      .scroll-motion.motion-soft,
      .scroll-motion.motion-soft.reveal,
      .scroll-motion.motion-soft.reveal.show {
        transform: translate3d(0, 22px, 0) !important;
        transition-duration: 1s, 1.12s !important;
      }

      .scroll-motion.motion-card,
      .scroll-motion.motion-card.reveal,
      .scroll-motion.motion-card.reveal.show {
        transform: translate3d(0, 42px, 0) !important;
      }

      .scroll-motion.motion-in,
      .scroll-motion.motion-in.reveal,
      .scroll-motion.motion-in.reveal.show {
        opacity: 1 !important;
        transform: translate3d(0, 0, 0) !important;
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

  function getClassSignature(el) {
    const classes = Array.from(el.classList || []);
    const useful = classes.find(cls => /card|item|step|block|panel|box|col|cell|article|news|case|expert|course|faq|flow|pain|product|trust|partner|feature|service/i.test(cls));
    return useful || '';
  }

  function areSimilarModules(a, b) {
    if (!a || !b) return false;
    if (a.tagName === b.tagName && ['ARTICLE', 'LI'].includes(a.tagName)) return true;
    const aSig = getClassSignature(a);
    const bSig = getClassSignature(b);
    if (aSig && bSig && aSig === bSig) return true;
    const aRole = Array.from(a.classList || []).some(cls => /card|item|step|block|panel|box/i.test(cls));
    const bRole = Array.from(b.classList || []).some(cls => /card|item|step|block|panel|box/i.test(cls));
    return aRole && bRole;
  }

  function looksLikeModuleGroup(parent) {
    if (!parent || parent.nodeType !== 1) return false;
    if (parent.closest(EXCLUDE_SELECTOR)) return false;
    if (parent.matches('body,html,main,section')) return false;

    const children = Array.from(parent.children).filter(isMeaningfulModule);
    if (children.length < 2) return false;

    for (let i = 0; i < children.length; i += 1) {
      let similarCount = 1;
      for (let j = 0; j < children.length; j += 1) {
        if (i === j) continue;
        if (areSimilarModules(children[i], children[j])) similarCount += 1;
      }
      if (similarCount >= 2) return true;
    }

    return false;
  }

  function getModuleChildren(parent) {
    if (!parent) return [];
    const children = Array.from(parent.children).filter(isMeaningfulModule);
    if (children.length < 2) return children;

    const firstSimilar = children.find(child => children.some(other => other !== child && areSimilarModules(child, other)));
    if (!firstSimilar) return children;
    return children.filter(child => areSimilarModules(firstSimilar, child));
  }

  function findStructuralGroup(el) {
    let current = el.parentElement;
    while (current && current !== document.body) {
      if ((current.matches(NAMED_GROUP_SELECTOR) || looksLikeModuleGroup(current)) && looksLikeModuleGroup(current)) return current;
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
    const isCard = el.matches(CARD_LIKE_SELECTOR) || Boolean(group);

    if (group && isCard) return Math.min(820, index * 145);
    if (group) return Math.min(620, index * 115);
    if (isCard) return Math.min(420, (index % 6) * 92);
    return Math.min(180, (index % 3) * 60);
  }

  function shouldAnimateParentInstead(el, selected) {
    const parent = el.parentElement;
    if (!parent) return false;
    if (selected.has(parent) && !el.matches(CARD_LIKE_SELECTOR) && !findStructuralGroup(el)) return true;
    return false;
  }

  function addStructuralGroupChildren(selected) {
    const candidates = Array.from(document.querySelectorAll('section *, main *'));
    candidates.forEach(parent => {
      if (!looksLikeModuleGroup(parent)) return;
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
    normalizeSelfCourseTexts();
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

  setTimeout(() => normalizeSelfCourseTexts(), 120);
  setTimeout(() => normalizeSelfCourseTexts(), 420);
  setTimeout(() => normalizeSelfCourseTexts(), 900);
})();
