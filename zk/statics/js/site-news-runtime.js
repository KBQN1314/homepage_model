(function () {
  'use strict';

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function currentCategory() {
    var file = (window.location.pathname.split('/').pop() || 'news.html').toLowerCase();
    if (file === 'company-news.html') return 'company';
    if (file === 'growth-news.html') return 'growth';
    if (file === 'limited-activity.html') return 'limited';
    return 'all';
  }

  function renderNewsCard(item) {
    var thumbClass = item.imageClass ? ' has-image ' + escapeHtml(item.imageClass) : '';
    return [
      '<article class="news-page-card reveal show">',
        '<div class="news-page-thumb' + thumbClass + '"></div>',
        '<div class="news-page-body">',
          '<span class="category">' + escapeHtml(item.category) + '</span>',
          '<h3>' + escapeHtml(item.title) + '</h3>',
          '<p>' + escapeHtml(item.summary) + '</p>',
          '<div class="meta"><span>' + escapeHtml(item.date) + '</span><a class="more" href="' + escapeHtml(item.href) + '">MORE &gt;</a></div>',
        '</div>',
      '</article>'
    ].join('');
  }

  function renderNewsList() {
    var grid = document.querySelector('.news-page-grid[data-news-list]');
    var items = window.ZKNewsList;
    if (!grid || !Array.isArray(items) || !items.length) return;

    var key = currentCategory();
    var filtered = key === 'all' ? items : items.filter(function (item) {
      return item.categoryKey === key;
    });

    if (!filtered.length) return;
    grid.innerHTML = filtered.map(renderNewsCard).join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNewsList);
  } else {
    renderNewsList();
  }
})();
