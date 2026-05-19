const header = document.getElementById('header');
const loading = document.querySelector('.loading');
const hero = document.querySelector('.hero');
const heroInner = document.querySelector('.hero-inner');
const progress = document.querySelector('.progress-line');
const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.hero-dots button')];
const hamburger = document.querySelector('.hamb');
const modal = document.getElementById('modal');
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
  if (nav) {
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
  void progress.offsetWidth;
  progress.classList.add('cur');
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
}

function startSlideTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => go(current + 1), 7000);
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

  currentNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
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
  syncSlideClasses(current);

  dots.forEach((dot, index) => dot.addEventListener('click', () => {
    go(index);
    startSlideTimer();
  }));

  if (hero) {
    hero.addEventListener('mouseenter', () => clearInterval(slideTimer));
    hero.addEventListener('mouseleave', startSlideTimer);
  }

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
