(function () {
  'use strict';

  const DATA = window.ZKSiteData;
  if (!DATA) throw new Error('ZKSiteData is required before site-runtime.js');

  const DETAIL_MAP = {
    'course-detail.html': 'focus',
    'photo-memory-detail.html': 'memory',
    'camp-detail.html': 'reading',
    'public-class-detail.html': 'self'
  };
  const PATH_TEXT = {
    focus: ['第1阶段：身体锚定与呼吸训练，让孩子先从身体层面安定下来，建立进入学习状态的入口', '第2阶段：微观观察、听觉追踪和感官专注训练，帮助大脑学会过滤干扰、锁定任务', '第3阶段：图像记忆、心像显化和表达训练，把“记不住”转化为“看得见、说得出”', '第4阶段：情绪觉察、目标承诺和21天家庭陪跑，把营期变化延伸到家庭学习场景'],
    memory: ['第1-2天：静定训练、残像训练和脑屏激活，建立稳定成像基础', '第3-4天：从整段摄入到整页摄入，训练从脑内页面直接提取信息', '第5-6天：迁移到古诗文、英语单词和理科公式等学科内容', '第7天：通过陌生材料笔试和口试，检验真实记忆效果'],
    reading: ['破除逐字默读习惯', '训练整页摄入和脑内快照', '形成脑内电影或结构图', '通过复述和测试检验理解'],
    self: ['第1天：格物入门，掌握格定义五步法并完成第一章通关', '第2天：攻坚深化，训练格定理四步法并完成二三章学习', '第3天：知识联网，绘制数学知识全景图并进行模拟考', '第4天：自证结营，错题围剿、闭卷大考和自学计划制定']
  };
  const EXTRA_BLOCKS = {
    focus: [
      { title: '为什么孩子需要先训练专注力？', flow: [['坐不住', '不是孩子故意拖拉，而是身体和注意系统还没有稳定下来，学习一开始就容易分心。'], ['记不牢', '只靠反复读和硬背，容易学得慢、忘得快，需要把文字、声音和画面连接起来。'], ['容易烦', '遇到难题就抵触，往往不是态度问题，而是情绪觉察和自我调节能力还需要训练。'], ['没动力', '当孩子看不到自己的进步，就容易被动学习；课程通过可感知的小变化重建“我能行”。']] },
      { title: '训练观察重点', list: ['面向8-16岁青少年，处于专注力、记忆力和价值观形成的重要阶段', '课程目标包含专注力、记忆力、想象力、自我觉察和学习内驱力等底层能力', '训练后以“能静下来、能观察、能表达、能坚持”为主要反馈指标', '配合21天家庭陪跑机制，每天约10分钟家庭练习，帮助家长把营期效果延续到日常'] }
    ],
    memory: [{ title: '记忆训练重点', list: ['训练静坐、数息、残像等基础专注能力，先让孩子坐得住、看得稳', '通过烛光观想、曼陀罗内观和实物心像激活脑内成像能力', '从整段摄入逐步过渡到整页摄入，训练闭眼后的信息提取', '把能力迁移到古诗文、英语单词、理科公式等真实学科内容'] }],
    reading: [{ title: '阅读突破重点', list: ['破除逐字默读习惯，尝试绕开语音通道进行视觉加工', '训练整页摄入和脑内快照，让文字转化为画面和结构', '叙事文形成脑内电影，议论文形成结构图', '通过速读复述和限时理解反馈观察真实阅读变化'] }],
    self: [{ title: '数学训练重点', list: ['用“逐字读—问自己—问AI—做例题—一句话总结”理解数学定义', '用“条件结论—逆定理—多种证明—生活实例”吃透数学定理', '训练孩子向AI提出精准问题，并验证AI答案是否可靠', '用费曼互讲、错题本和知识全景图检验是否真正学懂'] }]
  };
  const REPLACEMENTS = [
    ['中科心智能教育科技服务平台', DATA.brand.full], ['中科心智能', DATA.brand.short],
    ['照相记忆', '心脑学习力记忆营'], ['身心脑一体化专注力课程', '心脑学习力专注营'], ['心脑学习力成长课', '心脑学习力专注营'], ['学习力成长体系', '心脑学习力专注营'], ['心脑学习力体验课', '心脑学习力专注营'],
    ['潜意识阅读', '心脑学习力阅读营'], ['心脑学习力强化营', '心脑学习力阅读营'],
    ['五四学习法数学实训营', '心脑学习力自主营（数学）'], ['心脑学习力公开课', '心脑学习力自主营（数学）'],
    ['心脑学习力自主营（数学）（数学）', '心脑学习力自主营（数学）'], ['心脑学习力自主营（数学） （数学）', '心脑学习力自主营（数学）'], ['心脑学习力自主营', '心脑学习力自主营（数学）']
  ];

  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const pageFile = () => location.pathname.split('/').pop() || 'index.html';
  const pathPrefix = () => /\/zk\/news\/(company|growth|limited)\//.test(location.pathname) ? '../../' : /\/zk\/(expert|cases)\//.test(location.pathname) ? '../' : '';
  const buildUrl = file => `${pathPrefix()}${file}`;
  const contactUrl = () => buildUrl('contact.html');
  const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
  const listHtml = items => `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  const cleanCourseName = value => value ? value.replaceAll('心脑学习力自主营（数学）（数学）', '心脑学习力自主营（数学）').replaceAll('心脑学习力自主营（数学） （数学）', '心脑学习力自主营（数学）') : value;

  function activePage() {
    const file = pageFile(), path = location.pathname;
    if (file === 'index.html' || path.endsWith('/zk/')) return 'home';
    if (file === 'about.html') return 'about';
    if (file === 'courses.html' || DETAIL_MAP[file]) return 'courses';
    if (['team.html', 'team-page-2.html', 'experts.html', 'assistants.html'].includes(file) || path.includes('/zk/expert/')) return 'team';
    if (file === 'cases.html' || path.includes('/zk/cases/')) return 'cases';
    if (['news.html', 'company-news.html', 'growth-news.html', 'limited-activity.html'].includes(file) || path.includes('/zk/news/')) return 'news';
    if (file === 'join.html') return 'join';
    if (file === 'contact.html') return 'contact';
    return '';
  }

  function injectStyleOnce() {
    if (!q('link[data-zk-style="nav-dropdown"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = buildUrl('statics/style/nav-dropdown.css');
      link.dataset.zkStyle = 'nav-dropdown';
      document.head.appendChild(link);
    }
    if (q('#zkRuntimeStyle')) return;
    const style = document.createElement('style');
    style.id = 'zkRuntimeStyle';
    style.textContent = `html{font-size:100%;-webkit-text-size-adjust:100%;text-size-adjust:100%}html,body{width:100%;max-width:100%;min-width:0}input,select,textarea,button{font-size:16px}.hero .hero-inner,.hero .hero-inner .eyebrow,.hero .hero-inner h1,.hero .hero-inner h2,.hero .hero-inner p,.hero .hero-actions{opacity:1!important;visibility:visible!important;transform:translate3d(0,0,0)!important}.contact-map::before{background:#fff url('${buildUrl('statics/images/QR.png')}') center/82% no-repeat!important}.course-challenge-block{background:linear-gradient(135deg,#fff 0%,#fbfaf6 100%);border:1px solid rgba(199,175,130,.28);box-shadow:0 20px 52px rgba(16,27,23,.09)}.course-challenge-block h2{letter-spacing:-.5px}.course-challenge-intro{font-size:17px;line-height:1.95;color:#5f6b66;margin:0 0 24px}.course-challenge-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:20px}.course-challenge-item{position:relative;padding:24px 24px 22px 26px;background:#fff;border-left:4px solid var(--gold,#c7af82);box-shadow:0 12px 30px rgba(16,27,23,.07);overflow:hidden}.course-challenge-item::after{content:'';position:absolute;right:-34px;top:-34px;width:82px;height:82px;border-radius:50%;background:rgba(199,175,130,.08)}.course-challenge-item b{display:block;color:var(--green,#045c39);font-size:21px;line-height:1.35;margin-bottom:9px}.course-challenge-item span{display:block;color:#65716c;line-height:1.85;font-size:15px}.course-challenge-note{margin-top:22px;padding:15px 18px;background:#f7f5ef;color:#7b6b4f;font-size:14px;line-height:1.85;border-left:3px solid var(--gold,#c7af82)}@media(max-width:760px){.course-challenge-grid{grid-template-columns:1fr}.course-challenge-item{padding:21px}}`;
    document.head.appendChild(style);
  }

  function normalizeText(root = document.body) {
    const apply = value => cleanCourseName(REPLACEMENTS.reduce((next, [from, to]) => next.replaceAll(from, to), value || ''));
    document.title = apply(document.title);
    qa('meta[content]').forEach(meta => { meta.content = apply(meta.content); });
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (parent && ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return REPLACEMENTS.some(([from]) => node.nodeValue.includes(from)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => { node.nodeValue = apply(node.nodeValue); });
  }

  function navLink(label, href, key) { return `<a class="nav-direct${activePage() === key ? ' nav-active' : ''}" href="${href}">${label}</a>`; }
  function dropdown(label, href, items, key) { return `<div class="nav-item has-dropdown${activePage() === key ? ' nav-active' : ''}"><a class="nav-link" href="${href}" aria-haspopup="true" aria-expanded="false">${label}</a><div class="nav-panel">${items.map(item => `<a href="${item.href}">${escapeHtml(cleanCourseName(item.text))}</a>`).join('')}</div></div>`; }

  function bindDropdowns(nav) {
    const items = qa('.nav-item.has-dropdown', nav);
    const isMobile = () => matchMedia('(max-width: 1100px)').matches;
    const closeAll = except => items.forEach(item => { if (item === except) return; item.classList.remove('open'); q('.nav-link', item)?.setAttribute('aria-expanded', 'false'); });
    items.forEach(item => {
      const link = q('.nav-link', item);
      if (!link) return;
      link.addEventListener('click', event => { if (!isMobile()) return; event.preventDefault(); const open = !item.classList.contains('open'); closeAll(item); item.classList.toggle('open', open); link.setAttribute('aria-expanded', String(open)); });
      item.addEventListener('mouseenter', () => { if (!isMobile()) { closeAll(item); item.classList.add('open'); link.setAttribute('aria-expanded', 'true'); } });
      item.addEventListener('mouseleave', () => { if (!isMobile()) { item.classList.remove('open'); link.setAttribute('aria-expanded', 'false'); } });
    });
    document.addEventListener('click', event => { if (!event.target.closest('.nav-item.has-dropdown')) closeAll(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeAll(); });
    addEventListener('resize', () => closeAll());
  }

  function renderChrome() {
    const brand = q('.brand');
    if (brand) {
      brand.href = buildUrl('index.html');
      brand.innerHTML = `<img src="${buildUrl(DATA.brand.logo)}" alt="${DATA.brand.short} Logo" style="width:50px;height:50px;display:block;flex:none;object-fit:contain;filter:drop-shadow(0 8px 18px rgba(16,27,23,.18));"><span><strong>${DATA.brand.short}</strong><span>${DATA.brand.english}</span></span>`;
    }
    const nav = q('header nav');
    if (nav) {
      const link = file => buildUrl(file);
      nav.className = 'nav-dropdowns';
      nav.innerHTML = [navLink('首页', link('index.html'), 'home'), navLink('关于我们', link('about.html'), 'about'), dropdown('课程产品', link('courses.html'), DATA.courses.map(item => ({ text: item.name, href: link(item.href) })), 'courses'), dropdown('专家团队', link('experts.html'), [{ text: '核心专家', href: link('experts.html') }, { text: '助教团队', href: link('assistants.html') }], 'team'), navLink('经典案例', link('cases.html'), 'cases'), dropdown('新闻活动', link('news.html'), [{ text: '公司动态', href: link('company-news.html') }, { text: '成长资讯', href: link('growth-news.html') }, { text: '限时活动', href: link('limited-activity.html') }], 'news'), navLink('加盟合作', link('join.html'), 'join'), navLink('联系我们', link('contact.html'), 'contact')].join('');
      bindDropdowns(nav);
    }
    const cta = q('.nav-cta');
    if (cta) cta.innerHTML = `<a class="btn btn-line" href="${contactUrl()}">微信咨询</a><a class="btn btn-gold" href="${contactUrl()}">联系我们</a>`;
    const footer = q('.footer');
    if (footer) footer.innerHTML = `<div class="container"><div class="footer-grid"><div><div class="brand-mini">${DATA.brand.short}</div></div><div><h4>关于我们</h4><a href="${buildUrl('about.html')}">公司简介</a><a href="${buildUrl('about.html')}">服务方向</a><a href="${buildUrl('about.html')}">发展愿景</a></div><div><h4>课程产品</h4>${DATA.courses.map(item => `<a href="${buildUrl(item.href)}">${item.name}</a>`).join('')}</div><div><h4>团队案例</h4><a href="${buildUrl('experts.html')}">专家团队</a><a href="${buildUrl('assistants.html')}">助教团队</a><a href="${buildUrl('cases.html')}">成功案例</a></div><div><h4>新闻活动</h4><a href="${buildUrl('company-news.html')}">公司动态</a><a href="${buildUrl('growth-news.html')}">成长资讯</a><a href="${buildUrl('limited-activity.html')}">限时活动</a></div><div><h4>加盟合作</h4><a href="${buildUrl('join.html')}">合作对象</a><a href="${buildUrl('join.html')}">合作流程</a><a href="${buildUrl('contact.html')}">联系我们</a></div></div><div class="copyright">© 2026 ${DATA.brand.full}</div></div>`;
    const sticky = q('.sticky');
    if (sticky) sticky.innerHTML = `<a href="${contactUrl()}">微信</a><a href="${contactUrl()}">联系</a>`;
  }

  function normalizeLinks() {
    const map = { '#assessment': contactUrl(), 'index.html#assessment': contactUrl(), '#join': buildUrl('join.html'), 'index.html#join': buildUrl('join.html'), '#contact': contactUrl(), '#join-form': contactUrl() };
    qa('a[href]').forEach(a => { const href = a.getAttribute('href'); if (map[href]) a.href = map[href]; });
  }

  function ensureCards(container, selector, template) { if (!container) return; while (qa(selector, container).length < DATA.courses.length) container.insertAdjacentHTML('beforeend', template()); qa(selector, container).slice(DATA.courses.length).forEach(card => card.remove()); }
  function updateCard(card, course, mode) {
    if (!card || !course) return;
    const copy = DATA.courseCopy[course.key];
    const title = q('h3', card), text = q('p', card), itemList = q('ul', card), tag = q('.tag,.label', card), more = q('.more', card);
    if (title) title.textContent = course.name;
    if (tag) tag.textContent = mode === 'system' ? copy.systemTag : copy.tag;
    if (text) text.textContent = copy.text;
    if (itemList) itemList.innerHTML = copy.list.map(point => `<li>${escapeHtml(point)}</li>`).join('');
    if (more) { more.textContent = 'FIND MORE'; more.href = course.href; }
  }
  function renderCourses() {
    const productGrid = q('#course .product-grid');
    ensureCards(productGrid, '.product-card', () => '<article class="product-card reveal show"><span class="tag"></span><h3></h3><p></p><ul></ul><a class="more" href="#">FIND MORE</a></article>');
    qa('.product-card', productGrid || document.createElement('div')).forEach((card, index) => updateCard(card, DATA.courses[index], 'home'));
    const systemGrid = q('.system-grid');
    ensureCards(systemGrid, '.system-card', () => '<div class="system-card reveal show"><span class="label"></span><h3></h3><p></p></div>');
    qa('.system-card', systemGrid || document.createElement('div')).forEach((card, index) => updateCard(card, DATA.courses[index], 'system'));
    const courseList = q('.course-list');
    ensureCards(courseList, '.course-card', () => '<article class="course-card reveal show"><h3></h3><p></p><ul></ul></article>');
    qa('.course-card', courseList || document.createElement('div')).forEach((card, index) => updateCard(card, DATA.courses[index], 'list'));
  }

  function challengeHtml(course) {
    const data = DATA.courseChallenges[course.key];
    if (!data) return '';
    return `<div class="detail-block reveal show course-challenge-block"><h2>${escapeHtml(data.title)}</h2><p class="course-challenge-intro">${escapeHtml(data.intro)}</p><div class="course-challenge-grid">${data.items.map(([title, text]) => `<div class="course-challenge-item"><b>${escapeHtml(title)}</b><span>${escapeHtml(text)}</span></div>`).join('')}</div><div class="course-challenge-note">${escapeHtml(data.note)}</div></div>`;
  }
  function extraHtml(key) {
    return (EXTRA_BLOCKS[key] || []).map(block => block.flow ? `<div class="detail-block reveal show"><h2>${escapeHtml(block.title)}</h2><div class="course-flow">${block.flow.map(([title, text], index) => `<div class="flow-item"><b>${index + 1}</b><span>${escapeHtml(title)}</span><p>${escapeHtml(text)}</p></div>`).join('')}</div></div>` : `<div class="detail-block reveal show"><h2>${escapeHtml(block.title)}</h2>${listHtml(block.list)}</div>`).join('');
  }
  function renderDetail() {
    const key = DETAIL_MAP[pageFile()];
    if (!key) return;
    const course = DATA.courses.find(item => item.key === key), copy = DATA.courseCopy[key];
    if (!course || !copy) return;
    const heroTitle = q('.detail-hero h1'), heroDesc = q('.detail-hero p'), tags = q('.detail-tags');
    if (heroTitle) heroTitle.textContent = course.name;
    if (heroDesc) heroDesc.textContent = copy.intro || copy.text;
    if (tags) tags.innerHTML = `<span>${copy.tag}</span><span>青少年学习力</span><span>阶段训练</span><span>过程反馈</span>`;
    const titleMap = { focus: '先解决学习状态，成绩提升才有入口', memory: '先让孩子相信：记忆是可以训练的', reading: '先解决“读不完、说不清”的阅读卡点', self: '先让孩子学会自己学数学' };
    const firstText = key === 'focus' ? '很多孩子不是不想学，而是进入学习状态太慢、抗干扰弱、记忆方式单一、遇到困难容易情绪化。专注营不是简单让孩子“坐着别动”，而是通过身体、感官、心像、情绪和家庭陪跑五个层面，系统重建学习状态。' : copy.intro;
    const main = q('.detail-main'), pathItems = PATH_TEXT[key] || copy.paths;
    if (main) main.innerHTML = `<div class="detail-block reveal show"><h2>${escapeHtml(titleMap[key] || '课程定位')}</h2><p>${escapeHtml(firstText)}</p></div>${extraHtml(key)}${challengeHtml(course)}<div class="detail-block reveal show"><h2>核心训练内容</h2>${listHtml(copy.list)}</div><div class="detail-block reveal show"><h2>典型训练路径</h2><div class="course-flow">${pathItems.map((text, index) => `<div class="flow-item"><b>${index + 1}</b><span>${escapeHtml(copy.paths[index] || text)}</span><p>${escapeHtml(text)}</p></div>`).join('')}</div></div><div class="detail-block reveal show"><h2>适合对象</h2>${listHtml(copy.audience)}</div><div class="detail-block reveal show"><h2>孩子能获得什么</h2>${listHtml(copy.effects)}</div>`;
    const side = q('.side-card');
    if (side) side.innerHTML = `<h3>课程信息</h3><p>${escapeHtml(copy.text)}</p><div class="side-list"><div><b>课程</b><span>${escapeHtml(course.name)}</span></div><div><b>重点</b><span>${escapeHtml(copy.list[0])}</span></div><div><b>方式</b><span>训练营 / 阶段反馈</span></div><div><b>价格</b><span>${escapeHtml(course.price)}</span></div></div><a class="btn btn-gold" href="${contactUrl()}">微信咨询</a><a class="btn btn-line" href="courses.html">返回课程产品</a>`;
    const cta = q('.detail-cta-wrap');
    if (cta) cta.innerHTML = `<div><h2>${key === 'focus' ? '孩子专注力问题，不适合只靠催促解决' : '想进一步了解这门课程？'}</h2><p>可以通过微信或电话咨询课程，我们会根据孩子情况给出更具体的建议。</p></div><div class="detail-cta-actions"><a class="btn btn-gold" href="${contactUrl()}">微信咨询</a><a class="btn btn-line" href="${contactUrl()}">联系我们</a></div>`;
  }

  function setupHeroSlider() {
    const hero = q('.hero');
    if (!hero) return;
    const slides = qa('.slide', hero), dots = qa('.hero-dots button', hero);
    if (!slides.length) return;
    let index = Math.max(0, slides.findIndex(slide => slide.classList.contains('active')));
    const show = next => { index = (next + slides.length) % slides.length; slides.forEach((slide, i) => slide.classList.toggle('active', i === index)); dots.forEach((dot, i) => dot.classList.toggle('active', i === index)); };
    dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
    setInterval(() => { if (!document.hidden) show(index + 1); }, DATA.heroSlideDuration);
  }
  function setupReveals() {
    const reveals = qa('.reveal');
    if (!reveals.length) return;
    if (!('IntersectionObserver' in window)) { reveals.forEach(el => el.classList.add('show')); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('show'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
  }
  function setupTransition() {
    if (q('#pageTransitionStyle') || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const style = document.createElement('style');
    style.id = 'pageTransitionStyle';
    style.textContent = `.zk-page-transition{position:fixed;inset:0;z-index:99999;pointer-events:none;display:grid;place-items:center}.zk-page-transition::before,.zk-page-transition::after{content:'';position:absolute;left:0;width:100%;height:50%;background:#063b2b;transition:transform .72s cubic-bezier(.76,0,.24,1)}.zk-page-transition::before{top:0;transform:translate3d(0,-100%,0)}.zk-page-transition::after{bottom:0;transform:translate3d(0,100%,0);background:#0e211b}.zk-page-transition .zk-mark{position:relative;z-index:2;width:74px;height:74px;border-radius:50%;display:grid;place-items:center;background:#fff;color:#045c39;border:1px solid rgba(199,175,130,.65);font-weight:700;letter-spacing:3px;opacity:0;transform:scale(.86);transition:.36s ease}.zk-page-transition.active::before,.zk-page-transition.active::after{transform:translate3d(0,0,0)}.zk-page-transition.active .zk-mark{opacity:1;transform:scale(1)}`;
    document.head.appendChild(style);
    const layer = document.createElement('div');
    layer.className = 'zk-page-transition';
    layer.innerHTML = '<div class="zk-mark">ZK</div>';
    document.body.appendChild(layer);
    qa('a[href]').forEach(anchor => anchor.addEventListener('click', event => {
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || anchor.target === '_blank') return;
      const next = new URL(href, location.href);
      if (next.origin !== location.origin || (next.pathname === location.pathname && next.hash)) return;
      event.preventDefault();
      layer.classList.add('active');
      setTimeout(() => { location.href = next.href; }, 620);
    }));
  }
  function loadScrollMotion() {
    if (q('script[data-scroll-motion-loader]') || q('script[src*="scroll-motion.js"]')) return;
    const script = document.createElement('script');
    script.src = `${buildUrl('statics/js/scroll-motion.js')}?v=${DATA.version}`;
    script.defer = true;
    script.dataset.scrollMotionLoader = 'true';
    document.body.appendChild(script);
  }
  function init() {
    window.ZKSite = Object.freeze({ version: DATA.version, brand: DATA.brand, courses: DATA.courses, courseChallengesManaged: true, pathPrefix, buildUrl });
    injectStyleOnce();
    normalizeText();
    renderChrome();
    normalizeLinks();
    renderCourses();
    renderDetail();
    setupHeroSlider();
    setupReveals();
    setupTransition();
    loadScrollMotion();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
