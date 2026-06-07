(function () {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const selectors = [
    '.sec-head', '.sec-title', '.sec-desc', '.page-kicker', '.breadcrumb',
    '.pain-card', '.product-card', '.trust-card', '.news-card', '.partner-card', '.step',
    '.course-card', '.system-card', '.detail-block', '.side-card', '.detail-cta-wrap',
    '.faq-card', '.contact-info-panel', '.contact-detail-item', '.contact-qr-card',
    '.expert-card', '.assistant-card', '.case-card', '.article-card', '.limited-card',
    '.join-panel', '.join-steps .step', '.team-card', '.value-card', '.vision-step',
    '.course-flow .flow-item', '.challenge-card', '.challenge-grid > *',
    '.contact-wrap > *', '.footer-grid > *'
  ];

  function shouldSkip(el) {
    return !el || el.closest('header') || el.closest('.nav-panel') || el.closest('.sticky') || el.closest('.zk-page-transition');
  }

  function effectFor(el, index) {
    if (el.matches('.sec-head,.sec-title,.sec-desc,.page-kicker,.breadcrumb')) return 'fade-down';
    if (el.matches('.side-card,.contact-info-panel:nth-child(even),.contact-map')) return 'fade-left';
    if (el.matches('.join-panel,.contact-info-panel:nth-child(odd)')) return 'fade-right';
    if (el.matches('.partner-card,.expert-card,.assistant-card')) return 'zoom-up';
    return index % 3 === 1 ? 'fade-up' : index % 3 === 2 ? 'fade-right' : 'fade-up';
  }

  function prepare() {
    const nodes = [];
    selectors.forEach(selector => document.querySelectorAll(selector).forEach(el => nodes.push(el)));
    const unique = [...new Set(nodes)].filter(el => !shouldSkip(el));
    unique.forEach((el, index) => {
      if (el.dataset.scrollReady === '1') return;
      el.dataset.scrollReady = '1';
      el.dataset.scrollEffect = el.dataset.scrollEffect || effectFor(el, index);
      el.style.setProperty('--scroll-delay', `${Math.min(index % 6, 5) * 70}ms`);
      if (reduceMotion) {
        el.classList.add('scroll-in');
      } else {
        el.classList.add('scroll-reveal');
      }
    });
    return unique;
  }

  function observe() {
    const items = prepare();
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('scroll-in'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(el => {
      if (!el.classList.contains('scroll-in')) observer.observe(el);
    });
  }

  function boot() {
    observe();
    setTimeout(observe, 350);
    setTimeout(observe, 1000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
