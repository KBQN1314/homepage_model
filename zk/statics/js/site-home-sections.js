(function () {
  'use strict';

  /**
   * 首页静态区块运行时
   *
   * 作用：集中管理首页“团队支撑、合作伙伴、加盟流程”三个区块的数据。
   * 原 HTML 中的静态内容仍作为兜底；脚本加载成功后，会以这里的数据重新渲染对应区块。
   */
  const HOME_SECTIONS = Object.freeze({
    trust: Object.freeze([
      {
        icon: '专',
        title: '专家团队',
        text: '汇聚心理学、脑科学与教育实践领域专业力量，为课程研发、测评训练和成长服务提供持续支持。'
      },
      {
        icon: '研',
        title: '教研团队',
        text: '围绕课程体系、训练方法和教学流程持续研发，保障课程内容清晰、训练过程规范。'
      },
      {
        icon: '师',
        title: '认证导师',
        text: '负责课程实施、课堂陪伴和阶段反馈，帮助孩子在训练过程中逐步建立方法和信心。'
      },
      {
        icon: '案',
        title: '成功案例',
        text: '通过阶段变化、训练记录和家长反馈，呈现孩子在学习状态与能力提升方面的成长过程。'
      }
    ]),
    partners: Object.freeze([
      { src: 'partners/zkyxls.png', alt: '中国科学院心理研究所' },
      { src: 'partners/gxzj.png', alt: '国信中健数字科技有限公司' },
      { src: 'partners/ctwhcjh.png', alt: '中国传统文化促进会' }
    ]),
    joinSteps: Object.freeze([
      { number: '01', title: '咨询沟通', text: '了解合作城市、资源基础和合作意向。' },
      { number: '02', title: '审核培训', text: '完成资质审核、课程培训和导师认证。' },
      { number: '03', title: '授权试运营', text: '获得标准物料、活动支持与运营指导。' },
      { number: '04', title: '总部支持', text: '品牌、课程、教研、活动和质量服务与监管。' },
      { number: '05', title: '本地获客', text: '公开课、体验课、社群和机构合作。' },
      { number: '06', title: '持续复盘', text: '根据数据反馈优化招生与交付流程。' }
    ])
  });

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function hasHomeSection() {
    return Boolean(
      document.querySelector('.trust-grid') ||
      document.querySelector('.partner-grid') ||
      document.querySelector('.join-steps')
    );
  }

  function renderTrustGrid() {
    const grid = document.querySelector('.trust-grid');
    if (!grid) return;
    grid.dataset.homeSection = 'trust';
    grid.innerHTML = HOME_SECTIONS.trust.map(item => `
      <div class="trust-card reveal show">
        <div class="icon">${escapeHtml(item.icon)}</div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
      </div>
    `).join('');
  }

  function renderPartnerGrid() {
    const grid = document.querySelector('.partner-grid');
    if (!grid) return;
    grid.dataset.homeSection = 'partners';
    grid.innerHTML = HOME_SECTIONS.partners.map(item => `
      <div class="partner-card">
        <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}">
      </div>
    `).join('');
  }

  function renderJoinSteps() {
    const list = document.querySelector('.join-steps');
    if (!list) return;
    list.dataset.homeSection = 'join-steps';
    list.innerHTML = HOME_SECTIONS.joinSteps.map(item => `
      <div class="step reveal show">
        <b>${escapeHtml(item.number)}</b>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
      </div>
    `).join('');
  }

  function init() {
    if (!hasHomeSection()) return;
    renderTrustGrid();
    renderPartnerGrid();
    renderJoinSteps();
  }

  window.ZKHomeSections = HOME_SECTIONS;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
