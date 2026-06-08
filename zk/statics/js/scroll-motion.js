(function () {
  'use strict';

  const COMPANY_FULL_NAME = '中科明心(北海)智能科技有限公司';
  const COMPANY_SHORT_NAME = '中科明心';

  const SELF_REPLACEMENTS = [
    ['心脑学习力自主营（数学）（数学）', '心脑学习力自主营'],
    ['心脑学习力自主营（数学）', '心脑学习力自主营'],
    ['自主营（数学）', '自主营'],
    ['数学自学', 'AI自主'],
    ['数学自主营', 'AI自主'],
    ['围绕语文、数学、英语等课本进行自主学习训练', '围绕课本与学习任务进行自主学习训练'],
    ['围绕数学教材自学训练', '围绕课本与学习任务进行自主学习训练'],
    ['围绕一本数学教材展开训练', '围绕一套学习材料展开训练'],
    ['围绕一本数学教材', '围绕一套学习材料'],
    ['一本数学教材', '一套学习材料'],
    ['数学教材', '学习材料'],
    ['新数学教材', '新学习材料'],
    ['数学书', '学习材料'],
    ['数学训练重点', '自主学习训练重点'],
    ['数学定义、定理和解题逻辑', '核心概念、方法规则和思考过程'],
    ['数学定义、定理', '核心概念和方法规则'],
    ['数学定义', '核心概念'],
    ['数学定理', '方法规则'],
    ['数学知识全景图', '知识全景图'],
    ['跨章节数学知识全景图', '知识全景图'],
    ['小学三年级至初中三年级学生', '适龄青少年'],
    ['面向小学三年级至初中三年级', '面向适龄青少年'],
    ['希望减少补习依赖、提升数学自学能力的孩子', '希望减少补习依赖、提升自主学习能力的孩子'],
    ['拿到新课本不知道怎么学，遇到定义和定理就卡住的学生', '拿到新材料不知道怎么学，遇到核心概念就卡住的学生'],
    ['拿到新课本不知道怎么学', '拿到新材料不知道怎么学'],
    ['拿到新数学教材知道怎么开始学', '拿到新学习材料知道怎么开始学'],
    ['能用大白话讲清定义和定理', '能用大白话讲清核心概念和方法规则'],
    ['能绘制跨章节知识全景图，形成可迁移到其他学科的自学方法', '能绘制知识全景图，形成可复用的自主学习方法'],
    ['第2天：攻坚深化，训练格定理四步法并完成二三章学习', '第2天：攻坚深化，训练方法规则梳理并完成阶段学习'],
    ['第3天：知识联网，绘制数学知识全景图并进行模拟考', '第3天：知识联网，绘制知识全景图并进行阶段反馈'],
    ['4天一本书核心挑战', '4天学习材料核心挑战'],
    ['围绕一本数学教材完成核心学习任务，观察孩子自主学习路径是否建立。', '围绕一套学习材料完成核心学习任务，观察孩子自主学习路径是否建立。'],
    ['定义定理大白话表达', '核心概念大白话表达'],
    ['训练孩子用自己的语言讲清数学定义、定理和解题逻辑。', '训练孩子用自己的语言讲清核心概念、方法规则和思考过程。'],
    ['绘制跨章节数学知识全景图，观察孩子能否形成整体结构。', '绘制知识全景图，观察孩子能否形成整体结构。']
  ];

  function pathPrefix() {
    const p = location.pathname;
    if (p.includes('/zk/news/company/') || p.includes('/zk/news/growth/') || p.includes('/zk/news/limited/')) return '../../';
    if (p.includes('/zk/expert/') || p.includes('/zk/cases/')) return '../';
    return '';
  }

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

  function footerBrandHtml() {
    return `<div class="footer-brand-card"><div class="brand-mini">${COMPANY_SHORT_NAME}</div><div class="footer-brand-en">EDUCATION PLATFORM</div><p>青少年学习力成长 · 家庭教育支持 · 课程合作共创</p></div>`;
  }

  function footerHtml(prefix) {
    const link = file => `${prefix}${file}`;
    return `<div class="container"><div class="footer-grid"><div>${footerBrandHtml()}</div><div><h4>关于我们</h4><a href="${link('about.html')}">公司简介</a><a href="${link('about.html')}">服务方向</a><a href="${link('about.html')}">发展愿景</a></div><div><h4>课程产品</h4><a href="${link('course-detail.html')}">心脑学习力专注营</a><a href="${link('photo-memory-detail.html')}">心脑学习力记忆营</a><a href="${link('camp-detail.html')}">心脑学习力阅读营</a><a href="${link('public-class-detail.html')}">心脑学习力自主营</a></div><div><h4>团队案例</h4><a href="${link('experts.html')}">专家团队</a><a href="${link('assistants.html')}">助教团队</a><a href="${link('cases.html')}">成功案例</a></div><div><h4>新闻活动</h4><a href="${link('company-news.html')}">公司动态</a><a href="${link('growth-news.html')}">成长资讯</a><a href="${link('limited-activity.html')}">限时活动</a></div><div><h4>加盟合作</h4><a href="${link('join.html')}">合作对象</a><a href="${link('join.html')}">合作流程</a><a href="${link('contact.html')}">联系我们</a></div></div><div class="copyright">© 2026 ${COMPANY_FULL_NAME}</div></div>`;
  }

  function normalizeFooterBrand(footer) {
    const first = footer && footer.querySelector('.footer-grid > div:first-child');
    if (first) first.innerHTML = footerBrandHtml();
  }

  function ensureFooterModule() {
    const prefix = pathPrefix();
    let footer = document.querySelector('footer.footer, .footer');
    if (!footer) {
      footer = document.createElement('footer');
      footer.className = 'footer';
      const main = document.querySelector('main.main, main') || document.body;
      main.insertAdjacentElement('afterend', footer);
    }
    if (!footer.innerHTML.trim() || !footer.querySelector('.footer-grid')) {
      footer.innerHTML = footerHtml(prefix);
    }
    normalizeFooterBrand(footer);

    let sticky = document.querySelector('.sticky');
    if (!sticky) {
      sticky = document.createElement('div');
      sticky.className = 'sticky';
      footer.insertAdjacentElement('afterend', sticky);
    }
    if (!sticky.innerHTML.trim()) {
      sticky.innerHTML = `<a href="${prefix}contact.html">微信</a><a href="${prefix}contact.html">联系</a>`;
    }
  }

  function injectStyle() {
    const old = document.getElementById('siteMotionAndMobileStyle');
    if (old) old.remove();
    const style = document.createElement('style');
    style.id = 'siteMotionAndMobileStyle';
    style.textContent = `
      .footer .footer-grid{border-bottom:0!important;}
      .footer .container>hr,.footer hr{display:none!important;}
      .footer .footer-brand-card{position:relative!important;display:block!important;padding:0!important;color:#fff!important;}
      .footer .footer-brand-mark{width:58px!important;height:58px!important;border-radius:18px!important;display:grid!important;place-items:center!important;margin:0 0 26px!important;background:linear-gradient(135deg,#057a55,#00a77a)!important;color:#f3d28d!important;font-size:30px!important;font-weight:900!important;line-height:1!important;box-shadow:0 16px 34px rgba(0,0,0,.18)!important;}
      .footer .brand-mini{padding:0!important;position:static!important;margin:0!important;color:#fff!important;font-size:32px!important;line-height:1.2!important;font-weight:900!important;letter-spacing:1px!important;}
      .footer .brand-mini::before,.footer .brand-mini::after{display:none!important;content:none!important;background:none!important;}
      .footer .footer-brand-en{margin-top:12px!important;color:#c7af82!important;font-size:15px!important;line-height:1.4!important;letter-spacing:5px!important;text-transform:uppercase!important;}
      .footer .footer-brand-card p{margin-top:24px!important;color:rgba(255,255,255,.66)!important;font-size:15px!important;line-height:1.9!important;font-weight:400!important;letter-spacing:.3px!important;}
      .footer .footer-brand-card img,.footer .footer-brand-card svg,.footer .footer-brand-card .brand-logo,.footer .footer-brand-card .logo{display:none!important;}
      .footer .copyright{border-top:1px solid rgba(255,255,255,.12)!important;}

      .article-nav{display:flex!important;gap:14px!important;flex-wrap:wrap!important;margin-top:30px!important;}
      .article-nav a{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:46px!important;padding:13px 24px!important;border-radius:999px!important;background:#c7af82!important;color:#fff!important;border:1px solid rgba(199,175,130,.72)!important;box-shadow:0 12px 26px rgba(199,175,130,.22)!important;font-weight:700!important;line-height:1.2!important;text-decoration:none!important;transition:transform .28s ease,box-shadow .28s ease,background .28s ease!important;}
      .article-nav a:hover{background:#b99b62!important;color:#fff!important;transform:translateY(-2px)!important;box-shadow:0 16px 32px rgba(199,175,130,.28)!important;}
      @media(max-width:680px){.article-nav{flex-direction:column!important}.article-nav a{width:100%!important}}

      .scroll-motion,.scroll-motion.reveal,.scroll-motion.reveal.show{opacity:0!important;transform:translate3d(0,34px,0)!important;transition-property:opacity,transform!important;transition-duration:1.02s,1.16s!important;transition-timing-function:cubic-bezier(.19,1,.22,1),cubic-bezier(.19,1,.22,1)!important;transition-delay:var(--motion-delay,0ms),var(--motion-delay,0ms)!important;will-change:opacity,transform;}
      .scroll-motion.motion-card,.scroll-motion.motion-card.reveal,.scroll-motion.motion-card.reveal.show{transform:translate3d(0,42px,0)!important;}
      .scroll-motion.motion-soft,.scroll-motion.motion-soft.reveal,.scroll-motion.motion-soft.reveal.show{transform:translate3d(0,22px,0)!important;}
      .scroll-motion.motion-in,.scroll-motion.motion-in.reveal,.scroll-motion.reveal.show.motion-in{opacity:1!important;transform:translate3d(0,0,0)!important;}

      @media(max-width:1100px){
        body.mobile-menu-open::before{content:'';position:fixed;inset:0;background:rgba(255,255,255,.62)!important;z-index:998;pointer-events:none;backdrop-filter:blur(2px);}
        header .hamb{display:inline-flex!important;cursor:pointer;position:relative;z-index:1005;background:rgba(255,255,255,.96)!important;border-color:rgba(4,92,57,.2)!important;box-shadow:0 8px 24px rgba(16,27,23,.12)!important;}
        header .hamb i{background:#045c39!important;transition:transform .25s ease,opacity .25s ease;}
        header .nav-cta{display:none!important;}
        header nav,header .nav-dropdowns{position:fixed!important;left:16px!important;right:16px!important;top:82px!important;display:grid!important;gap:0!important;padding:18px 22px 22px!important;background-color:#fbfaf6!important;background-image:none!important;color:#1e2b27!important;border:1px solid rgba(4,92,57,.1)!important;border-radius:18px!important;box-shadow:0 22px 60px rgba(3,24,18,.18)!important;transform:translate3d(0,-14px,0)!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;transition:opacity .28s ease,transform .28s ease,visibility .28s ease!important;z-index:1004!important;max-height:calc(100vh - 108px)!important;overflow-y:auto!important;}
        body.mobile-menu-open header nav,body.mobile-menu-open header .nav-dropdowns{opacity:1!important;visibility:visible!important;pointer-events:auto!important;transform:translate3d(0,0,0)!important;}
        header nav a,header .nav-dropdowns a,header .nav-link,header .nav-direct{display:block!important;padding:15px 4px!important;color:#1e2b27!important;border-bottom:1px solid rgba(4,92,57,.1)!important;font-size:17px!important;font-weight:700!important;line-height:1.35!important;opacity:1!important;text-shadow:none!important;}
        header nav a:hover,header nav a.nav-active,header nav a.active,header .nav-link:hover,header .nav-direct:hover{color:#045c39!important;background:rgba(199,175,130,.16)!important;padding-left:14px!important;}
        header nav a::after,header .nav-link::after,header .nav-direct::after{display:none!important;}
        header .nav-item{width:100%!important;}
        header .nav-panel{position:static!important;display:none!important;transform:none!important;opacity:1!important;visibility:visible!important;pointer-events:auto!important;box-shadow:none!important;border:0!important;background:#f1eee6!important;padding:6px 14px!important;margin:0 0 8px!important;border-radius:12px!important;}
        header .nav-item.open .nav-panel{display:block!important;}
        body.mobile-menu-open header .hamb i:nth-child(1){transform:translateY(7px) rotate(45deg);}
        body.mobile-menu-open header .hamb i:nth-child(2){opacity:0;}
        body.mobile-menu-open header .hamb i:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
      }
      @media(prefers-reduced-motion:reduce){.scroll-motion{opacity:1!important;transform:none!important;transition:none!important;}}
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
    return Array.from(parent.children).filter(child => isVisible(child) && !['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(child.tagName));
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
    ensureFooterModule();
    injectStyle();
    setupMobileMenu();
    normalizeSelfCourseTexts();
    setupScrollMotion();
    setTimeout(function () { ensureFooterModule(); normalizeSelfCourseTexts(); setupMobileMenu(); }, 180);
    setTimeout(function () { ensureFooterModule(); normalizeSelfCourseTexts(); }, 520);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
