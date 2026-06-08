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
  const RUNTIME_STYLESHEETS = [
    ['tokens', 'statics/style/core/tokens.css'],
    ['base', 'statics/style/core/base.css'],
    ['layout', 'statics/style/core/layout.css'],
    ['buttons', 'statics/style/components/buttons.css'],
    ['chrome', 'statics/style/components/chrome.css'],
    ['cards', 'statics/style/components/cards.css'],
    ['page-heroes', 'statics/style/components/page-heroes.css'],
    ['runtime-components', 'statics/style/components/runtime.css'],
    ['navigation', 'statics/style/components/navigation.css']
  ];
  const PAGE_STYLESHEETS = {
    home: 'statics/style/pages/home.css',
    detail: 'statics/style/pages/detail.css',
    about: 'statics/style/pages/about.css',
    courses: 'statics/style/pages/courses.css',
    contact: 'statics/style/pages/contact.css',
    join: 'statics/style/pages/join.css',
    news: 'statics/style/pages/news.css',
    team: 'statics/style/pages/team.css',
    cases: 'statics/style/pages/cases.css',
    utility: 'statics/style/pages/utility.css'
  };

  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const pageFile = () => location.pathname.split('/').pop() || 'index.html';
  const pathPrefix = () => /\/zk\/news\/(company|growth|limited)\//.test(location.pathname) ? '../../' : /\/zk\/(expert|cases)\//.test(location.pathname) ? '../' : '';
  const buildUrl = file => `${pathPrefix()}${file}`;
  const contactUrl = () => buildUrl('contact.html');
  const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
  const listHtml = items => `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  const cleanCourseName = value => value ? value.replaceAll('心脑学习力自主营（数学）（数学）', '心脑学习力自主营（数学）').replaceAll('心脑学习力自主营（数学） （数学）', '心脑学习力自主营（数学）') : value;
  const stylesheetLinks = () => qa('link[rel~="stylesheet"]');
  const stylesheetPath = href => new URL(href, location.href).pathname.replace(/\/+/g, '/');
  const stylesheetLoaded = href => {
    const target = stylesheetPath(buildUrl(href));
    return stylesheetLinks().some(link => stylesheetPath(link.getAttribute('href') || '') === target);
  };

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

  function pageStyleKey() {
    const file = pageFile(), path = location.pathname;
    if (file === 'index.html' || path.endsWith('/zk/')) return 'home';
    if (DETAIL_MAP[file]) return 'detail';
    if (file === 'about.html') return 'about';
    if (file === 'courses.html') return 'courses';
    if (file === 'contact.html') return 'contact';
    if (file === 'join.html') return 'join';
    if (['news.html', 'company-news.html', 'growth-news.html', 'limited-activity.html'].includes(file) || path.includes('/zk/news/')) return 'news';
    if (['team.html', 'team-page-2.html', 'experts.html', 'assistants.html'].includes(file) || path.includes('/zk/expert/')) return 'team';
    if (file === 'cases.html' || path.includes('/zk/cases/')) return 'cases';
    if (['404.html', 'privacy.html', 'success.html'].includes(file)) return 'utility';
    return '';
  }

  function appendStylesheet(key, href) {
    if (!href || q(`link[data-zk-style="${key}"]`) || stylesheetLoaded(href)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = buildUrl(href);
    link.dataset.zkStyle = key;
    document.head.appendChild(link);
  }

  function injectStylesheets() {
    document.documentElement.style.setProperty('--zk-qr-url', `url("${buildUrl('statics/images/QR.png')}")`);

    // Most pages load statics/style/style.css, which imports the public core/component layers.
    // In that normal path, do not inject the same CSS files again. The fallback below is
    // kept only for future standalone pages that intentionally omit the compatibility entry.
    if (!stylesheetLoaded('statics/style/style.css')) {
      RUNTIME_STYLESHEETS.forEach(([key, href]) => appendStylesheet(key, href));
    }

    // Page-level CSS should be explicit in HTML. This is a safety net for future pages
    // or legacy copies that forget their canonical pages/*.css entry.
    const pageKey = pageStyleKey();
    if (pageKey) appendStylesheet(`page-${pageKey}`, PAGE_STYLESHEETS[pageKey]);
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
      item.addEventListener('mouseenter', () => { if (!isMobile()) item.classList.add('open'); });
      item.addEventListener('mouseleave', () => { if (!isMobile()) item.classList.remove('open'); });
      link.addEventListener('click', event => {
        if (!isMobile()) return;
        event.preventDefault();
        const nextOpen = !item.classList.contains('open');
        closeAll(item);
        item.classList.toggle('open', nextOpen);
        link.setAttribute('aria-expanded', String(nextOpen));
      });
    });
  }

  function renderHeader() {
    const header = q('#header');
    if (!header) return;
    header.classList.add('scrolled');
    const root = pathPrefix();
    header.innerHTML = `<div class="nav-wrap">
      <a class="brand" href="${root}index.html"><span class="brand-logo"></span><span><strong>${DATA.brand.short}</strong><span>Education Platform</span></span></a>
      <nav>
        ${navLink('首页', `${root}index.html`, 'home')}
        ${dropdown('关于我们', `${root}about.html`, [{ text: '公司简介', href: `${root}about.html#intro` }, { text: '服务原则', href: `${root}about.html#principle` }], 'about')}
        ${dropdown('课程产品', `${root}courses.html`, DATA.courses.map(course => ({ text: course.shortTitle, href: `${root}${course.href}` })), 'courses')}
        ${dropdown('专家团队', `${root}experts.html`, [{ text: '核心专家', href: `${root}experts.html` }, { text: '助教团队', href: `${root}assistants.html` }], 'team')}
        ${navLink('成功案例', `${root}cases.html`, 'cases')}
        ${dropdown('新闻活动', `${root}news.html`, [{ text: '公司动态', href: `${root}company-news.html` }, { text: '成长资讯', href: `${root}growth-news.html` }, { text: '限时活动', href: `${root}limited-activity.html` }], 'news')}
        ${navLink('加盟合作', `${root}join.html`, 'join')}
        ${navLink('联系我们', `${root}contact.html`, 'contact')}
      </nav>
      <div class="nav-cta"><a class="btn btn-line" href="${contactUrl()}">微信咨询</a><a class="btn btn-gold" href="${contactUrl()}">联系我们</a></div>
      <button class="hamb" type="button" aria-label="打开菜单" aria-expanded="false"><i></i><i></i><i></i></button>
    </div>`;
    bindDropdowns(q('nav', header));
  }

  function renderFooter() {
    const footer = q('.footer');
    if (!footer) return;
    const root = pathPrefix();
    footer.innerHTML = `<div class="container"><div class="footer-grid">
      <div><h4>${DATA.brand.short}</h4><p>${DATA.brand.full}<br>${DATA.brand.slogan}</p></div>
      <div><h4>关于我们</h4><a href="${root}about.html">公司简介</a><a href="${root}team.html">专家团队</a></div>
      <div><h4>课程产品</h4>${DATA.courses.map(course => `<a href="${root}${course.href}">${course.shortTitle}</a>`).join('')}</div>
      <div><h4>新闻活动</h4><a href="${root}company-news.html">公司动态</a><a href="${root}growth-news.html">成长资讯</a><a href="${root}limited-activity.html">限时活动</a></div>
      <div><h4>合作支持</h4><a href="${root}join.html">加盟合作</a><a href="${root}contact.html">联系我们</a></div>
      <div><h4>联系我们</h4><p>电话：${DATA.brand.phone}<br>微信：${DATA.brand.wechat}<br>${DATA.brand.address}</p></div>
    </div><div class="copyright">© 2026 ${DATA.brand.full} 版权所有</div></div>`;
  }

  function renderSticky() {
    const sticky = q('.sticky');
    if (!sticky) return;
    sticky.innerHTML = `<a href="${contactUrl()}">微信</a><a href="${contactUrl()}">联系</a>`;
  }

  function renderCourseCards() {
    const grid = q('.product-grid');
    if (!grid) return;
    grid.innerHTML = DATA.courses.map(course => `<article class="product-card reveal show"><span class="tag">${course.tag}</span><h3>${course.shortTitle}</h3><p>${course.summary}</p>${listHtml(course.bullets)}<a class="more" href="${course.href}">FIND MORE</a></article>`).join('');
  }

  function renderDetailPage() {
    const key = DETAIL_MAP[pageFile()];
    if (!key) return;
    const course = DATA.courses.find(item => item.key === key);
    const copy = DATA.courseCopy[key];
    if (!course || !copy) return;

    document.title = `${course.shortTitle}｜课程详情｜${DATA.brand.short}`;
    q('.detail-hero h1') && (q('.detail-hero h1').textContent = course.shortTitle);
    q('.detail-hero p') && (q('.detail-hero p').textContent = course.summary);
    const tags = q('.detail-tags');
    if (tags) tags.innerHTML = course.tags.map(tag => `<span>${tag}</span>`).join('');
    const crumb = q('.breadcrumb');
    if (crumb) crumb.innerHTML = `<a href="index.html">首页</a> / <a href="courses.html">课程产品</a> / ${course.shortTitle}`;

    const detailMain = q('.detail-main');
    if (detailMain) {
      detailMain.innerHTML = `<div class="detail-block reveal show"><h2>课程介绍</h2><p>${copy.intro}</p></div>
        <div class="detail-block reveal show"><h2>适合对象</h2>${listHtml(copy.targets)}</div>
        <div class="detail-block reveal show"><h2>训练路径</h2><div class="course-flow">${PATH_TEXT[key].map((text, index) => `<div class="flow-item"><b>${String(index + 1).padStart(2, '0')}</b><span>${text.split('：')[0]}</span><p>${text.includes('：') ? text.split('：').slice(1).join('：') : text}</p></div>`).join('')}</div></div>
        ${EXTRA_BLOCKS[key].map(block => `<div class="detail-block reveal show"><h2>${block.title}</h2>${block.flow ? `<div class="feature-grid">${block.flow.map(([title, text], index) => `<div class="feature-item"><b>${String(index + 1).padStart(2, '0')}</b><h3>${title}</h3><p>${text}</p></div>`).join('')}</div>` : listHtml(block.list)}</div>`).join('')}
        <div class="course-challenge" data-course="${key}"><div class="challenge-head"><span>Stage Challenge</span><h2>${DATA.courseChallenges[key].title}</h2><p>${DATA.courseChallenges[key].description}</p></div><div class="challenge-grid">${DATA.courseChallenges[key].items.map(item => `<article class="challenge-card"><b>${item.day}</b><h3>${item.title}</h3><p>${item.text}</p></article>`).join('')}</div></div>`;
    }

    const side = q('.side-card');
    if (side) side.innerHTML = `<h3>课程信息</h3><p>${course.summary}</p><div class="side-list"><div><b>适合年龄</b><span>${course.age}</span></div><div><b>课程形式</b><span>${course.format}</span></div><div><b>课程价格</b><span>${course.price}</span></div></div><a class="btn btn-gold" href="contact.html">微信咨询</a>`;
    const cta = q('.detail-cta-wrap');
    if (cta) cta.innerHTML = `<div><h2>想了解孩子是否适合这门课程？</h2><p>可以先通过电话或微信说明孩子情况，我们会根据孩子当前学习状态给出更清晰的课程了解路径。</p></div><div class="detail-cta-actions"><a class="btn btn-gold" href="contact.html">微信咨询</a><a class="btn btn-line" href="courses.html">返回课程列表</a></div>`;
  }

  function bindHeroSlider() {
    const slides = qa('.hero .slide'), dots = qa('.hero-dots button');
    if (slides.length <= 1) return;
    let index = 0;
    const show = next => {
      index = next % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    };
    dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
    setInterval(() => show(index + 1), 6200);
  }

  function ensureRevealVisible() {
    setTimeout(() => qa('.reveal, .anim').forEach(el => el.classList.add('show')), 80);
  }

  function loadScriptOnce(id, src) {
    if (q(`#${id}`)) return;
    const script = document.createElement('script');
    script.id = id;
    script.src = buildUrl(src);
    script.defer = true;
    document.body.appendChild(script);
  }

  function initPageTransitions() {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
    window.addEventListener('pageshow', () => requestAnimationFrame(() => overlay.classList.remove('is-active')));
    qa('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || link.target === '_blank') return;
      const url = new URL(href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname && url.hash) return;
      link.addEventListener('click', event => {
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        overlay.classList.add('is-active');
        setTimeout(() => { location.href = url.href; }, 160);
      });
    });
  }

  function init() {
    injectStylesheets();
    normalizeText();
    renderHeader();
    renderFooter();
    renderSticky();
    renderCourseCards();
    renderDetailPage();
    bindHeroSlider();
    ensureRevealVisible();
    initPageTransitions();
    loadScriptOnce('zk-scroll-motion', 'statics/js/scroll-motion.js');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
