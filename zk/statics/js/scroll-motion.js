(function () {
  const SELF_REPLACEMENTS = [
    ['心脑学习力自主营（数学）（数学）', '心脑学习力自主营'],
    ['心脑学习力自主营（数学）', '心脑学习力自主营'],
    ['自主营（数学）', '自主营'],
    ['数学自学', 'AI自主'],
    ['数学自主营', 'AI自主'],
    ['围绕数学教材自学训练', '围绕语文、数学、英语等课本进行自主学习训练'],
    ['数学教材', '课本/教材'],
    ['新数学教材', '新课本'],
    ['数学书', '课本'],
    ['一本数学教材', '一本课本或教材'],
    ['围绕一本数学教材', '围绕一本课本或教材'],
    ['数学定义', '定义'],
    ['数学定理', '定理'],
    ['数学知识全景图', '知识全景图'],
    ['跨章节数学知识全景图', '跨章节知识全景图']
  ];

  function normalizeTextValue(value) {
    let next = value || '';
    SELF_REPLACEMENTS.forEach(([from, to]) => { next = next.replaceAll(from, to); });
    return next;
  }

  function normalizeSelfCourseTexts(root = document.body) {
    if (!root) return;
    document.title = normalizeTextValue(document.title);
    document.querySelectorAll('meta[content]').forEach(meta => { meta.content = normalizeTextValue(meta.content); });
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (parent && ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return SELF_REPLACEMENTS.some(([from]) => node.nodeValue.includes(from)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => { node.nodeValue = normalizeTextValue(node.nodeValue); });
  }

  function injectStyle() {
    const old = document.getElementById('siteMotionAndMobileStyle');
    if (old) old.remove();
    const style = document.createElement('style');
    style.id = 'siteMotionAndMobileStyle';
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
      .scroll-motion.motion-card,
      .scroll-motion.motion-card.reveal,
      .scroll-motion.motion-card.reveal.show { transform: translate3d(0, 42px, 0) !important; }
      .scroll-motion.motion-soft,
      .scroll-motion.motion-soft.reveal,
      .scroll-motion.motion-soft.reveal.show { transform: translate3d(0, 22px, 0) !important; }
      .scroll-motion.motion-in,
      .scroll-motion.motion-in.reveal,
      .scroll-motion.motion-in.reveal.show { opacity: 1 !important; transform: translate3d(0, 0, 0) !important; }

      @media (max-width: 1100px) {
        body.mobile-menu-open::before {
          content: '';
          position: fixed;
          inset: 0;
          background: rgba(3, 24, 18, .42);
          z-index: 998;
          pointer-events: none;
        }
        header .hamb {
          display: inline-flex !important;
          cursor: pointer;
          position: relative;
          z-index: 1005;
          background: rgba(255,255,255,.92) !important;
          border-color: rgba(4,92,57,.2) !important;
          box-shadow: 0 8px 24px rgba(16,27,23,.12) !important;
        }
        header .hamb i { background: #045c39 !important; transition: transform .25s ease, opacity .25s ease; }
        header .nav-cta { display: none !important; }
        header nav,
        header .nav-dropdowns {
          position: fixed !important;
          left: 16px !important;
          right: 16px !important;
          top: 82px !important;
          display: grid !important;
          gap: 0 !important;
          padding: 18px 22px 22px !important;
          background: #ffffff !important;
          color: #1e2b27 !important;
          border: 1px solid rgba(4,92,57,.08) !important;
          border-radius: 18px !important;
          box-shadow: 0 22px 60px rgba(3,24,18,.26) !important;
          transform: translate3d(0,-14px,0) !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          transition: opacity .28s ease, transform .28s ease, visibility .28s ease !important;
          z-index: 1004 !important;
          max-height: calc(100vh - 108px) !important;
          overflow-y: auto !important;
        }
        body.mobile-menu-open header nav,
        body.mobile-menu-open header .nav-dropdowns {
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          transform: translate3d(0,0,0) !important;
        }
        header nav a,
        header .nav-dropdowns a,
        header .nav-link,
        header .nav-direct {
          display: block !important;
          padding: 15px 4px !important;
          color: #1e2b27 !important;
          border-bottom: 1px solid rgba(4,92,57,.1) !important;
          font-size: 17px !important;
          font-weight: 700 !important;
          line-height: 1.35 !important;
          opacity: 1 !important;
          text-shadow: none !important;
        }
        header nav a:hover,
        header nav a.nav-active,
        header nav a.active,
        header .nav-link:hover,
        header .nav-direct:hover {
          color: #045c39 !important;
          background: rgba(199,175,130,.13) !important;
          padding-left: 14px !important;
        }
        header nav a::after,
        header .nav-link::after,
        header .nav-direct::after {
          display: none !important;
        }
        header .nav-item { width: 100% !important; }
        header .nav-panel {
          position: static !important;
          display: none !important;
          transform: none !important;
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          box-shadow: none !important;
          border: 0 !important;
          background: #f7f5ef !important;
          padding: 6px 14px !important;
          margin: 0 0 8px !important;
          border-radius: 12px !important;
        }
        header .nav-item.open .nav-panel { display: block !important; }
        body.mobile-menu-open header .hamb i:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        body.mobile-menu-open header .hamb i:nth-child(2) { opacity: 0; }
        body.mobile-menu-open header .hamb i:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
      }

      @media (prefers-reduced-motion: reduce) {
        .scroll-motion { opacity: 1 !important; transform: none !important; transition: none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function setupMobileMenu() {
    const hamb = document.querySelector('.hamb');
    if (!hamb || hamb.dataset.mobileMenuReady === 'true') return;
    hamb.dataset.mobileMenuReady = 'true';
    hamb.setAttribute('role', 'button');
    hamb.setAttribute('aria-label', '打开或关闭导航菜单');
    hamb.setAttribute('aria-expanded', 'false');

    hamb.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      const open = !document.body.classList.contains('mobile-menu-open');
      document.body.classList.toggle('mobile-menu-open', open);
      hamb.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.addEventListener('click', function (event) {
      if (!document.body.classList.contains('mobile-menu-open')) return;
      if (event.target.closest('header')) return;
      document.body.classList.remove('mobile-menu-open');
      hamb.setAttribute('aria-expanded', 'false');
    });

    document.querySelectorAll('header nav a, header .nav-dropdowns a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (link.classList.contains('nav-link') && link.closest('.has-dropdown')) return;
        document.body.classList.remove('mobile-menu-open');
        hamb.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const EXCLUDE_SELECTOR = 'header,.footer,footer,nav,.nav-wrap,.nav-cta,.hamb,.sticky,script,style,.loading,.zk-page-transition,.hero-dots,.progress-line,.btn,button,input,select,textarea,form';
  const TARGET_SELECTOR = '.sec-head,.sec-title,.sec-desc,.page-kicker,.breadcrumb,.quote-box,.assess-wrap,.contact-wrap,.join-wrap,.detail-layout>* ,.detail-main>* ,.side-card,.detail-cta-wrap,.container>:where(div,article,section,ul,ol):not(.hero-dots):not(.nav-wrap),section :where(article,li),section :where(div[class],article[class],li[class]),[class*="grid"]>*,[class*="list"]>*,[class*="wrap"]>*,[class$="-card"],[class*="-card "],[class$="-item"],[class*="-item "],[class$="-step"],[class*="-step "],.detail-block,.flow-item';
  const CARD_SELECTOR = 'article,li,[class$="-card"],[class*="-card "],[class$="-item"],[class*="-item "],[class$="-step"],[class*="-step "],.flow-item,.detail-block';

  function isVisible(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.closest(EXCLUDE_SELECTOR)) return false;
    const tag = el.tagName.toLowerCase();
    if (['br', 'hr', 'img', 'svg', 'path', 'a', 'span', 'b', 'strong', 'em', 'i', 'small'].includes(tag)) return false;
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return rect.width >= 24 && rect.height >= 18 && style.display !== 'none' && style.visibility !== 'hidden';
  }

  function groupChildren(parent) {
    if (!parent) return [];
    return Array.from(parent.children).filter(child => isVisible(child) && !['P','H1','H2','H3','H4','H5','H6'].includes(child.tagName));
  }

  function getDelay(el) {
    const parent = el.parentElement;
    const siblings = groupChildren(parent);
    const index = siblings.indexOf(el);
    if (index >= 0 && siblings.length >= 2) return Math.min(820, index * 145);
    if (el.matches(CARD_SELECTOR)) return Math.min(420, (index < 0 ? 0 : index % 6) * 92);
    return 0;
  }

  function setupScrollMotion() {
    const set = new Set();
    document.querySelectorAll(TARGET_SELECTOR).forEach(el => { if (isVisible(el)) set.add(el); });
    document.querySelectorAll('section *, main *').forEach(parent => {
      const children = groupChildren(parent);
      if (children.length >= 2) children.forEach(child => set.add(child));
    });
    const elements = Array.from(set);
    elements.forEach(el => {
      el.classList.remove('show', 'motion-in');
      el.classList.add('scroll-motion');
      if (el.matches(CARD_SELECTOR)) el.classList.add('motion-card');
      if (el.matches('.sec-head,.sec-title,.sec-desc,.page-kicker,.breadcrumb,.quote-box')) el.classList.add('motion-soft');
      el.style.setProperty('--motion-delay', `${getDelay(el)}ms`);
    });

    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('motion-in'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('motion-in');
        else if (entry.boundingClientRect.top > window.innerHeight * .94 || entry.boundingClientRect.bottom < 0) entry.target.classList.remove('motion-in');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    elements.forEach(el => observer.observe(el));
  }

  function init() {
    injectStyle();
    setupMobileMenu();
    normalizeSelfCourseTexts();
    setupScrollMotion();
    setTimeout(normalizeSelfCourseTexts, 160);
    setTimeout(setupMobileMenu, 300);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
