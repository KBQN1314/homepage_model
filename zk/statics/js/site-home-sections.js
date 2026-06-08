(function () {
  'use strict';

  const TRUST_ITEMS = [
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
  ];

  const PARTNER_ITEMS = [
    { src: 'partners/zkyxls.png', alt: '中国科学院心理研究所' },
    { src: 'partners/gxzj.png', alt: '国信中健数字科技有限公司' },
    { src: 'partners/ctwhcjh.png', alt: '中国传统文化促进会' }
  ];

  const JOIN_STEPS = [
    ['01', '咨询沟通', '了解合作城市、资源基础和合作意向。'],
    ['02', '审核培训', '完成资质审核、课程培训和导师认证。'],
    ['03', '授权试运营', '获得标准物料、活动支持与运营指导。'],
    ['04', '总部支持', '品牌、课程、教研、活动和质量服务与监管。'],
    ['05', '本地获客', '公开课、体验课、社群和机构合作。'],
    ['06', '持续复盘', '根据数据反馈优化招生与交付流程。']
  ];

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function renderTrustGrid() {
    const grid = document.querySelector('.trust-grid');
    if (!grid) return;
    grid.dataset.homeSection = 'trust';
    grid.innerHTML = TRUST_ITEMS.map(item => `
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
    grid.innerHTML = PARTNER_ITEMS.map(item => `
      <div class="partner-card">
        <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}">
      </div>
    `).join('');
  }

  function renderJoinSteps() {
    const list = document.querySelector('.join-steps');
    if (!list) return;
    list.dataset.homeSection = 'join-steps';
    list.innerHTML = JOIN_STEPS.map(([number, title, text]) => `
      <div class="step reveal show">
        <b>${escapeHtml(number)}</b>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(text)}</p>
      </div>
    `).join('');
  }

  function init() {
    renderTrustGrid();
    renderPartnerGrid();
    renderJoinSteps();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
