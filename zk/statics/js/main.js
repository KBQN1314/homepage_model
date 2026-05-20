const header = document.getElementById('header');
const loading = document.querySelector('.loading');
const hero = document.querySelector('.hero');
const heroInner = document.querySelector('.hero-inner');
const progress = document.querySelector('.progress-line');
const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.hero-dots button')];
const hamburger = document.querySelector('.hamb');
const modal = document.getElementById('modal');
const HERO_SLIDE_DURATION = 7000;
let current = slides.findIndex(slide => slide.classList.contains('active'));
if (current < 0) current = 0;
let slideTimer = null;

function getPathPrefix() {
  const path = window.location.pathname;

  if (path.includes('/zk/news/company/') || path.includes('/zk/news/growth/') || path.includes('/zk/news/limited/')) {
    return '../../';
  }

  if (path.includes('/zk/expert/') || path.includes('/zk/cases/')) {
    return '../';
  }

  return '';
}

function getActivePage() {
  const path = window.location.pathname;
  const file = path.split('/').pop() || 'index.html';

  if (file === 'index.html' || path.endsWith('/zk/')) return 'home';
  if (file === 'about.html') return 'about';
  if (['courses.html', 'course-detail.html', 'evaluation-detail.html', 'camp-detail.html'].includes(file)) return 'courses';
  if (file === 'team.html' || path.includes('/zk/expert/')) return 'team';
  if (file === 'cases.html' || path.includes('/zk/cases/')) return 'cases';
  if (['news.html', 'company-news.html', 'growth-news.html', 'limited-activity.html'].includes(file) || path.includes('/zk/news/')) return 'news';
  if (file === 'join.html') return 'join';
  if (file === 'contact.html') return 'contact';

  return '';
}

function createNavDropdown(label, items, isActive) {
  const itemLinks = items.map(item => `<a href="${item.href}">${item.text}</a>`).join('');
  const activeClass = isActive ? ' nav-active' : '';

  return `
    <div class="nav-item has-dropdown${activeClass}">
      <button class="nav-link" type="button" aria-expanded="false">${label}</button>
      <div class="nav-panel">${itemLinks}</div>
    </div>
  `;
}

function setupDropdownEvents() {
  const navItems = [...document.querySelectorAll('.nav-item.has-dropdown')];
  if (!navItems.length) return;

  const closeAll = exceptItem => {
    navItems.forEach(item => {
      if (item === exceptItem) return;
      item.classList.remove('open');
      const button = item.querySelector('.nav-link');
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  };

  navItems.forEach(item => {
    const button = item.querySelector('.nav-link');
    if (!button) return;

    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      const willOpen = !item.classList.contains('open');
      closeAll(item);
      item.classList.toggle('open', willOpen);
      button.setAttribute('aria-expanded', String(willOpen));
    });

    item.addEventListener('mouseenter', () => {
      closeAll(item);
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    });

    item.addEventListener('mouseleave', () => {
      item.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', () => closeAll());
}

function setupUnifiedLinks() {
  const prefix = getPathPrefix();
  const active = getActivePage();
  const link = file => `${prefix}${file}`;
  const activeClass = page => (active === page ? ' class="nav-active"' : '');

  const brand = document.querySelector('.brand');
  if (brand) {
    brand.setAttribute('href', link('index.html'));
    brand.innerHTML = `
      <img
        src="${link('statics/images/logo.svg')}"
        alt="中科心智能 Logo"
        style="width:50px;height:50px;display:block;flex:none;object-fit:contain;filter:drop-shadow(0 8px 18px rgba(16,27,23,.18));"
      >
      <span>
        <strong>中科心智能</strong>
        <span>Education Platform</span>
      </span>
    `;
  }

  const nav = document.querySelector('header nav');
  if (nav && active === 'home') {
    nav.className = 'nav-dropdowns';
    nav.innerHTML = `
      ${createNavDropdown('关于我们', [
        { text: '公司简介', href: link('about.html') },
        { text: '服务方向', href: link('about.html') },
        { text: '发展愿景', href: link('about.html') }
      ], false)}
      ${createNavDropdown('课程产品', [
        { text: '课程总览', href: link('courses.html') },
        { text: '学习力成长体系', href: link('course-detail.html') },
        { text: '测评体验课', href: link('evaluation-detail.html') },
        { text: '寒暑假强化营', href: link('camp-detail.html') }
      ], false)}
      ${createNavDropdown('专家团队', [
        { text: '团队总览', href: link('team.html') },
        { text: '专家顾问', href: link('expert/expert-01.html') },
        { text: '课程研发', href: link('expert/expert-03.html') },
        { text: '认证导师', href: link('expert/expert-05.html') }
      ], false)}
      ${createNavDropdown('成功案例', [
        { text: '案例总览', href: link('cases.html') },
        { text: '专注力提升', href: link('cases/case-01.html') },
        { text: '阅读表达', href: link('cases/case-03.html') },
        { text: '成长营案例', href: link('cases/case-07.html') }
      ], false)}
      ${createNavDropdown('新闻活动', [
        { text: '新闻总览', href: link('news.html') },
        { text: '公司动态', href: link('company-news.html') },
        { text: '成长资讯', href: link('growth-news.html') },
        { text: '限时活动', href: link('limited-activity.html') }
      ], false)}
      ${createNavDropdown('加盟合作', [
        { text: '合作对象', href: link('join.html') },
        { text: '总部支持', href: link('join.html') },
        { text: '在线申请', href: `${link('join.html')}#join-form` }
      ], false)}
      ${createNavDropdown('联系我们', [
        { text: '联系方式', href: link('contact.html') },
        { text: '在线留言', href: `${link('contact.html')}#contact-form` },
        { text: '公司地址', href: link('contact.html') }
      ], false)}
    `;
    setupDropdownEvents();
  } else if (nav) {
    nav.className = '';
    nav.innerHTML = `
      <a${activeClass('about')} href="${link('about.html')}">关于我们</a>
      <a${activeClass('courses')} href="${link('courses.html')}">课程产品</a>
      <a${activeClass('team')} href="${link('team.html')}">专家团队</a>
      <a${activeClass('cases')} href="${link('cases.html')}">成功案例</a>
      <a${activeClass('news')} href="${link('news.html')}">新闻活动</a>
      <a${activeClass('join')} href="${link('join.html')}">加盟合作</a>
      <a${activeClass('contact')} href="${link('contact.html')}">联系我们</a>
    `;
  }

  const navCta = document.querySelector('.nav-cta');
  if (navCta) {
    navCta.innerHTML = `
      <a class="btn btn-line" href="${link('contact.html')}#contact-form">预约体验</a>
      <a class="btn btn-gold" href="${link('join.html')}#join-form">申请合作</a>
    `;
  }

  if (!document.querySelector('.footer')) {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = '<div class="container"><div class="footer-grid"></div><div class="copyright">© 2026 中科心智能教育科技服务平台 · 官网动态演示版</div></div>';
    document.body.insertBefore(footer, document.querySelector('script[src*="main.js"]') || null);
  }

  const footerGrid = document.querySelector('.footer-grid');
  if (footerGrid) {
    footerGrid.innerHTML = `
      <div><div class="brand-mini">中科心智能</div></div>
      <div><h4>关于我们</h4><a href="${link('about.html')}">公司简介</a><a href="${link('about.html')}">服务方向</a><a href="${link('about.html')}">发展愿景</a></div>
      <div><h4>课程产品</h4><a href="${link('courses.html')}">课程总览</a><a href="${link('course-detail.html')}">学习力成长体系</a><a href="${link('evaluation-detail.html')}">测评体验课</a><a href="${link('camp-detail.html')}">寒暑假强化营</a></div>
      <div><h4>团队案例</h4><a href="${link('team.html')}">专家团队</a><a href="${link('cases.html')}">成功案例</a></div>
      <div><h4>新闻活动</h4><a href="${link('company-news.html')}">公司动态</a><a href="${link('growth-news.html')}">成长资讯</a><a href="${link('limited-activity.html')}">限时活动</a></div>
      <div><h4>加盟合作</h4><a href="${link('join.html')}">合作对象</a><a href="${link('join.html')}#join-form">在线申请</a><a href="${link('contact.html')}">联系我们</a></div>
    `;
  }

  if (!document.querySelector('.sticky')) {
    const sticky = document.createElement('div');
    sticky.className = 'sticky';
    document.body.insertBefore(sticky, document.querySelector('script[src*="main.js"]') || null);
  }

  const sticky = document.querySelector('.sticky');
  if (sticky) {
    sticky.innerHTML = `
      <a href="${link('contact.html')}#contact-form">预约</a>
      <a href="${link('join.html')}#join-form">合作</a>
    `;
  }

  const replacements = {
    '#course': link('courses.html'),
    '#team': link('team.html'),
    '#news': link('news.html'),
    '#join': link('join.html'),
    '#contact': link('contact.html'),
    '#assessment': `${link('contact.html')}#contact-form`,
    'index.html#course': link('courses.html'),
    'index.html#team': link('team.html'),
    'index.html#news': link('news.html'),
    'index.html#join': link('join.html'),
    'index.html#contact': link('contact.html'),
    'index.html#assessment': `${link('contact.html')}#contact-form`,
    '../index.html#course': link('courses.html'),
    '../index.html#team': link('team.html'),
    '../index.html#news': link('news.html'),
    '../index.html#join': link('join.html'),
    '../index.html#contact': link('contact.html'),
    '../index.html#assessment': `${link('contact.html')}#contact-form`,
    '../../index.html#course': link('courses.html'),
    '../../index.html#team': link('team.html'),
    '../../index.html#news': link('news.html'),
    '../../index.html#join': link('join.html'),
    '../../index.html#contact': link('contact.html'),
    '../../index.html#assessment': `${link('contact.html')}#contact-form`
  };

  document.querySelectorAll('a[href]').forEach(anchor => {
    const rawHref = anchor.getAttribute('href');
    if (replacements[rawHref]) anchor.setAttribute('href', replacements[rawHref]);
  });
}

function setupCurtainLoading() {
  if (!loading) return;
  loading.classList.remove('hide');
  loading.classList.add('loading-curtain');

  if (!loading.querySelector('.curtain-panel')) {
    const top = document.createElement('span');
    const bottom = document.createElement('span');
    top.className = 'curtain-panel curtain-top';
    bottom.className = 'curtain-panel curtain-bottom';
    loading.prepend(bottom);
    loading.prepend(top);
  }
}

function finishCurtainLoading() {
  if (!loading) return;
  setTimeout(() => loading.classList.add('hide'), 250);
  setTimeout(() => loading.classList.add('done'), 1650);
}

function restartHeroIntro() {
  if (!heroInner) return;
  heroInner.classList.remove('anim');
  void heroInner.offsetWidth;
  heroInner.classList.add('anim');
}

function restartProgress() {
  if (!progress) return;

  progress.classList.remove('cur');
  progress.style.transition = 'none';
  progress.style.left = '-100%';
  void progress.offsetWidth;
  progress.style.transition = '';
  progress.style.left = '';

  requestAnimationFrame(() => {
    progress.classList.add('cur');
  });
}

function syncSlideClasses(nextIndex) {
  slides.forEach((slide, index) => {
    slide.classList.remove('active', 'prev', 'next');
    if (index === nextIndex) slide.classList.add('active');
    else if (index < nextIndex) slide.classList.add('prev');
    else slide.classList.add('next');
  });

  dots.forEach((dot, index) => dot.classList.toggle('active', index === nextIndex));
}

function go(n) {
  if (!slides.length) return;
  current = (n + slides.length) % slides.length;
  syncSlideClasses(current);
  restartHeroIntro();
  restartProgress();
  startSlideTimer();
}

function startSlideTimer() {
  clearTimeout(slideTimer);
  if (!slides.length) return;
  slideTimer = setTimeout(() => go(current + 1), HERO_SLIDE_DURATION + 250);
}

function setupRevealAnimation() {
  const revealEls = [...document.querySelectorAll('.reveal')];
  revealEls.forEach(el => el.classList.remove('show'));

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('show'));
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index % 6 * 0.06, .3)}s`;
    io.observe(el);
  });
}

function setupHeader() {
  if (!header) return;
  const update = () => header.classList.toggle('scrolled', window.scrollY > 40);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function setupMobileNav() {
  const currentNav = document.querySelector('header nav');
  if (!hamburger || !currentNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('expanded');
    document.body.classList.toggle('nav-open');
  });

  currentNav.querySelectorAll('a').forEach(linkItem => {
    linkItem.addEventListener('click', () => {
      hamburger.classList.remove('expanded');
      document.body.classList.remove('nav-open');
    });
  });
}

function setupModal() {
  if (!modal) return;

  document.querySelectorAll('.demo-form').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    modal.classList.add('show');
  }));

  const close = document.getElementById('closeModal');
  if (close) close.onclick = () => modal.classList.remove('show');

  modal.addEventListener('click', event => {
    if (event.target === modal) modal.classList.remove('show');
  });
}

function setupSlideControls() {
  if (!slides.length) return;

  syncSlideClasses(current);

  if (progress) {
    progress.addEventListener('transitionend', event => {
      if (event.propertyName !== 'left' || !progress.classList.contains('cur')) return;
      clearTimeout(slideTimer);
      go(current + 1);
    });
  }

  dots.forEach((dot, index) => dot.addEventListener('click', () => {
    clearTimeout(slideTimer);
    go(index);
  }));

  restartHeroIntro();
  restartProgress();
  startSlideTimer();
}

setupUnifiedLinks();
setupCurtainLoading();
setupHeader();
setupMobileNav();
setupSlideControls();
setupRevealAnimation();
setupModal();
window.addEventListener('load', finishCurtainLoading);
