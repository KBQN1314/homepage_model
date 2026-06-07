const COMPANY_FULL_NAME = '中科明心(北海)智能科技有限公司';
const COMPANY_SHORT_NAME = '中科明心';
const HERO_SLIDE_DURATION = 7000;

const COURSE_ITEMS = [
  { key: 'experience', name: '心脑学习力体验课', href: 'evaluation-detail.html', price: '199元 / 节（约2小时）' },
  { key: 'focus', name: '心脑学习力专注营', href: 'course-detail.html', price: '9800元 / 期（7天6夜）' },
  { key: 'memory', name: '心脑学习力记忆营', href: 'photo-memory-detail.html', price: '9800元 / 期（7天6夜）' },
  { key: 'reading', name: '心脑学习力阅读营', href: 'camp-detail.html', price: '9800元 / 期（7天6夜）' },
  { key: 'self', name: '心脑学习力自主营（数学）', href: 'public-class-detail.html', price: '9800元 / 期（7天6夜）' }
];

const COURSE_COPY = {
  experience: {
    tag: '低门槛体验', systemTag: '状态测评',
    text: '用一节约2小时的体验课，帮助家长看清孩子真实学习状态：专注、记忆、表达、情绪和任务启动到底卡在哪里，再判断后续是否需要系统训练。',
    list: ['学习状态观察', '短时训练体验', '结果反馈与建议'],
    detailIntro: '很多家长并不确定孩子到底是“不想学”、 “不会学”，还是专注、记忆、情绪和任务启动能力出了问题。心脑学习力体验课以约2小时的低门槛体验，让家长先看到孩子在任务中的真实表现和初步变化，再决定是否继续系统训练。',
    paths: ['状态观察', '训练体验', '对比反馈', '课程匹配'],
    audience: ['第一次了解课程体系，希望先低成本体验的家庭', '不确定孩子适合专注营、记忆营、阅读营还是自主营的家长', '孩子存在拖拉、走神、记不住、表达不清或学习动力不足等情况', '希望先看到孩子过程变化，再决定是否报名系统课程的家庭'],
    effects: ['更清楚孩子当前学习状态和主要卡点', '通过短时任务看到孩子的专注、记忆和表达反应', '获得更具体的后续课程匹配建议', '降低盲目报名成本，让家长先判断是否适合继续训练']
  },
  focus: {
    tag: '专注力提升', systemTag: '专注力提升',
    text: '面向8-16岁青少年，围绕专注力、记忆力、情绪觉察和学习内驱力进行系统训练，帮助孩子从“坐不住、记不牢、容易烦”逐步走向更稳定的学习状态。',
    list: ['身体锚定与呼吸训练', '感官专注与图像记忆', '情绪觉察与家庭陪跑'],
    detailIntro: '孩子不是不努力，很多时候是底层学习状态还没有稳定下来。心脑学习力专注营从身体稳定、感官专注、图像化记忆、情绪觉察和家庭陪跑入手，帮助孩子把“静下来、看进去、记得住、愿意学”变成可训练的能力。',
    paths: ['专注启动', '感官聚焦', '图像记忆', '情绪觉察', '家庭陪跑'],
    audience: ['8-16岁青少年', '写作业拖拉、上课走神、容易被手机和外界刺激带走的孩子', '背诵效率低、记不牢、读完说不清重点的学生', '情绪波动明显、遇到困难容易烦躁退缩的孩子', '希望系统提升学习状态和家庭陪伴质量的家庭'],
    effects: ['更容易安静下来，进入学习状态更快', '专注力、记忆方式和任务完成感更清晰', '能初步觉察情绪，不再完全被烦躁和拖延牵着走', '通过21天陪跑机制，把营期变化延伸到家庭学习场景']
  },
  memory: {
    tag: '图像记忆', systemTag: '记忆强化',
    text: '面向10-18岁青少年，训练静定专注、脑屏成像、整页摄入和学科迁移能力，帮助孩子把文字、图表和公式转化为脑内图像进行高效记忆。',
    list: ['静定训练与脑屏激活', '整页摄入与信息提取', '古诗英语公式学科迁移'],
    detailIntro: '这是一门围绕脑内成像能力设计的记忆训练课程。课程通过静定训练、残像训练、烛光观想、整页摄入和学科内容迁移，帮助孩子在深度专注状态下把文字、图表、古诗文、英语单词和理科公式转化为可提取的脑内图像。',
    paths: ['静定打底', '脑屏激活', '整页摄入', '学科迁移', '实战验证'],
    audience: ['10-18岁青少年', '具备基本静坐能力，能够安静坐下15分钟以上的学生', '背诵慢、记不牢、希望提升记忆效率的孩子', '已完成专注力阶段训练，希望继续强化图像记忆能力的学生'],
    effects: ['背诵不再只靠反复读，能用图像方式辅助记忆', '古诗文、英语单词、理科公式记忆效率提升', '专注学习时长提升，更容易坐得住', '通过阶段考核建立“我能记住”的学习信心']
  },
  reading: {
    tag: '高效阅读', systemTag: '阅读突破',
    text: '面向12-18岁青少年，训练整页摄入、脑内成像和结构化理解能力，帮助孩子提升阅读效率、理解表达和考试阅读速度。',
    list: ['破除逐字默读习惯', '整页摄入与脑内成像', '速读理解与复述输出'],
    detailIntro: '通过破除逐字默读、整页摄入、脑内成像和结构化理解训练，让孩子把文字转化为画面和结构，提升阅读速度、理解率和复述表达能力。',
    paths: ['破除默读', '整页摄入', '脑内成像', '实战检验', '阅读计划'],
    audience: ['12-18岁青少年', '阅读慢、读完说不清重点的学生', '面对应试阅读量增加，希望提升阅读效率的孩子'],
    effects: ['阅读速度提升', '读完能复述核心结构', '面对大篇幅材料更从容']
  },
  self: {
    tag: '数学自学', systemTag: '数学自主营',
    text: '面向小学三年级至初中三年级，围绕数学教材自学训练，使用格定义五步法、格定理四步法和AI辅助提问验证，帮助孩子建立不依赖补课的自主学习能力。',
    list: ['格定义五步法', '格定理四步法', 'AI辅助提问与答案验证'],
    detailIntro: '这是一门面向数学学习的自主学习能力训练营。孩子携带对应年级数学教材、学参和试卷，在导学引导下使用课本、AI工具、问天录和错题本，训练“自己读懂、自己提问、自己验证、自己讲清楚”的学习能力。',
    paths: ['格物入门', '攻坚深化', '知识联网', '自证结营'],
    audience: ['小学三年级至初中三年级学生', '希望减少补习依赖、提升数学自学能力的孩子', '具备基本学习意愿，愿意尝试用AI作为学习助教的学生'],
    effects: ['拿到新数学教材知道怎么学', '能用大白话讲清定义和定理', '能绘制跨章节知识全景图', '形成可迁移到其他学科的自学方法']
  }
};

function cleanCourseName(text) {
  return text ? text
    .replaceAll('心脑学习力自主营（数学）（数学）', '心脑学习力自主营（数学）')
    .replaceAll('心脑学习力自主营（数学） （数学）', '心脑学习力自主营（数学）') : text;
}
function getPathPrefix() {
  const p = location.pathname;
  if (p.includes('/zk/news/company/') || p.includes('/zk/news/growth/') || p.includes('/zk/news/limited/')) return '../../';
  if (p.includes('/zk/expert/') || p.includes('/zk/cases/')) return '../';
  return '';
}
function buildUrl(file, params = '') { return `${getPathPrefix()}${file}${params}`; }
function contactUrl(purpose) { return buildUrl('contact.html', `?purpose=${purpose}#contact-form`); }
function setList(items) { return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`; }
function getActivePage() {
  const p = location.pathname;
  const f = p.split('/').pop() || 'index.html';
  if (f === 'index.html' || p.endsWith('/zk/')) return 'home';
  if (f === 'about.html') return 'about';
  if (['courses.html', 'course-detail.html', 'evaluation-detail.html', 'camp-detail.html', 'public-class-detail.html', 'photo-memory-detail.html'].includes(f)) return 'courses';
  if (['team.html', 'team-page-2.html', 'experts.html', 'assistants.html'].includes(f) || p.includes('/zk/expert/')) return 'team';
  if (f === 'cases.html' || p.includes('/zk/cases/')) return 'cases';
  if (['news.html', 'company-news.html', 'growth-news.html', 'limited-activity.html'].includes(f) || p.includes('/zk/news/')) return 'news';
  if (f === 'join.html') return 'join';
  if (f === 'contact.html') return 'contact';
  return '';
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
  style.textContent = `html{font-size:100%;-webkit-text-size-adjust:100%;text-size-adjust:100%}html,body{width:100%;max-width:100%;min-width:0}input,select,textarea,button{font-size:16px}.reveal{transform:translateY(52px)!important}.reveal.show{transform:translateY(0)!important}.hero .hero-inner,.hero .hero-inner .eyebrow,.hero .hero-inner h1,.hero .hero-inner h2,.hero .hero-inner p,.hero .hero-actions{opacity:1!important;visibility:visible!important;transform:translate3d(0,0,0)!important}`;
  document.head.appendChild(style);
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
    ['照相记忆', '心脑学习力记忆营'],
    ['身心脑一体化专注力课程', '心脑学习力专注营'],
    ['心脑学习力成长课', '心脑学习力专注营'],
    ['学习力成长体系', '心脑学习力专注营'],
    ['潜意识阅读', '心脑学习力阅读营'],
    ['心脑学习力强化营', '心脑学习力阅读营'],
    ['五四学习法数学实训营', '心脑学习力自主营（数学）'],
    ['心脑学习力公开课', '心脑学习力自主营（数学）'],
    ['心脑学习力自主营（数学）（数学）', '心脑学习力自主营（数学）'],
    ['心脑学习力自主营', '心脑学习力自主营（数学）']
  ];
  replacements.forEach(([from, to]) => { document.title = cleanCourseName(document.title.replaceAll(from, to)); });
  document.querySelectorAll('meta[content]').forEach(meta => {
    replacements.forEach(([from, to]) => { meta.content = cleanCourseName(meta.content.replaceAll(from, to)); });
  });
  replaceTextInNode(document.body, replacements);
}
function injectNavStylesheet(prefix) {
  if (document.querySelector('link[data-nav-dropdown]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `${prefix}statics/style/nav-dropdown.css`;
  link.dataset.navDropdown = 'true';
  document.head.appendChild(link);
}
function createNavLink(label, href, active) { return `<a class="nav-direct${active ? ' nav-active' : ''}" href="${href}">${label}</a>`; }
function createNavDropdown(label, href, items, active) { return `<div class="nav-item has-dropdown${active ? ' nav-active' : ''}"><a class="nav-link" href="${href}" aria-expanded="false">${label}</a><div class="nav-panel">${items.map(item => `<a href="${item.href}">${cleanCourseName(item.text)}</a>`).join('')}</div></div>`; }
function setupDropdownEvents() {
  const items = [...document.querySelectorAll('.nav-item.has-dropdown')];
  if (!items.length) return;
  const isMobile = () => matchMedia('(max-width: 1100px)').matches;
  const closeAll = except => items.forEach(item => {
    if (item === except) return;
    item.classList.remove('open');
    const link = item.querySelector('.nav-link');
    if (link) link.setAttribute('aria-expanded', 'false');
  });
  items.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (!link) return;
    link.addEventListener('click', event => {
      if (!isMobile()) return;
      event.preventDefault();
      const open = !item.classList.contains('open');
      closeAll(item);
      item.classList.toggle('open', open);
      link.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    item.addEventListener('mouseenter', () => { if (!isMobile()) { closeAll(item); item.classList.add('open'); link.setAttribute('aria-expanded', 'true'); } });
    item.addEventListener('mouseleave', () => { if (!isMobile()) { item.classList.remove('open'); link.setAttribute('aria-expanded', 'false'); } });
  });
  document.addEventListener('click', event => { if (!event.target.closest('.nav-item.has-dropdown')) closeAll(); });
  addEventListener('resize', () => closeAll());
}
function setupUnifiedLinks() {
  const prefix = getPathPrefix();
  const active = getActivePage();
  const link = file => `${prefix}${file}`;
  injectNavStylesheet(prefix);
  const brand = document.querySelector('.brand');
  if (brand) {
    brand.href = link('index.html');
    brand.innerHTML = `<img src="${link('statics/images/logo.svg')}" alt="${COMPANY_SHORT_NAME} Logo" style="width:50px;height:50px;display:block;flex:none;object-fit:contain;filter:drop-shadow(0 8px 18px rgba(16,27,23,.18));"><span><strong>${COMPANY_SHORT_NAME}</strong><span>Education Platform</span></span>`;
  }
  const nav = document.querySelector('header nav');
  if (nav) {
    nav.className = 'nav-dropdowns';
    nav.innerHTML = `${createNavLink('首页', link('index.html'), active === 'home')}${createNavLink('关于我们', link('about.html'), active === 'about')}${createNavDropdown('课程产品', link('courses.html'), COURSE_ITEMS.map(item => ({ text: item.name, href: link(item.href) })), active === 'courses')}${createNavDropdown('专家团队', link('experts.html'), [{ text: '核心专家', href: link('experts.html') }, { text: '助教团队', href: link('assistants.html') }], active === 'team')}${createNavLink('经典案例', link('cases.html'), active === 'cases')}${createNavDropdown('新闻活动', link('news.html'), [{ text: '公司动态', href: link('company-news.html') }, { text: '成长资讯', href: link('growth-news.html') }, { text: '限时活动', href: link('limited-activity.html') }], active === 'news')}${createNavLink('加盟合作', link('join.html'), active === 'join')}${createNavLink('联系我们', link('contact.html'), active === 'contact')}`;
    setupDropdownEvents();
  }
  const cta = document.querySelector('.nav-cta');
  if (cta) cta.innerHTML = `<a class="btn btn-line" href="${contactUrl('trial')}">预约体验</a><a class="btn btn-gold" href="${contactUrl('cooperation')}">申请合作</a>`;
  const footer = document.querySelector('.footer');
  if (footer) footer.innerHTML = `<div class="container"><div class="footer-grid"><div><div class="brand-mini">${COMPANY_SHORT_NAME}</div></div><div><h4>关于我们</h4><a href="${link('about.html')}">公司简介</a><a href="${link('about.html')}">服务方向</a><a href="${link('about.html')}">发展愿景</a></div><div><h4>课程产品</h4>${COURSE_ITEMS.map(item => `<a href="${link(item.href)}">${item.name}</a>`).join('')}</div><div><h4>团队案例</h4><a href="${link('experts.html')}">专家团队</a><a href="${link('assistants.html')}">助教团队</a><a href="${link('cases.html')}">成功案例</a></div><div><h4>新闻活动</h4><a href="${link('company-news.html')}">公司动态</a><a href="${link('growth-news.html')}">成长资讯</a><a href="${link('limited-activity.html')}">限时活动</a></div><div><h4>加盟合作</h4><a href="${link('join.html')}">合作对象</a><a href="${link('join.html')}">在线申请</a><a href="${link('contact.html')}">联系我们</a></div></div><div class="copyright">© 2026 ${COMPANY_FULL_NAME}</div></div>`;
  const sticky = document.querySelector('.sticky');
  if (sticky) sticky.innerHTML = `<a href="${contactUrl('trial')}">预约</a><a href="${contactUrl('cooperation')}">合作</a>`;
}
function normalizeLegacyAnchors() {
  const map = { '#assessment': contactUrl('trial'), 'index.html#assessment': contactUrl('trial'), '#join': contactUrl('cooperation'), 'index.html#join': contactUrl('cooperation'), '#contact': buildUrl('contact.html') };
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (map[href]) link.href = map[href];
  });
}
function removeLegacyStandaloneForms() { document.querySelectorAll('.assess-form,.join-form').forEach(form => { if (form.id !== 'unifiedInquiryForm') form.remove(); }); }
function setupUnifiedInquiryForm() {
  const form = document.getElementById('unifiedInquiryForm');
  if (!form) return;
  const select = document.getElementById('purposeSelect');
  const fields = [...form.querySelectorAll('.dynamic-fields')];
  const message = document.getElementById('messageField');
  const button = form.querySelector('button[type="submit"]');
  const placeholders = { consult: '请说明孩子目前学习状态、想了解的课程或主要疑问', trial: '请说明孩子目前主要情况，以及希望预约体验的大致时间', cooperation: '请简要说明所在城市、现有资源和合作想法', activity: '请说明活动地点、预计人数、时间安排和合作需求', feedback: '请说明需要反馈或改进的具体事项', other: '请简要说明你的需求' };
  function update() {
    const value = select ? select.value : 'consult';
    fields.forEach(field => { field.hidden = field.dataset.for !== value; });
    if (message) message.placeholder = placeholders[value] || placeholders.other;
    if (button) button.textContent = value === 'cooperation' ? '提交合作申请' : value === 'trial' ? '提交预约信息' : '提交信息';
  }
  if (select) {
    const purpose = new URLSearchParams(location.search).get('purpose');
    if (purpose && [...select.options].some(option => option.value === purpose)) select.value = purpose;
    select.addEventListener('change', update);
  }
  update();
}
function setupDemoForms() { document.querySelectorAll('.demo-form').forEach(form => form.addEventListener('submit', event => { event.preventDefault(); const modal = document.getElementById('modal'); if (modal) modal.classList.add('show'); })); }
function ensureCards(container, selector, html) { if (!container) return; while (container.querySelectorAll(selector).length < COURSE_ITEMS.length) container.insertAdjacentHTML('beforeend', html()); }
function updateCourseCard(card, item, mode = 'home') {
  if (!card || !item) return;
  const copy = COURSE_COPY[item.key];
  const title = card.querySelector('h3');
  const text = card.querySelector('p');
  const list = card.querySelector('ul');
  const tag = card.querySelector('.tag,.label');
  const more = card.querySelector('.more');
  if (title) title.textContent = item.name;
  if (tag) tag.textContent = mode === 'system' ? copy.systemTag : copy.tag;
  if (text) text.textContent = copy.text;
  if (list) list.innerHTML = copy.list.map(point => `<li>${point}</li>`).join('');
  if (more) { more.textContent = 'FIND MORE'; more.href = item.href; }
}
function updateCourseCards() {
  const productGrid = document.querySelector('#course .product-grid');
  ensureCards(productGrid, '.product-card', () => '<article class="product-card reveal show"><span class="tag"></span><h3></h3><p></p><ul></ul><a class="more" href="#">FIND MORE</a></article>');
  productGrid?.querySelectorAll('.product-card').forEach((card, index) => updateCourseCard(card, COURSE_ITEMS[index], 'home'));
  const systemGrid = document.querySelector('.system-grid');
  ensureCards(systemGrid, '.system-card', () => '<div class="system-card reveal show"><span class="label"></span><h3></h3><p></p></div>');
  systemGrid?.querySelectorAll('.system-card').forEach((card, index) => updateCourseCard(card, COURSE_ITEMS[index], 'system'));
  const courseList = document.querySelector('.course-list');
  ensureCards(courseList, '.course-card', () => '<article class="course-card reveal show"><h3></h3><p></p><ul></ul></article>');
  courseList?.querySelectorAll('.course-card').forEach((card, index) => updateCourseCard(card, COURSE_ITEMS[index], 'detail-list'));
}
function setupDetailPage() {
  const file = location.pathname.split('/').pop();
  const map = { 'evaluation-detail.html': COURSE_ITEMS[0], 'course-detail.html': COURSE_ITEMS[1], 'photo-memory-detail.html': COURSE_ITEMS[2], 'camp-detail.html': COURSE_ITEMS[3], 'public-class-detail.html': COURSE_ITEMS[4] };
  const item = map[file];
  if (!item) return;
  const copy = COURSE_COPY[item.key];
  const heroTitle = document.querySelector('.detail-hero h1');
  const heroDesc = document.querySelector('.detail-hero p');
  if (heroTitle) heroTitle.textContent = item.name;
  if (heroDesc) heroDesc.textContent = copy.detailIntro || copy.text;
  const tags = document.querySelector('.detail-tags');
  if (tags) tags.innerHTML = `<span>${copy.tag}</span><span>青少年学习力</span><span>阶段训练</span><span>过程反馈</span>`;
  const pathText = {
    experience: ['第1步：通过简单任务观察孩子的专注、记忆、表达和任务启动状态', '第2步：安排短时训练体验，让家长看到孩子在方法引导下的过程变化', '第3步：对比体验前后的表现，帮助家长判断主要卡点和优势', '第4步：根据孩子状态匹配专注营、记忆营、阅读营或自主营方向'],
    focus: ['第1阶段：身体锚定与呼吸训练，让孩子先从身体层面安定下来，建立进入学习状态的入口', '第2阶段：微观观察、听觉追踪和感官专注训练，帮助大脑学会过滤干扰、锁定任务', '第3阶段：图像记忆、心像显化和表达训练，把“记不住”转化为“看得见、说得出”', '第4阶段：情绪觉察、目标承诺和21天家庭陪跑，把营期变化延伸到家庭学习场景'],
    memory: ['第1-2天：静定训练、残像训练和脑屏激活，建立稳定成像基础', '第3-4天：从整段摄入到整页摄入，训练从脑内页面直接提取信息', '第5-6天：迁移到古诗文、英语单词和理科公式等学科内容', '第7天：通过陌生材料笔试和口试，检验真实记忆效果'],
    reading: ['破除逐字默读习惯', '训练整页摄入和脑内快照', '形成脑内电影或结构图', '通过复述和测试检验理解'],
    self: ['第1天：格物入门，掌握格定义五步法并完成第一章通关', '第2天：攻坚深化，训练格定理四步法并完成二三章学习', '第3天：知识联网，绘制数学知识全景图并进行模拟考', '第4天：自证结营，错题围剿、闭卷大考和自学计划制定']
  };
  let extra = '';
  if (item.key === 'experience') {
    extra = `<div class="detail-block reveal show"><h2>为什么建议先上体验课？</h2><div class="course-flow"><div class="flow-item"><b>1</b><span>少走弯路</span><p>很多家庭一开始并不知道孩子到底卡在专注、记忆、阅读、情绪还是学习方法上，先体验能降低盲目报名成本。</p></div><div class="flow-item"><b>2</b><span>看见过程</span><p>不是只听介绍，而是通过短时任务观察孩子真实反应，看他能不能跟上训练、是否愿意投入。</p></div><div class="flow-item"><b>3</b><span>判断适配</span><p>体验后再判断适合专注营、记忆营、阅读营还是自主营，避免课程选择和孩子状态不匹配。</p></div><div class="flow-item"><b>4</b><span>低门槛决策</span><p>199元约2小时，先看孩子状态和服务方式，再决定是否进入9800元系统训练营。</p></div></div></div><div class="detail-block reveal show"><h2>体验课家长关注点</h2>${setList(['孩子进入任务的速度：是很快投入，还是需要反复提醒', '孩子面对任务的反应：是愿意尝试，还是容易烦躁退缩', '孩子的信息处理方式：是能观察、能复述，还是看完说不清', '孩子对训练方式的接受度：是否愿意跟随老师完成短时训练'])}</div>`;
  }
  if (item.key === 'focus') {
    extra = `<div class="detail-block reveal show"><h2>为什么孩子需要先训练专注力？</h2><div class="course-flow"><div class="flow-item"><b>1</b><span>坐不住</span><p>不是孩子故意拖拉，而是身体和注意系统还没有稳定下来，学习一开始就容易分心。</p></div><div class="flow-item"><b>2</b><span>记不牢</span><p>只靠反复读和硬背，容易学得慢、忘得快，需要把文字、声音和画面连接起来。</p></div><div class="flow-item"><b>3</b><span>容易烦</span><p>遇到难题就抵触，往往不是态度问题，而是情绪觉察和自我调节能力还需要训练。</p></div><div class="flow-item"><b>4</b><span>没动力</span><p>当孩子看不到自己的进步，就容易被动学习；课程通过可感知的小变化重建“我能行”。</p></div></div></div><div class="detail-block reveal show"><h2>数字化亮点</h2>${setList(['面向8-16岁青少年，处于专注力、记忆力和价值观形成的重要阶段', '课程目标包含专注力、记忆力、想象力、自我觉察和学习内驱力等底层能力', '训练后以“能静下来、能观察、能表达、能坚持”为主要反馈指标', '配合21天家庭陪跑机制，每天约10分钟家庭练习，帮助家长把营期效果延续到日常'])}</div>`;
  }
  if (item.key === 'memory') extra = `<div class="detail-block reveal show"><h2>记忆训练重点</h2>${setList(['训练静坐、数息、残像等基础专注能力，先让孩子坐得住、看得稳', '通过烛光观想、曼陀罗内观和实物心像激活脑内成像能力', '从整段摄入逐步过渡到整页摄入，训练闭眼后的信息提取', '把能力迁移到古诗文、英语单词、理科公式等真实学科内容'])}</div>`;
  if (item.key === 'self') extra = `<div class="detail-block reveal show"><h2>数学训练重点</h2>${setList(['用“逐字读—问自己—问AI—做例题—一句话总结”理解数学定义', '用“条件结论—逆定理—多种证明—生活实例”吃透数学定理', '训练孩子向AI提出精准问题，并验证AI答案是否可靠', '用费曼互讲、错题本和知识全景图检验是否真正学懂'])}</div>`;
  const main = document.querySelector('.detail-main');
  if (main) {
    const pathItems = pathText[item.key] || copy.paths;
    const firstTitle = item.key === 'focus' ? '先解决学习状态，成绩提升才有入口' : item.key === 'experience' ? '先看清问题，再决定训练方向' : '课程定位';
    const firstText = item.key === 'focus' ? '很多孩子不是不想学，而是进入学习状态太慢、抗干扰弱、记忆方式单一、遇到困难容易情绪化。专注营不是简单让孩子“坐着别动”，而是通过身体、感官、心像、情绪和家庭陪跑五个层面，系统重建学习状态。' : item.key === 'experience' ? '体验课的价值，不是把系统课程压缩成一节课，而是用较短时间帮助家长看清孩子当前的真实学习状态。通过任务观察、短时训练和结果反馈，先判断孩子主要卡点，再选择后续课程路径。' : (copy.detailIntro || copy.text);
    main.innerHTML = `<div class="detail-block reveal show"><h2>${firstTitle}</h2><p>${firstText}</p></div>${extra}<div class="detail-block reveal show"><h2>核心体验内容</h2>${setList(copy.list)}</div><div class="detail-block reveal show"><h2>典型体验路径</h2><div class="course-flow">${pathItems.map((text, index) => `<div class="flow-item"><b>${index + 1}</b><span>${copy.paths[index] || text}</span><p>${text}</p></div>`).join('')}</div></div><div class="detail-block reveal show"><h2>适合对象</h2>${setList(copy.audience)}</div><div class="detail-block reveal show"><h2>家长能获得什么</h2>${setList(copy.effects)}</div>`;
  }
  const side = document.querySelector('.side-card');
  if (side) side.innerHTML = `<h3>课程信息</h3><p>${copy.text}</p><div class="side-list"><div><b>课程</b><span>${item.name}</span></div><div><b>重点</b><span>${copy.list[0]}</span></div><div><b>方式</b><span>${item.key === 'experience' ? '体验 / 测评 / 反馈' : '训练营 / 阶段反馈'}</span></div><div><b>价格</b><span>${item.price}</span></div></div><a class="btn btn-gold" href="${contactUrl('trial')}">预约体验</a><a class="btn btn-line" href="courses.html">返回课程产品</a>`;
  const cta = document.querySelector('.detail-cta-wrap');
  if (cta) cta.innerHTML = `<div><h2>${item.key === 'focus' ? '孩子专注力问题，不适合只靠催促解决' : item.key === 'experience' ? '不确定孩子适合哪门课？先从体验课开始' : '想进一步了解这门课程？'}</h2><p>${item.key === 'focus' ? '可以先预约体验或咨询，我们会根据孩子当前学习状态和家庭关注点，给出更具体的课程建议。' : item.key === 'experience' ? '用一节课先看清孩子状态，再决定是否进入系统训练，比直接报名更稳妥。' : '可以先预约体验或咨询课程，我们会根据孩子情况给出更具体的建议。'}</p></div><div class="detail-cta-actions"><a class="btn btn-gold" href="${contactUrl('trial')}">预约体验</a><a class="btn btn-line" href="${contactUrl('consult')}">咨询课程</a></div>`;
}
function setupHeroSlider() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const slides = [...hero.querySelectorAll('.slide')];
  const dots = [...hero.querySelectorAll('.hero-dots button')];
  if (!slides.length) return;
  let index = Math.max(0, slides.findIndex(slide => slide.classList.contains('active')));
  const show = next => { index = (next + slides.length) % slides.length; slides.forEach((slide, i) => slide.classList.toggle('active', i === index)); dots.forEach((dot, i) => dot.classList.toggle('active', i === index)); };
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
  setInterval(() => show(index + 1), HERO_SLIDE_DURATION);
}
function setupReveals() {
  const reveals = [...document.querySelectorAll('.reveal')];
  if (!reveals.length) return;
  if (!('IntersectionObserver' in window)) { reveals.forEach(el => el.classList.add('show')); return; }
  const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('show'); observer.unobserve(entry.target); } }); }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
}
function setupTransition() {
  if (document.getElementById('pageTransitionStyle')) return;
  const style = document.createElement('style');
  style.id = 'pageTransitionStyle';
  style.textContent = `.zk-page-transition{position:fixed;inset:0;z-index:99999;pointer-events:none;display:grid;place-items:center}.zk-page-transition::before,.zk-page-transition::after{content:'';position:absolute;left:0;width:100%;height:50%;background:#063b2b;transition:transform .72s cubic-bezier(.76,0,.24,1)}.zk-page-transition::before{top:0;transform:translate3d(0,-100%,0)}.zk-page-transition::after{bottom:0;transform:translate3d(0,100%,0);background:#0e211b}.zk-page-transition .zk-mark{position:relative;z-index:2;width:74px;height:74px;border-radius:50%;display:grid;place-items:center;background:#fff;color:#045c39;border:1px solid rgba(199,175,130,.65);font-weight:700;letter-spacing:3px;opacity:0;transform:scale(.86);transition:.36s ease}.zk-page-transition.active::before,.zk-page-transition.active::after{transform:translate3d(0,0,0)}.zk-page-transition.active .zk-mark{opacity:1;transform:scale(1)}.zk-page-transition.opening::before{transform:translate3d(0,-100%,0)}.zk-page-transition.opening::after{transform:translate3d(0,100%,0)}.zk-page-transition.opening .zk-mark{opacity:0;transform:scale(.9)}`;
  document.head.appendChild(style);
  const layer = document.createElement('div');
  layer.className = 'zk-page-transition';
  layer.innerHTML = '<div class="zk-mark">ZK</div>';
  document.body.appendChild(layer);
  document.querySelectorAll('a[href]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || a.target === '_blank') return;
      const url = new URL(href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname && url.hash) return;
      e.preventDefault();
      layer.classList.add('active');
      setTimeout(() => { location.href = url.href; }, 620);
    });
  });
}
function setupModalClose() {
  const modal = document.getElementById('modal');
  const close = document.getElementById('closeModal');
  if (close && modal) close.addEventListener('click', () => modal.classList.remove('show'));
}
function init() {
  setupViewportStability();
  replaceGlobalTexts();
  setupUnifiedLinks();
  normalizeLegacyAnchors();
  removeLegacyStandaloneForms();
  setupUnifiedInquiryForm();
  setupDemoForms();
  updateCourseCards();
  setupDetailPage();
  setupHeroSlider();
  setupReveals();
  setupTransition();
  setupModalClose();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
