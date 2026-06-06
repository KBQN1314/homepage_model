const COMPANY_FULL_NAME = '中科明心(北海)智能科技有限公司';
const COMPANY_SHORT_NAME = '中科明心';
const FOCUS_COURSE_NAME = '身心脑一体化专注力课程';
const READING_COURSE_NAME = '潜意识阅读';
const OLD_COMPANY_NAMES = ['中科心智能教育科技服务平台', '中科心智能'];
const OLD_FOCUS_COURSE_NAMES = ['心脑学习力成长课', '学习力成长体系'];
const OLD_READING_COURSE_NAMES = ['心脑学习力强化营'];
const HERO_SLIDE_DURATION = 7000;

function replaceTextInNode(root, replacements) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
      if (node.parentElement && ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.parentElement.tagName)) return NodeFilter.FILTER_REJECT;
      return replacements.some(([from]) => node.nodeValue.includes(from)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    let value = node.nodeValue;
    replacements.forEach(([from, to]) => { value = value.replaceAll(from, to); });
    node.nodeValue = value;
  });
}

function replaceGlobalTexts() {
  const replacements = [
    ['中科心智能教育科技服务平台', COMPANY_FULL_NAME],
    ['中科心智能', COMPANY_SHORT_NAME],
    ['心脑学习力成长课', FOCUS_COURSE_NAME],
    ['学习力成长体系', FOCUS_COURSE_NAME],
    ['心脑学习力强化营', READING_COURSE_NAME]
  ];
  replacements.forEach(([from, to]) => { document.title = document.title.replaceAll(from, to); });
  document.querySelectorAll('meta[content]').forEach(meta => {
    replacements.forEach(([from, to]) => { meta.content = meta.content.replaceAll(from, to); });
  });
  replaceTextInNode(document.body, replacements);
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
  document.addEventListener('click', event => { if (!event.target.closest('.nav-item.has-dropdown')) closeAll(); });
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
        { text: READING_COURSE_NAME, href: link('camp-detail.html') },
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
  if (navCta) navCta.innerHTML = `<a class="btn btn-line" href="${contactUrl('trial')}">预约体验</a><a class="btn btn-gold" href="${contactUrl('cooperation')}">申请合作</a>`;

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
      <div><h4>课程产品</h4><a href="${link('course-detail.html')}">${FOCUS_COURSE_NAME}</a><a href="${link('evaluation-detail.html')}">心脑学习力体验课</a><a href="${link('camp-detail.html')}">${READING_COURSE_NAME}</a><a href="${link('public-class-detail.html')}">心脑学习力公开课</a></div>
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
  const contactLinks = { '#assessment': contactUrl('trial'), 'index.html#assessment': contactUrl('trial'), '#join': contactUrl('cooperation'), 'index.html#join': contactUrl('cooperation'), '#contact': buildUrl('contact.html') };
  document.querySelectorAll('a[href]').forEach(anchor => {
    const rawHref = anchor.getAttribute('href');
    if (contactLinks[rawHref]) anchor.setAttribute('href', contactLinks[rawHref]);
  });
}

function removeLegacyStandaloneForms() {
  document.querySelectorAll('.assess-form, .join-form').forEach(form => { if (form.id !== 'unifiedInquiryForm') form.remove(); });
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
    consult: '请说明孩子目前学习状态、想了解的课程或主要疑问',
    trial: '请说明孩子目前主要情况，以及希望预约体验的大致时间',
    cooperation: '请简要说明所在城市、现有资源和合作想法',
    activity: '请说明活动地点、预计人数、时间安排和合作需求',
    feedback: '请说明需要反馈或改进的具体事项',
    other: '请简要说明你的需求'
  };
  function updateFields() {
    const value = select ? select.value : 'consult';
    fields.forEach(group => group.hidden = group.dataset.for !== value);
    if (message) message.placeholder = placeholders[value] || placeholders.other;
    if (submit) submit.textContent = value === 'cooperation' ? '提交合作申请' : value === 'trial' ? '提交预约信息' : '提交信息';
  }
  if (select) {
    const purpose = new URLSearchParams(window.location.search).get('purpose');
    if (purpose && [...select.options].some(option => option.value === purpose)) select.value = purpose;
    select.addEventListener('change', updateFields);
  }
  updateFields();
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
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('show'); observer.unobserve(entry.target); } });
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

function updateFocusCard(card, mode = 'home') {
  if (!card) return;
  const title = card.querySelector('h3');
  const text = card.querySelector('p');
  const list = card.querySelector('ul');
  const tag = card.querySelector('.tag, .label');
  if (title) title.textContent = FOCUS_COURSE_NAME;
  if (tag && mode === 'home') tag.textContent = '主打课程';
  if (tag && mode === 'system') tag.textContent = '专注力提升';
  if (text) text.textContent = '面向8-16岁青少年，以身体稳定、感官专注、图像化记忆、情绪觉察和目标行动为主线，帮助孩子建立更稳定的学习状态。';
  if (list) list.innerHTML = ['身体锚定与呼吸训练', '感官专注与图像记忆', '情绪觉察与21天陪跑'].map(item => `<li>${item}</li>`).join('');
}

function updateReadingCard(card, mode = 'home') {
  if (!card) return;
  const title = card.querySelector('h3');
  const text = card.querySelector('p');
  const list = card.querySelector('ul');
  const tag = card.querySelector('.tag, .label');
  if (title) title.textContent = READING_COURSE_NAME;
  if (tag && mode === 'home') tag.textContent = '高效阅读';
  if (tag && mode === 'system') tag.textContent = '阅读突破';
  if (text) text.textContent = '面向12-18岁青少年，训练整页摄入、脑内成像和结构化理解能力，帮助孩子提升阅读效率、理解表达和考试阅读速度。';
  if (list) list.innerHTML = ['破除逐字默读习惯', '整页摄入与脑内成像', '速读理解与复述输出'].map(item => `<li>${item}</li>`).join('');
}

function applyFocusCourseContent() {
  updateFocusCard(document.querySelector('#course .product-card'), 'home');
  updateFocusCard(document.querySelector('.system-grid .system-card'), 'system');
  updateFocusCard(document.querySelector('.course-list .course-card'), 'detail-list');

  if (!window.location.pathname.endsWith('course-detail.html')) return;
  const heroTitle = document.querySelector('.detail-hero h1');
  if (heroTitle) heroTitle.textContent = FOCUS_COURSE_NAME;
  const heroDesc = document.querySelector('.detail-hero p');
  if (heroDesc) heroDesc.textContent = '面向8-16岁青少年，以专注力训练为入口，融合身体稳定、感官聚焦、图像化记忆、情绪觉察和家庭陪跑，帮助孩子把学习状态真正稳定下来。';
  const detailTags = document.querySelector('.detail-tags');
  if (detailTags) detailTags.innerHTML = '<span>主打课程</span><span>8-16岁青少年</span><span>专注力训练</span><span>图像化记忆</span><span>21天家庭陪跑</span>';
  const detailMain = document.querySelector('.detail-main');
  if (detailMain) {
    detailMain.innerHTML = `
      <div class="detail-block reveal show"><h2>课程定位</h2><p>${FOCUS_COURSE_NAME}不是单纯的知识补习课，而是一门面向青少年学习底层能力的训练课程。课程通过可体验、可练习、可反馈的任务，帮助孩子先稳定身体和注意状态，再逐步提升记忆、情绪管理和学习内驱力。</p><p>官网页面不展示完整课表，只保留家长最需要判断的部分：孩子适不适合、课程怎么训练、能看到什么变化，以及如何开始体验。</p></div>
      <div class="detail-block reveal show"><h2>适合对象</h2>${setList(['8-16岁，处于专注力、记忆力和自我管理能力发展的关键阶段','上课分心、作业拖拉、手机依赖、学习启动困难的孩子','背诵吃力、记忆效率低、学习方法不清晰的孩子','情绪波动较大、遇到难题容易烦躁或退缩的孩子','希望进一步提升专注、记忆、自我管理和内在动力的优秀青少年'])}</div>
      <div class="detail-block reveal show"><h2>核心训练模块</h2><div class="feature-grid"><div class="feature-item"><b>01</b><h3>身体锚定</h3><p>通过呼吸、坐姿和身体觉察，让孩子先安静下来、稳定下来。</p></div><div class="feature-item"><b>02</b><h3>感官专注</h3><p>通过微观观察、听觉追踪等任务，训练注意力的聚焦和抗干扰。</p></div><div class="feature-item"><b>03</b><h3>心像记忆</h3><p>用图像化、多感官想象和空间记忆，改善机械背诵效率低的问题。</p></div><div class="feature-item"><b>04</b><h3>情绪觉察</h3><p>帮助孩子识别念头与情绪，减少冲动和学习抵触。</p></div><div class="feature-item"><b>05</b><h3>目标行动</h3><p>通过目标可视化和行动承诺，建立“想做—能做—持续做”的动力闭环。</p></div><div class="feature-item"><b>06</b><h3>家庭陪跑</h3><p>用每日短时练习和阶段反馈，让训练从课堂延伸到家庭。</p></div></div></div>
      <div class="detail-block reveal show"><h2>典型训练路径</h2><p>课程可根据日常课或集训营形式灵活安排。官网只展示阶段路径，完整日程建议在咨询后根据孩子情况单独沟通。</p><div class="course-flow"><div class="flow-item"><b>1</b><span>状态观察</span><p>了解孩子专注、记忆、表达和情绪状态。</p></div><div class="flow-item"><b>2</b><span>身心安定</span><p>用呼吸、坐姿和身体觉察建立稳定基础。</p></div><div class="flow-item"><b>3</b><span>专注记忆</span><p>训练感官聚焦、图像化记忆和任务投入。</p></div><div class="flow-item"><b>4</b><span>情绪目标</span><p>引导孩子识别情绪，建立目标感和行动意愿。</p></div><div class="flow-item"><b>5</b><span>反馈陪跑</span><p>通过家庭练习和阶段反馈巩固变化。</p></div></div></div>
      <div class="detail-block reveal show"><h2>家长能感受到的变化</h2>${setList(['孩子更容易坐得住，进入学习状态的时间缩短','注意力更集中，完成任务时更少被外界打断','记忆方式从死记硬背转向图像化、结构化记忆','能更清楚表达情绪，遇到困难时不再只会烦躁或逃避','家长更清楚孩子问题背后的原因，陪伴方式更有方向'])}</div>
      <div class="detail-block reveal show"><h2>21天家庭陪跑</h2><p>课程结束不是训练结束。我们建议配合21天家庭陪跑：每天10-15分钟短时练习，家长进行简单记录，老师阶段性反馈，帮助孩子把课堂中的状态训练迁移到日常学习中。</p>${setList(['每日短时练习：降低执行难度，便于坚持','家长打卡记录：看见孩子状态变化，而不是只盯成绩','阶段反馈建议：帮助家庭形成更稳定的支持系统'])}</div>
    `;
  }
  const sideCard = document.querySelector('.side-card');
  if (sideCard) sideCard.innerHTML = `<h3>课程信息</h3><p>适合希望改善专注、记忆、情绪稳定和学习内驱力的家庭。</p><div class="side-list"><div><b>对象</b><span>8-16岁青少年</span></div><div><b>形式</b><span>日常课 / 集训营</span></div><div><b>重点</b><span>专注、记忆、情绪、自驱</span></div><div><b>安排</b><span>阶段训练，不公开完整课表</span></div><div><b>巩固</b><span>21天家庭陪跑</span></div></div><a class="btn btn-gold" href="${contactUrl('trial')}">预约体验</a><a class="btn btn-line" href="courses.html">返回课程产品</a>`;
  const cta = document.querySelector('.detail-cta-wrap');
  if (cta) cta.innerHTML = `<div><h2>先从一次体验测评开始</h2><p>通过体验任务初步了解孩子的专注、记忆和情绪状态，再判断是否适合进入系统训练。</p></div><div class="detail-cta-actions"><a class="btn btn-primary" href="${contactUrl('trial')}">预约体验</a><a class="btn btn-gold" href="courses.html">查看全部课程</a></div>`;
}

function applyReadingCourseContent() {
  updateReadingCard(document.querySelector('#course .product-grid .product-card:nth-child(3)'), 'home');
  updateReadingCard(document.querySelector('.system-grid .system-card:nth-child(3)'), 'system');
  updateReadingCard(document.querySelector('.course-list .course-card:nth-child(3)'), 'detail-list');

  if (!window.location.pathname.endsWith('camp-detail.html')) return;
  const heroTitle = document.querySelector('.detail-hero h1');
  if (heroTitle) heroTitle.textContent = READING_COURSE_NAME;
  const heroDesc = document.querySelector('.detail-hero p');
  if (heroDesc) heroDesc.textContent = '面向12-18岁青少年，帮助孩子打破逐字默读习惯，训练整页摄入、脑内成像、结构化理解和复述表达能力，让阅读更快、更准、更能讲出来。';
  const detailTags = document.querySelector('.detail-tags');
  if (detailTags) detailTags.innerHTML = '<span>阅读突破</span><span>12-18岁青少年</span><span>整页摄入</span><span>脑内成像</span><span>理解复述</span>';
  const detailMain = document.querySelector('.detail-main');
  if (detailMain) {
    detailMain.innerHTML = `
      <div class="detail-block reveal show"><h2>课程定位</h2><p>${READING_COURSE_NAME}不是单纯追求“读得快”的速读课，而是训练孩子从逐字默读转向整页摄入、图像化理解和结构化输出。课程目标是让孩子读完以后能够讲出来、说清楚、抓住重点。</p><p>官网页面不展示完整课表，只保留家长判断课程价值所需的关键内容：适合谁、怎么训练、能解决什么问题、训练后能看到哪些变化。</p></div>
      <div class="detail-block reveal show"><h2>适合对象</h2>${setList(['12-18岁，已经具备基本阅读能力，希望提升阅读效率的青少年','阅读速度慢、考试阅读量大时容易读不完的学生','习惯逐字默读，读完后抓不住重点、讲不清结构的孩子','希望提升语文阅读、信息处理、复述表达和应试效率的学生','建议具备一定专注基础，或先参加专注力/记忆类课程后再进入训练'])}</div>
      <div class="detail-block reveal show"><h2>核心训练模块</h2><div class="feature-grid"><div class="feature-item"><b>01</b><h3>破除默读</h3><p>通过节奏、手指引读和软眼训练，减少逐字默念对阅读速度的限制。</p></div><div class="feature-item"><b>02</b><h3>整页摄入</h3><p>训练视野扩展、页面感知和快速扫描，让孩子建立整页信息摄入意识。</p></div><div class="feature-item"><b>03</b><h3>脑内成像</h3><p>把叙事内容转化为脑内电影，把说理内容转化为结构图。</p></div><div class="feature-item"><b>04</b><h3>直接理解</h3><p>训练快速把握作者意图、情绪基调和文章结构。</p></div><div class="feature-item"><b>05</b><h3>输出验证</h3><p>通过复述、笔试、口试、演讲等方式检验读懂程度。</p></div><div class="feature-item"><b>06</b><h3>阅读习惯</h3><p>制定后续阅读计划，让速读能力真正迁移到日常学习。</p></div></div></div>
      <div class="detail-block reveal show"><h2>典型训练路径</h2><p>课程可根据日常课或集训形式调整。官网展示阶段路径，不直接展示完整课表。</p><div class="course-flow"><div class="flow-item"><b>1</b><span>破限启动</span><p>破除逐字默读，建立快速摄入的基础感知。</p></div><div class="flow-item"><b>2</b><span>页面成像</span><p>训练整页扫描、闪页成像和脑内页面快照。</p></div><div class="flow-item"><b>3</b><span>理解转化</span><p>把文字变成脑内电影或结构图，提升理解效率。</p></div><div class="flow-item"><b>4</b><span>实战检验</span><p>通过限时阅读、笔试、口试和复盘验证真实效果。</p></div><div class="flow-item"><b>5</b><span>阅读计划</span><p>形成后续阅读习惯，把能力迁移到学习和考试。</p></div></div></div>
      <div class="detail-block reveal show"><h2>家长能感受到的变化</h2>${setList(['阅读速度明显提升，面对长文章不再慌乱','读完后能复述核心结构和关键细节','从“逐字念”转向“整体看”，信息处理更主动','做阅读题时更容易抓住重点和作者意图','孩子更愿意读书，阅读从负担变成更有画面感的体验'])}</div>
      <div class="detail-block reveal show"><h2>训练效果参考</h2><p>课程训练目标包括：打破逐字默读习惯、提升整页摄入能力、形成脑内影像或结构图，并通过笔试、口试、复述和实战阅读检验理解效果。</p>${setList(['阅读速度目标：从常规速度向更高效阅读过渡','理解输出目标：读完能讲出来，能抓住结构和重点','考试应用目标：面对大阅读量时更从容，留出更多答题和检查时间'])}</div>
    `;
  }
  const sideCard = document.querySelector('.side-card');
  if (sideCard) sideCard.innerHTML = `<h3>课程信息</h3><p>适合希望突破阅读速度、理解效率和表达输出的学生。</p><div class="side-list"><div><b>对象</b><span>12-18岁青少年</span></div><div><b>重点</b><span>整页摄入、脑内成像</span></div><div><b>目标</b><span>读得快、懂得准、讲得出</span></div><div><b>形式</b><span>阶段训练 / 集训营</span></div><div><b>建议</b><span>具备一定专注基础后学习</span></div></div><a class="btn btn-gold" href="${contactUrl('trial')}">预约体验</a><a class="btn btn-line" href="courses.html">返回课程产品</a>`;
  const cta = document.querySelector('.detail-cta-wrap');
  if (cta) cta.innerHTML = `<div><h2>想知道孩子是否适合学习潜意识阅读？</h2><p>可以先通过一次体验测评，了解孩子当前阅读速度、理解方式和表达输出状态。</p></div><div class="detail-cta-actions"><a class="btn btn-primary" href="${contactUrl('trial')}">预约体验</a><a class="btn btn-gold" href="courses.html">查看全部课程</a></div>`;
}

function init() {
  setupViewportStability();
  setupUnifiedLinks();
  removeLegacyStandaloneForms();
  replaceGlobalTexts();
  applyFocusCourseContent();
  applyReadingCourseContent();
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
