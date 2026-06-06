const COMPANY_FULL_NAME = '中科明心(北海)智能科技有限公司';
const COMPANY_SHORT_NAME = '中科明心';
const OLD_COMPANY_NAMES = ['中科心智能教育科技服务平台', '中科心智能'];
const FOCUS_COURSE_NAME = '身心脑一体化专注力课程';
const OLD_FOCUS_COURSE_NAMES = ['心脑学习力成长课', '学习力成长体系'];
const HERO_SLIDE_DURATION = 7000;

function replaceCompanyNameInText() {
  document.title = document.title.replaceAll('中科心智能教育科技服务平台', COMPANY_FULL_NAME).replaceAll('中科心智能', COMPANY_SHORT_NAME);
  document.querySelectorAll('meta[content]').forEach(meta => {
    meta.content = meta.content.replaceAll('中科心智能教育科技服务平台', COMPANY_FULL_NAME).replaceAll('中科心智能', COMPANY_SHORT_NAME);
  });

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !OLD_COMPANY_NAMES.some(name => node.nodeValue.includes(name))) return NodeFilter.FILTER_REJECT;
      if (node.parentElement && ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.parentElement.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    node.nodeValue = node.nodeValue
      .replaceAll('中科心智能教育科技服务平台', COMPANY_FULL_NAME)
      .replaceAll('中科心智能', COMPANY_SHORT_NAME);
  });
}

function replaceFocusCourseNameInText() {
  document.title = document.title.replaceAll('心脑学习力成长课', FOCUS_COURSE_NAME).replaceAll('学习力成长体系', FOCUS_COURSE_NAME);
  document.querySelectorAll('meta[content]').forEach(meta => {
    meta.content = meta.content.replaceAll('心脑学习力成长课', FOCUS_COURSE_NAME).replaceAll('学习力成长体系', FOCUS_COURSE_NAME);
  });

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !OLD_FOCUS_COURSE_NAMES.some(name => node.nodeValue.includes(name))) return NodeFilter.FILTER_REJECT;
      if (node.parentElement && ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.parentElement.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    node.nodeValue = node.nodeValue
      .replaceAll('心脑学习力成长课', FOCUS_COURSE_NAME)
      .replaceAll('学习力成长体系', FOCUS_COURSE_NAME);
  });
}

function setupViewportStability() {
  let viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    viewport = document.createElement('meta');
    viewport.name = 'viewport';
    document.head.prepend(viewport);
  }
  viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');

  if (document.getElementById('viewportStabilityStyle')) return;
  const style = document.createElement('style');
  style.id = 'viewportStabilityStyle';
  style.textContent = `
    html { font-size: 100%; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
    html, body { width: 100%; max-width: 100%; min-width: 0; }
    input, select, textarea, button { font-size: 16px; }
    .reveal { transform: translateY(52px) !important; }
    .reveal.show { transform: translateY(0) !important; }
    .hero .hero-inner,
    .hero .hero-inner .eyebrow,
    .hero .hero-inner h1,
    .hero .hero-inner h2,
    .hero .hero-inner p,
    .hero .hero-actions { opacity: 1 !important; visibility: visible !important; transform: translate3d(0,0,0) !important; }
  `;
  document.head.appendChild(style);
}

function getPathPrefix() {
  const path = window.location.pathname;
  if (path.includes('/zk/news/company/') || path.includes('/zk/news/growth/') || path.includes('/zk/news/limited/')) return '../../';
  if (path.includes('/zk/expert/') || path.includes('/zk/cases/')) return '../';
  return '';
}

function getActivePage() {
  const path = window.location.pathname;
  const file = path.split('/').pop() || 'index.html';
  if (file === 'index.html' || path.endsWith('/zk/')) return 'home';
  if (file === 'about.html') return 'about';
  if (['courses.html', 'course-detail.html', 'evaluation-detail.html', 'camp-detail.html', 'public-class-detail.html'].includes(file)) return 'courses';
  if (['team.html', 'team-page-2.html', 'experts.html', 'assistants.html'].includes(file) || path.includes('/zk/expert/')) return 'team';
  if (file === 'cases.html' || path.includes('/zk/cases/')) return 'cases';
  if (['news.html', 'company-news.html', 'growth-news.html', 'limited-activity.html'].includes(file) || path.includes('/zk/news/')) return 'news';
  if (file === 'join.html') return 'join';
  if (file === 'contact.html') return 'contact';
  return '';
}

function buildUrl(file, params = '') {
  return `${getPathPrefix()}${file}${params}`;
}

function contactUrl(purpose) {
  return buildUrl('contact.html', `?purpose=${purpose}#contact-form`);
}

function injectNavStylesheet(prefix) {
  if (document.querySelector('link[data-nav-dropdown]')) return;
  const linkTag = document.createElement('link');
  linkTag.rel = 'stylesheet';
  linkTag.href = `${prefix}statics/style/nav-dropdown.css`;
  linkTag.dataset.navDropdown = 'true';
  document.head.appendChild(linkTag);
}

function createNavLink(label, href, isActive) {
  return `<a class="nav-direct${isActive ? ' nav-active' : ''}" href="${href}">${label}</a>`;
}

function createNavDropdown(label, href, items, isActive) {
  const itemLinks = items.map(item => `<a href="${item.href}">${item.text}</a>`).join('');
  return `<div class="nav-item has-dropdown${isActive ? ' nav-active' : ''}"><a class="nav-link" href="${href}" aria-expanded="false">${label}</a><div class="nav-panel">${itemLinks}</div></div>`;
}

function setupDropdownEvents() {
  const navItems = [...document.querySelectorAll('.nav-item.has-dropdown')];
  if (!navItems.length) return;
  const isMobileNav = () => window.matchMedia('(max-width: 1100px)').matches;
  const closeAll = exceptItem => {
    navItems.forEach(item => {
      if (item === exceptItem) return;
      item.classList.remove('open');
      const link = item.querySelector('.nav-link');
      if (link) link.setAttribute('aria-expanded', 'false');
    });
  };

  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (!link) return;
    link.addEventListener('click', event => {
      if (!isMobileNav()) return;
      event.preventDefault();
      const willOpen = !item.classList.contains('open');
      closeAll(item);
      item.classList.toggle('open', willOpen);
      link.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
    item.addEventListener('mouseenter', () => {
      if (isMobileNav()) return;
      closeAll(item);
      item.classList.add('open');
      link.setAttribute('aria-expanded', 'true');
    });
    item.addEventListener('mouseleave', () => {
      if (isMobileNav()) return;
      item.classList.remove('open');
      link.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-item.has-dropdown')) closeAll();
  });
  window.addEventListener('resize', () => closeAll());
}

function setupUnifiedLinks() {
  const prefix = getPathPrefix();
  const active = getActivePage();
  const link = file => `${prefix}${file}`;
  injectNavStylesheet(prefix);

  const brand = document.querySelector('.brand');
  if (brand) {
    brand.setAttribute('href', link('index.html'));
    brand.innerHTML = `<img src="${link('statics/images/logo.svg')}" alt="${COMPANY_SHORT_NAME} Logo" style="width:50px;height:50px;display:block;flex:none;object-fit:contain;filter:drop-shadow(0 8px 18px rgba(16,27,23,.18));"><span><strong>${COMPANY_SHORT_NAME}</strong><span>Education Platform</span></span>`;
  }

  const nav = document.querySelector('header nav');
  if (nav) {
    nav.className = 'nav-dropdowns';
    nav.innerHTML = `
      ${createNavLink('首页', link('index.html'), active === 'home')}
      ${createNavLink('关于我们', link('about.html'), active === 'about')}
      ${createNavDropdown('课程产品', link('courses.html'), [
        { text: FOCUS_COURSE_NAME, href: link('course-detail.html') },
        { text: '心脑学习力体验课', href: link('evaluation-detail.html') },
        { text: '心脑学习力强化营', href: link('camp-detail.html') },
        { text: '心脑学习力公开课', href: link('public-class-detail.html') }
      ], active === 'courses')}
      ${createNavDropdown('专家团队', link('team.html'), [
        { text: '核心专家', href: link('experts.html') },
        { text: '助教团队', href: link('assistants.html') }
      ], active === 'team')}
      ${createNavLink('经典案例', link('cases.html'), active === 'cases')}
      ${createNavDropdown('新闻活动', link('news.html'), [
        { text: '公司动态', href: link('company-news.html') },
        { text: '成长资讯', href: link('growth-news.html') },
        { text: '限时活动', href: link('limited-activity.html') }
      ], active === 'news')}
      ${createNavLink('加盟合作', link('join.html'), active === 'join')}
      ${createNavLink('联系我们', link('contact.html'), active === 'contact')}
    `;
    setupDropdownEvents();
  }

  const navCta = document.querySelector('.nav-cta');
  if (navCta) {
    navCta.innerHTML = `<a class="btn btn-line" href="${contactUrl('trial')}">预约体验</a><a class="btn btn-gold" href="${contactUrl('cooperation')}">申请合作</a>`;
  }

  setupFooterAndSticky(link);
  normalizeLegacyAnchors();
}

function setupFooterAndSticky(link) {
  if (!document.querySelector('.footer')) {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = '<div class="container"><div class="footer-grid"></div><div class="copyright"></div></div>';
    document.body.insertBefore(footer, document.querySelector('script[src*="main.js"]') || null);
  }

  const footerGrid = document.querySelector('.footer-grid');
  if (footerGrid) {
    footerGrid.innerHTML = `
      <div><div class="brand-mini">${COMPANY_SHORT_NAME}</div></div>
      <div><h4>关于我们</h4><a href="${link('about.html')}">公司简介</a><a href="${link('about.html')}">服务方向</a><a href="${link('about.html')}">发展愿景</a></div>
      <div><h4>课程产品</h4><a href="${link('course-detail.html')}">${FOCUS_COURSE_NAME}</a><a href="${link('evaluation-detail.html')}">心脑学习力体验课</a><a href="${link('camp-detail.html')}">心脑学习力强化营</a><a href="${link('public-class-detail.html')}">心脑学习力公开课</a></div>
      <div><h4>专家团队</h4><a href="${link('experts.html')}">核心专家</a><a href="${link('assistants.html')}">助教团队</a></div>
      <div><h4>经典案例</h4><a href="${link('cases.html')}">案例总览</a></div>
      <div><h4>新闻活动</h4><a href="${link('company-news.html')}">公司动态</a><a href="${link('growth-news.html')}">成长资讯</a><a href="${link('limited-activity.html')}">限时活动</a></div>
      <div><h4>加盟合作</h4><a href="${link('join.html')}">合作对象</a><a href="${contactUrl('cooperation')}">在线申请</a><a href="${link('contact.html')}">联系我们</a><a href="${link('privacy.html')}">隐私政策</a></div>
    `;
  }

  const copyright = document.querySelector('.copyright');
  if (copyright) copyright.textContent = `© 2026 ${COMPANY_FULL_NAME}`;

  if (!document.querySelector('.sticky')) {
    const sticky = document.createElement('div');
    sticky.className = 'sticky';
    document.body.insertBefore(sticky, document.querySelector('script[src*="main.js"]') || null);
  }
  const sticky = document.querySelector('.sticky');
  if (sticky) sticky.innerHTML = `<a href="${contactUrl('trial')}">预约</a><a href="${contactUrl('cooperation')}">合作</a>`;
}

function normalizeLegacyAnchors() {
  const contactLinks = {
    '#assessment': contactUrl('trial'), '#contact': buildUrl('contact.html'), '#join-form': contactUrl('cooperation'),
    'index.html#assessment': contactUrl('trial'), 'index.html#contact': buildUrl('contact.html'), 'join.html#join-form': contactUrl('cooperation'),
    '../index.html#assessment': contactUrl('trial'), '../index.html#contact': buildUrl('contact.html'),
    '../../index.html#assessment': contactUrl('trial'), '../../index.html#contact': buildUrl('contact.html')
  };
  document.querySelectorAll('a[href]').forEach(anchor => {
    const rawHref = anchor.getAttribute('href');
    if (contactLinks[rawHref]) anchor.setAttribute('href', contactLinks[rawHref]);
  });
}

function removeLegacyStandaloneForms() {
  document.querySelectorAll('.assess-form, .join-form').forEach(form => {
    if (form.id !== 'unifiedInquiryForm') form.remove();
  });
}

function setupUnifiedInquiryForm() {
  const form = document.getElementById('unifiedInquiryForm');
  if (!form) return;
  const select = document.getElementById('purposeSelect');
  const fields = [...form.querySelectorAll('.dynamic-fields')];
  const message = document.getElementById('messageField');
  const submit = form.querySelector('button[type="submit"]');
  const purposeLabels = { consult: '课程咨询', trial: '预约体验', cooperation: '加盟合作', activity: '活动合作', feedback: '服务反馈', other: '其他事项' };
  const placeholders = {
    consult: '请说明孩子目前学习状态、想了解的课程或主要疑问', trial: '请说明孩子目前主要情况，以及希望预约体验的大致时间',
    cooperation: '请简要说明所在城市、现有资源和合作想法', activity: '请说明活动地点、预计人数、时间安排和合作需求',
    feedback: '请说明需要反馈或改进的具体事项', other: '请简要说明你的需求'
  };

  function updateFields() {
    const value = select ? select.value : 'consult';
    fields.forEach(group => group.hidden = group.dataset.for !== value);
    if (message) message.placeholder = placeholders[value] || placeholders.other;
    if (submit) submit.textContent = value === 'cooperation' ? '提交合作申请' : value === 'trial' ? '提交预约信息' : '提交信息';
  }
  function applyQueryPurpose() {
    if (!select) return;
    const purpose = new URLSearchParams(window.location.search).get('purpose');
    if (purpose && [...select.options].some(option => option.value === purpose)) select.value = purpose;
  }

  applyQueryPurpose(); updateFields();
  if (select) select.addEventListener('change', updateFields);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const purpose = data.get('purpose') || (select ? select.value : 'other');
    const modal = document.getElementById('modal');
    if (modal) {
      const title = modal.querySelector('h3');
      const text = modal.querySelector('p');
      if (title) title.textContent = `${purposeLabels[purpose] || '信息'}已提交`;
      if (text) text.textContent = '我们已收到你的信息，将根据具体需求尽快与你联系。';
      modal.classList.add('show');
    } else alert('信息已提交，我们会尽快与你联系。');
    form.reset();
    if (select) select.value = purpose;
    updateFields();
  });
}

function setupDemoForms() {
  document.querySelectorAll('.demo-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const modal = document.getElementById('modal');
      if (modal) modal.classList.add('show');
    });
  });
}

function setupHeroSlider() {
  const hero = document.querySelector('.hero');
  const progress = document.querySelector('.progress-line');
  const slides = [...document.querySelectorAll('.slide')];
  const dots = [...document.querySelectorAll('.hero-dots button')];
  if (!slides.length) return;
  let current = slides.findIndex(slide => slide.classList.contains('active'));
  if (current < 0) current = 0;
  let timer = null;
  const activate = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    if (progress) { progress.style.animation = 'none'; void progress.offsetWidth; progress.style.animation = `heroLine ${HERO_SLIDE_DURATION / 1000}s linear infinite`; }
  };
  const start = () => { if (timer) clearInterval(timer); timer = setInterval(() => activate(current + 1), HERO_SLIDE_DURATION); };
  dots.forEach((dot, index) => dot.addEventListener('click', () => { activate(index); start(); }));
  if (hero) { hero.addEventListener('mouseenter', () => timer && clearInterval(timer)); hero.addEventListener('mouseleave', start); }
  activate(current); start();
}

function setupRevealAnimation() {
  const reveals = [...document.querySelectorAll('.reveal')];
  if (!reveals.length) return;
  if (!('IntersectionObserver' in window)) { reveals.forEach(el => el.classList.add('show')); return; }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('show'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
}

function setupMenuAndModal() {
  const hamburger = document.querySelector('.hamb');
  const nav = document.querySelector('header nav');
  if (hamburger && nav) hamburger.addEventListener('click', () => nav.classList.toggle('open'));
  const modal = document.getElementById('modal');
  if (modal) modal.addEventListener('click', event => { if (event.target === modal || event.target.id === 'closeModal') modal.classList.remove('show'); });
}

function setupHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  const sync = () => header.classList.toggle('scrolled', window.scrollY > 20 || !document.querySelector('.hero'));
  sync();
  window.addEventListener('scroll', sync, { passive: true });
}

function setList(items) {
  return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

function updateCourseCard(card, mode = 'home') {
  if (!card) return;
  const title = card.querySelector('h3');
  const text = card.querySelector('p');
  const list = card.querySelector('ul');
  const tag = card.querySelector('.tag, .label');
  if (title) title.textContent = FOCUS_COURSE_NAME;
  if (tag && mode === 'home') tag.textContent = '主打课程';
  if (tag && mode === 'system') tag.textContent = '专注力提升';
  if (text) text.textContent = '面向8-16岁青少年，以身体稳定、感官专注、心像记忆和情绪觉察为核心，帮助孩子建立更稳定的学习状态。';
  if (list) list.innerHTML = ['身体锚定与呼吸训练', '感官收摄与专注练习', '心像记忆与情绪觉察'].map(item => `<li>${item}</li>`).join('');
}

function applyFocusCourseContent() {
  replaceFocusCourseNameInText();

  updateCourseCard(document.querySelector('#course .product-card'), 'home');
  updateCourseCard(document.querySelector('.system-grid .system-card'), 'system');
  updateCourseCard(document.querySelector('.course-list .course-card'), 'detail-list');

  const heroTitle = document.querySelector('.detail-hero h1');
  if (heroTitle) heroTitle.textContent = FOCUS_COURSE_NAME;
  const heroDesc = document.querySelector('.detail-hero p');
  if (heroDesc) heroDesc.textContent = '以身心脑一体化训练为主线，帮助青少年提升专注力、图像化记忆、自我觉察和学习内驱力。';
  const detailTags = document.querySelector('.detail-tags');
  if (detailTags) detailTags.innerHTML = '<span>主打课程</span><span>8-16岁青少年</span><span>专注力训练</span><span>21天陪跑</span>';
  const breadcrumb = document.querySelector('.breadcrumb');
  if (breadcrumb) breadcrumb.innerHTML = breadcrumb.innerHTML.replace(/心脑学习力成长课|学习力成长体系/g, FOCUS_COURSE_NAME);

  const detailMain = document.querySelector('.detail-main');
  if (detailMain && window.location.pathname.endsWith('course-detail.html')) {
    detailMain.innerHTML = `
      <div class="detail-block reveal show"><h2>课程介绍</h2><p>${FOCUS_COURSE_NAME}面向8-16岁青少年，课程从身体稳定、注意聚焦、图像记忆、情绪觉察和目标行动五个层面切入，帮助孩子把“坐得住、看得进、记得牢、情绪稳、愿意做”逐步变成可训练、可反馈的能力。</p><p>课程不做单纯知识补习，而是围绕学习底层能力进行训练，并通过家庭练习和阶段反馈，让家长能够看见孩子学习状态的变化。</p></div>
      <div class="detail-block reveal show"><h2>适合对象</h2>${setList(['8-16岁，正处于专注力、记忆力和价值观形成关键阶段的青少年','上课容易分心、作业拖拉、手机依赖或学习启动困难的孩子','记忆效率低、背诵吃力、学习方法不清晰的孩子','情绪波动较大、遇到难题容易烦躁或退缩的孩子','希望提升专注、记忆、自我管理和内在动力的家庭'])}</div>
      <div class="detail-block reveal show"><h2>核心训练模块</h2><div class="feature-grid"><div class="feature-item"><b>01</b><h3>身体锚定</h3><p>通过呼吸、坐姿和身体觉察，让孩子先稳定下来。</p></div><div class="feature-item"><b>02</b><h3>感官收摄</h3><p>通过微观观察、听觉追踪等任务训练注意聚焦。</p></div><div class="feature-item"><b>03</b><h3>心像记忆</h3><p>用图像化、多感官想象帮助孩子提升记忆效率。</p></div><div class="feature-item"><b>04</b><h3>情绪觉察</h3><p>学习识别念头与情绪，减少冲动和学习抵触。</p></div><div class="feature-item"><b>05</b><h3>目标行动</h3><p>把目标可视化，形成“意图—专注—行动—反馈”的闭环。</p></div></div></div>
      <div class="detail-block reveal show"><h2>课程价值</h2>${setList(['孩子：提升专注稳定性、图像化记忆和任务投入感','家长：更清楚孩子的真实学习状态，减少盲目焦虑','家庭：通过每日练习和反馈形成更稳定的支持系统','学校/机构：可作为学习力训练和心理成长服务的补充课程'])}</div>
      <div class="detail-block reveal show"><h2>服务方式</h2><div class="course-flow"><div class="flow-item"><b>1</b><span>初步咨询</span><p>了解年龄、学习状态和家长关注点。</p></div><div class="flow-item"><b>2</b><span>体验测评</span><p>通过简单任务观察专注、记忆与表达状态。</p></div><div class="flow-item"><b>3</b><span>正式训练</span><p>围绕身体、感官、心像、情绪和目标开展训练。</p></div><div class="flow-item"><b>4</b><span>家庭陪跑</span><p>安排每日短时练习，建立家校协同反馈。</p></div><div class="flow-item"><b>5</b><span>阶段反馈</span><p>反馈变化，并给出后续训练建议。</p></div></div></div>
    `;
  }

  const sideCard = document.querySelector('.side-card');
  if (sideCard && window.location.pathname.endsWith('course-detail.html')) {
    sideCard.innerHTML = `<h3>课程信息</h3><p>适合希望提升孩子专注力、记忆力、情绪稳定和学习内驱力的家庭。</p><div class="side-list"><div><b>对象</b><span>8-16岁青少年</span></div><div><b>形式</b><span>日常课 / 集训营</span></div><div><b>重点</b><span>专注、记忆、情绪、自驱</span></div><div><b>机制</b><span>21天家庭陪跑</span></div><div><b>反馈</b><span>阶段记录与家长沟通</span></div></div><a class="btn btn-gold" href="${contactUrl('trial')}">预约体验</a><a class="btn btn-line" href="courses.html">返回课程产品</a>`;
  }

  const cta = document.querySelector('.detail-cta-wrap');
  if (cta && window.location.pathname.endsWith('course-detail.html')) {
    cta.innerHTML = `<div><h2>先从一次体验测评开始</h2><p>通过体验任务初步了解孩子的专注、记忆和情绪状态，再决定后续训练方向。</p></div><div class="detail-cta-actions"><a class="btn btn-primary" href="${contactUrl('trial')}">预约体验</a><a class="btn btn-gold" href="courses.html">查看全部课程</a></div>`;
  }
}

function init() {
  setupViewportStability();
  setupUnifiedLinks();
  removeLegacyStandaloneForms();
  replaceCompanyNameInText();
  applyFocusCourseContent();
  setupUnifiedInquiryForm();
  setupDemoForms();
  setupHeroSlider();
  setupRevealAnimation();
  setupMenuAndModal();
  setupHeaderScroll();
  const loading = document.querySelector('.loading');
  if (loading) setTimeout(() => loading.classList.add('hide'), 350);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
