const COMPANY_FULL_NAME = '中科明心(北海)智能科技有限公司';
const COMPANY_SHORT_NAME = '中科明心';
const EXPERIENCE_COURSE_NAME = '心脑学习力体验课';
const FOCUS_COURSE_NAME = '心脑学习力专注营';
const READING_COURSE_NAME = '心脑学习力阅读营';
const SELF_STUDY_COURSE_NAME = '心脑学习力自主营（数学）';
const HERO_SLIDE_DURATION = 7000;

const COURSE_ITEMS = [
  { key: 'experience', name: EXPERIENCE_COURSE_NAME, href: 'evaluation-detail.html' },
  { key: 'focus', name: FOCUS_COURSE_NAME, href: 'course-detail.html' },
  { key: 'reading', name: READING_COURSE_NAME, href: 'camp-detail.html' },
  { key: 'self', name: SELF_STUDY_COURSE_NAME, href: 'public-class-detail.html' }
];

const COURSE_COPY = {
  experience: {
    tag: '体验变化',
    systemTag: '低门槛体验',
    text: '通过短时间任务观察、训练体验和结果反馈，帮助家长初步了解孩子的学习状态和后续训练方向。',
    list: ['初步状态测评', '过程变化体验', '明确改进方向'],
    detailIntro: '适合作为家长了解孩子学习状态的第一步，通过简单任务、训练体验和结果反馈，让家长初步看到孩子的专注、记忆、表达和学习状态变化。',
    paths: ['状态观察', '任务体验', '结果反馈', '后续建议'],
    audience: ['希望先了解孩子学习状态的家庭', '暂不确定适合哪类课程的学生', '希望通过短时体验看到过程变化的家长'],
    effects: ['更清楚孩子当前学习状态', '获得初步训练体验', '明确后续课程匹配方向']
  },
  focus: {
    tag: '专注力提升',
    systemTag: '专注力提升',
    text: '面向8-16岁青少年，以身体稳定、感官专注、图像化记忆、情绪觉察和目标行动为主线，帮助孩子建立更稳定的学习状态。',
    list: ['身体锚定与呼吸训练', '感官专注与图像记忆', '情绪觉察与家庭陪跑'],
    detailIntro: '围绕身体稳定、感官收摄、心像显化、情绪觉察和家庭陪跑，帮助孩子从底层学习状态入手，逐步提升专注力、记忆力、自我觉察和学习内驱力。',
    paths: ['身心安定', '感官专注', '图像记忆', '情绪觉察', '家庭陪跑'],
    audience: ['8-16岁青少年', '专注力不足、情绪波动或学习动力不足的孩子', '希望系统提升学习状态和自我管理能力的家庭'],
    effects: ['更容易安静下来', '专注和记忆方式更清晰', '情绪表达与自我觉察能力提升']
  },
  reading: {
    tag: '高效阅读',
    systemTag: '阅读突破',
    text: '面向12-18岁青少年，训练整页摄入、脑内成像和结构化理解能力，帮助孩子提升阅读效率、理解表达和考试阅读速度。',
    list: ['破除逐字默读习惯', '整页摄入与脑内成像', '速读理解与复述输出'],
    detailIntro: '通过破除逐字默读、整页摄入、脑内成像和结构化理解训练，让孩子把文字转化为画面和结构，提升阅读速度、理解率和复述表达能力。',
    paths: ['破除默读', '整页摄入', '脑内成像', '实战检验', '阅读计划'],
    audience: ['12-18岁青少年', '阅读慢、读完说不清重点的学生', '面对应试阅读量增加，希望提升阅读效率的孩子'],
    effects: ['阅读速度提升', '读完能复述核心结构', '面对大篇幅材料更从容']
  },
  self: {
    tag: '数学自学',
    systemTag: '数学自主营',
    text: '面向小学三年级至初中三年级，围绕数学教材自学训练，使用格定义五步法、格定理四步法和AI辅助提问验证，帮助孩子建立不依赖补课的自主学习能力。',
    list: ['格定义五步法', '格定理四步法', 'AI辅助提问与答案验证'],
    detailIntro: '这是一门面向数学学习的自主学习能力训练营。孩子携带对应年级数学教材、学参和试卷，在导学引导下使用课本、AI工具、问天录和错题本，训练“自己读懂、自己提问、自己验证、自己讲清楚”的学习能力。',
    paths: ['格物入门', '攻坚深化', '知识联网', '自证结营'],
    audience: ['小学三年级至初中三年级学生', '希望减少补习依赖、提升数学自学能力的孩子', '具备基本学习意愿，愿意尝试用AI作为学习助教的学生'],
    effects: ['拿到新数学教材知道怎么学', '能用大白话讲清定义和定理', '能绘制跨章节知识全景图', '形成可迁移到其他学科的自学方法']
  }
};

function cleanCourseName(text) {
  if (!text) return text;
  return text
    .replaceAll('心脑学习力自主营（数学）（数学）', SELF_STUDY_COURSE_NAME)
    .replaceAll('心脑学习力自主营（数学） （数学）', SELF_STUDY_COURSE_NAME);
}

function getPathPrefix() {
  const path = window.location.pathname;
  if (path.includes('/zk/news/company/') || path.includes('/zk/news/growth/') || path.includes('/zk/news/limited/')) return '../../';
  if (path.includes('/zk/expert/') || path.includes('/zk/cases/')) return '../';
  return '';
}

function buildUrl(file, params = '') {
  return `${getPathPrefix()}${file}${params}`;
}

function contactUrl(purpose) {
  return buildUrl('contact.html', `?purpose=${purpose}#contact-form`);
}

function setList(items) {
  return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
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
    node.nodeValue = cleanCourseName(value);
  });
}

function replaceGlobalTexts() {
  const replacements = [
    ['中科心智能教育科技服务平台', COMPANY_FULL_NAME],
    ['中科心智能', COMPANY_SHORT_NAME],
    ['身心脑一体化专注力课程', FOCUS_COURSE_NAME],
    ['心脑学习力成长课', FOCUS_COURSE_NAME],
    ['学习力成长体系', FOCUS_COURSE_NAME],
    ['潜意识阅读', READING_COURSE_NAME],
    ['心脑学习力强化营', READING_COURSE_NAME],
    ['五四学习法数学实训营', SELF_STUDY_COURSE_NAME],
    ['心脑学习力公开课', SELF_STUDY_COURSE_NAME],
    ['心脑学习力自主营（数学）（数学）', SELF_STUDY_COURSE_NAME],
    ['心脑学习力自主营（数学）', SELF_STUDY_COURSE_NAME],
    ['心脑学习力自主营', SELF_STUDY_COURSE_NAME]
  ];
  replacements.forEach(([from, to]) => { document.title = cleanCourseName(document.title.replaceAll(from, to)); });
  document.querySelectorAll('meta[content]').forEach(meta => {
    replacements.forEach(([from, to]) => { meta.content = cleanCourseName(meta.content.replaceAll(from, to)); });
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
    .hero .hero-actions {
      opacity: 1 !important;
      visibility: visible !important;
      transform: translate3d(0,0,0) !important;
    }
  `;
  document.head.appendChild(style);
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
  const itemLinks = items.map(item => `<a href="${item.href}">${cleanCourseName(item.text)}</a>`).join('');
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
      if (!isMobileNav()) {
        closeAll(item);
        item.classList.add('open');
        link.setAttribute('aria-expanded', 'true');
      }
    });
    item.addEventListener('mouseleave', () => {
      if (!isMobileNav()) {
        item.classList.remove('open');
        link.setAttribute('aria-expanded', 'false');
      }
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
      ${createNavDropdown('课程产品', link('courses.html'), COURSE_ITEMS.map(item => ({ text: item.name, href: link(item.href) })), active === 'courses')}
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
      <div><h4>课程产品</h4>${COURSE_ITEMS.map(item => `<a href="${link(item.href)}">${item.name}</a>`).join('')}</div>
      <div><h4>专家团队</h4><a href="${link('experts.html')}">核心专家</a><a href="${link('assistants.html')}">助教团队</a></div>
      <div><h4>经典案例</h4><a href="${link('cases.html')}">案例总览</a></div>
      <div><h4>新闻活动</h4><a href="${link('company-news.html')}">公司动态</a><a href="${link('growth-news.html')}">成长资讯</a><a href="${link('limited-activity.html')}">限时活动</a></div>
      <div><h4>加盟合作</h4><a href="${link('join.html')}">合作对象</a><a href="${contactUrl('cooperation')}">在线申请</a><a href="${link('contact.html')}">联系我们</a><a href="${link('privacy.html')}">隐私政策</a></div>
    `;
  }
  const copyright = document.querySelector('.copyright');
  if (copyright) copyright.textContent = `© 2026 ${COMPANY_FULL_NAME}`;
  if (!document.querySelector('.sticky')) {
    const stickyEl = document.createElement('div');
    stickyEl.className = 'sticky';
    document.body.insertBefore(stickyEl, document.querySelector('script[src*="main.js"]') || null);
  }
  const sticky = document.querySelector('.sticky');
  if (sticky) sticky.innerHTML = `<a href="${contactUrl('trial')}">预约</a><a href="${contactUrl('cooperation')}">合作</a>`;
}

function normalizeLegacyAnchors() {
  const contactLinks = {
    '#assessment': contactUrl('trial'),
    'index.html#assessment': contactUrl('trial'),
    '#join': contactUrl('cooperation'),
    'index.html#join': contactUrl('cooperation'),
    '#contact': buildUrl('contact.html')
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
    } else {
      alert('信息已提交，我们会尽快与你联系。');
    }
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

function updateCourseCard(card, item, mode = 'home') {
  if (!card || !item) return;
  const copy = COURSE_COPY[item.key];
  const title = card.querySelector('h3');
  const text = card.querySelector('p');
  const list = card.querySelector('ul');
  const tag = card.querySelector('.tag, .label');
  const more = card.querySelector('.more');
  if (title) title.textContent = item.name;
  if (tag) tag.textContent = mode === 'system' ? copy.systemTag : copy.tag;
  if (text) text.textContent = copy.text;
  if (list) list.innerHTML = copy.list.map(point => `<li>${point}</li>`).join('');
  if (more) {
    more.textContent = 'FIND MORE';
    more.setAttribute('href', item.href);
  }
}

function updateCourseCards() {
  document.querySelectorAll('#course .product-grid .product-card').forEach((card, index) => updateCourseCard(card, COURSE_ITEMS[index], 'home'));
  document.querySelectorAll('.system-grid .system-card').forEach((card, index) => updateCourseCard(card, COURSE_ITEMS[index], 'system'));
  document.querySelectorAll('.course-list .course-card').forEach((card, index) => updateCourseCard(card, COURSE_ITEMS[index], 'detail-list'));
}

function setupDetailPage() {
  const file = window.location.pathname.split('/').pop();
  const detailMap = {
    'evaluation-detail.html': COURSE_ITEMS[0],
    'course-detail.html': COURSE_ITEMS[1],
    'camp-detail.html': COURSE_ITEMS[2],
    'public-class-detail.html': COURSE_ITEMS[3]
  };
  const item = detailMap[file];
  if (!item) return;
  const copy = COURSE_COPY[item.key];
  const heroTitle = document.querySelector('.detail-hero h1');
  if (heroTitle) heroTitle.textContent = item.name;
  const heroDesc = document.querySelector('.detail-hero p');
  if (heroDesc) heroDesc.textContent = copy.detailIntro || copy.text;
  const detailTags = document.querySelector('.detail-tags');
  if (detailTags) detailTags.innerHTML = `<span>${copy.tag}</span><span>青少年学习力</span><span>阶段训练</span><span>过程反馈</span>`;
  const detailMain = document.querySelector('.detail-main');
  if (detailMain) {
    const pathText = {
      experience: ['观察孩子当前学习状态', '通过短时任务体验训练过程', '对比反馈孩子过程变化', '给出后续课程建议'],
      focus: ['稳定身体和呼吸状态', '训练感官专注和图像记忆', '引导情绪觉察与表达', '形成家庭陪跑任务'],
      reading: ['破除逐字默读习惯', '训练整页摄入和脑内快照', '形成脑内电影或结构图', '通过复述和测试检验理解'],
      self: ['第1天：格物入门，掌握格定义五步法并完成第一章通关', '第2天：攻坚深化，训练格定理四步法并完成二三章学习', '第3天：知识联网，绘制数学知识全景图并进行模拟考', '第4天：自证结营，错题围剿、闭卷大考和自学计划制定']
    };
    const extraBlock = item.key === 'self'
      ? `<div class="detail-block reveal show"><h2>数学训练重点</h2>${setList(['用“逐字读—问自己—问AI—做例题—一句话总结”理解数学定义', '用“条件结论—逆定理—多种证明—生活实例”吃透数学定理', '训练孩子向AI提出精准问题，并验证AI答案是否可靠', '用费曼互讲、错题本和知识全景图检验是否真正学懂'])}</div>`
      : '';
    detailMain.innerHTML = `
      <div class="detail-block reveal show"><h2>课程定位</h2><p>${copy.detailIntro || copy.text}</p><p>官网页面只展示家长判断课程是否适合所需的核心信息，完整课表和细化方案建议在咨询后根据孩子情况单独沟通。</p></div>
      <div class="detail-block reveal show"><h2>核心训练内容</h2>${setList(copy.list)}</div>
      ${extraBlock}
      <div class="detail-block reveal show"><h2>典型训练路径</h2><div class="course-flow">${(pathText[item.key] || copy.paths).map((step, index) => `<div class="flow-item"><b>${index + 1}</b><span>${copy.paths[index] || step}</span><p>${step}</p></div>`).join('')}</div></div>
      <div class="detail-block reveal show"><h2>适合对象</h2>${setList(copy.audience)}</div>
      <div class="detail-block reveal show"><h2>学后变化</h2>${setList(copy.effects)}</div>
    `;
  }
  const sideCard = document.querySelector('.side-card');
  if (sideCard) sideCard.innerHTML = `<h3>课程信息</h3><p>${copy.text}</p><div class="side-list"><div><b>课程</b><span>${item.name}</span></div><div><b>重点</b><span>${copy.list[0]}</span></div><div><b>方式</b><span>体验 / 训练 / 反馈</span></div></div><a class="btn btn-gold" href="${contactUrl('trial')}">预约体验</a><a class="btn btn-line" href="courses.html">返回课程产品</a>`;
  const cta = document.querySelector('.detail-cta-wrap');
  if (cta) cta.innerHTML = `<div><h2>先从一次体验沟通开始</h2><p>通过体验测评了解孩子当前状态，再判断适合哪一类课程。</p></div><div class="detail-cta-actions"><a class="btn btn-primary" href="${contactUrl('trial')}">预约体验</a><a class="btn btn-gold" href="courses.html">查看全部课程</a></div>`;
}

function setupHeroSlider() {
  const hero = document.querySelector('.hero');
  const progress = document.querySelector('.progress-line');
  const slides = [...document.querySelectorAll('.slide')];
  const dots = [...document.querySelectorAll('.hero-dots button')];
  if (!slides.length) return;
  const heroInner = document.querySelector('.hero-inner');
  if (heroInner) heroInner.classList.add('anim');
  let current = slides.findIndex(slide => slide.classList.contains('active'));
  if (current < 0) current = 0;
  let timer = null;
  const activate = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    if (progress) {
      progress.classList.remove('cur');
      progress.style.animation = 'none';
      void progress.offsetWidth;
      progress.classList.add('cur');
      progress.style.animation = `heroLine ${HERO_SLIDE_DURATION / 1000}s linear infinite`;
    }
  };
  const start = () => {
    if (timer) clearInterval(timer);
    timer = setInterval(() => activate(current + 1), HERO_SLIDE_DURATION);
  };
  dots.forEach((dot, index) => dot.addEventListener('click', () => { activate(index); start(); }));
  if (hero) {
    hero.addEventListener('mouseenter', () => timer && clearInterval(timer));
    hero.addEventListener('mouseleave', start);
  }
  activate(current);
  start();
}

function setupRevealAnimation() {
  const reveals = [...document.querySelectorAll('.reveal')];
  if (!reveals.length) return;
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('show'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
}

function setupMenuAndModal() {
  const hamburger = document.querySelector('.hamb');
  const nav = document.querySelector('header nav');
  if (hamburger && nav) hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburger.classList.toggle('expanded');
    document.body.classList.toggle('nav-open');
  });
  const modal = document.getElementById('modal');
  if (modal) modal.addEventListener('click', event => {
    if (event.target === modal || event.target.id === 'closeModal') modal.classList.remove('show');
  });
}

function setupHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  const sync = () => header.classList.toggle('scrolled', window.scrollY > 20 || !document.querySelector('.hero'));
  sync();
  window.addEventListener('scroll', sync, { passive: true });
}

function setupLoadingCurtain() {
  const loading = document.querySelector('.loading');
  if (!loading) return;
  loading.classList.add('loading-curtain');
  if (!loading.querySelector('.curtain-panel')) {
    const top = document.createElement('div');
    const bottom = document.createElement('div');
    top.className = 'curtain-panel curtain-top';
    bottom.className = 'curtain-panel curtain-bottom';
    loading.prepend(top);
    loading.appendChild(bottom);
  }
  loading.classList.remove('done');
  loading.classList.remove('hide');
  requestAnimationFrame(() => {
    setTimeout(() => loading.classList.add('hide'), 260);
    setTimeout(() => loading.classList.add('done'), 1600);
  });
}

function setupPageTransitions() {
  if (document.getElementById('pageTransitionStyle')) return;
  const style = document.createElement('style');
  style.id = 'pageTransitionStyle';
  style.textContent = `
    .page-transition-mask {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: grid;
      place-items: center;
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      transition: opacity .42s cubic-bezier(.77,0,.175,1), visibility .42s;
      background:
        radial-gradient(circle at 70% 25%, rgba(199,175,130,.22), transparent 32%),
        linear-gradient(135deg, rgba(4,92,57,.98), rgba(16,27,23,.98));
    }
    .page-transition-mask.active {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
    .page-transition-mask::before,
    .page-transition-mask::after {
      content: '';
      position: absolute;
      inset: 0;
      transform: translateX(-105%) skewX(-9deg);
      background: rgba(255,255,255,.10);
      transition: transform .62s cubic-bezier(.77,0,.175,1);
    }
    .page-transition-mask::after {
      background: rgba(199,175,130,.20);
      transition-delay: .08s;
    }
    .page-transition-mask.active::before,
    .page-transition-mask.active::after {
      transform: translateX(105%) skewX(-9deg);
    }
    .page-transition-mark {
      position: relative;
      z-index: 2;
      color: #fff;
      letter-spacing: 5px;
      font-size: 12px;
      text-transform: uppercase;
      opacity: .86;
    }
    body.page-enter {
      animation: pageEnter .5s ease both;
    }
    @keyframes pageEnter {
      from { opacity: .01; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (prefers-reduced-motion: reduce) {
      .page-transition-mask, .page-transition-mask::before, .page-transition-mask::after { transition: none !important; }
      body.page-enter { animation: none !important; }
    }
  `;
  document.head.appendChild(style);
  const mask = document.createElement('div');
  mask.className = 'page-transition-mask';
  mask.innerHTML = '<span class="page-transition-mark">Loading</span>';
  document.body.appendChild(mask);
  document.body.classList.add('page-enter');

  window.addEventListener('pageshow', () => mask.classList.remove('active'));

  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
    if (anchor.target && anchor.target !== '_self') return;
    if (anchor.hasAttribute('download')) return;

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch (error) {
      return;
    }
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && url.hash) return;

    event.preventDefault();
    mask.classList.add('active');
    setTimeout(() => { window.location.href = url.href; }, 430);
  });
}

function init() {
  setupViewportStability();
  setupPageTransitions();
  setupLoadingCurtain();
  setupUnifiedLinks();
  removeLegacyStandaloneForms();
  replaceGlobalTexts();
  updateCourseCards();
  setupDetailPage();
  setupUnifiedInquiryForm();
  setupDemoForms();
  setupHeroSlider();
  setupRevealAnimation();
  setupMenuAndModal();
  setupHeaderScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
