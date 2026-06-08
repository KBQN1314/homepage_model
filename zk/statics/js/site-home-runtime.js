/* Homepage section renderer. */
(function () {
  'use strict';

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function courseCard(course, copy) {
    return [
      '<article class="product-card reveal show">',
      '<span class="tag">', escapeHtml(copy.tag || copy.systemTag), '</span>',
      '<h3>', escapeHtml(course.name), '</h3>',
      '<p>', escapeHtml(copy.text), '</p>',
      '<ul>', (copy.list || []).map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join(''), '</ul>',
      '<a class="more" href="', escapeHtml(course.href), '">FIND MORE</a>',
      '</article>'
    ].join('');
  }

  function renderHomeCourses() {
    var grid = document.querySelector('.product-grid[data-home-courses]') || document.querySelector('.products .product-grid');
    var data = window.ZKSiteData;
    if (!grid || !data || !Array.isArray(data.courses) || !data.courseCopy) return;

    grid.innerHTML = data.courses.map(function (course) {
      return courseCard(course, data.courseCopy[course.key] || {});
    }).join('');
    grid.setAttribute('data-home-courses', '');
  }

  function newsSummaryMap(newsItems) {
    var defaults = {
      company: {
        label: 'COMPANY NEWS',
        title: '公司动态',
        summary: '了解课程发布、教学服务、合作活动及品牌动态。',
        href: 'company-news.html'
      },
      growth: {
        label: 'GROWTH INSIGHTS',
        title: '成长资讯',
        summary: '围绕专注力、记忆力、阅读力、家庭陪伴等主题，持续分享成长内容。',
        href: 'growth-news.html'
      },
      limited: {
        label: 'LIMITED ACTIVITY',
        title: '限时活动',
        summary: '公益公开课、体验活动和阶段优惠信息，帮助家庭低门槛了解课程。',
        href: 'limited-activity.html'
      }
    };

    if (!Array.isArray(newsItems)) return defaults;

    newsItems.forEach(function (item) {
      if (!item || !defaults[item.categoryKey]) return;
      defaults[item.categoryKey].latestHref = item.href;
    });

    return defaults;
  }

  function newsCard(item) {
    return [
      '<article class="news-card reveal show">',
      '<a href="', escapeHtml(item.href || item.latestHref || '#'), '" aria-label="', escapeHtml(item.title), '">',
      '<div class="news-img"></div>',
      '<div class="news-body">',
      '<span class="date">', escapeHtml(item.label), '</span>',
      '<h3>', escapeHtml(item.title), '</h3>',
      '<p>', escapeHtml(item.summary), '</p>',
      '</div>',
      '</a>',
      '</article>'
    ].join('');
  }

  function renderHomeNews() {
    var grid = document.querySelector('.news-grid[data-home-news]') || document.querySelector('.news .news-grid');
    if (!grid) return;

    var map = newsSummaryMap(window.ZKNewsList || []);
    var order = ['company', 'growth', 'limited'];
    grid.innerHTML = order.map(function (key) { return newsCard(map[key]); }).join('');
    grid.setAttribute('data-home-news', '');
  }

  function renderHomeSections() {
    renderHomeCourses();
    renderHomeNews();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderHomeSections);
  } else {
    renderHomeSections();
  }
}());
