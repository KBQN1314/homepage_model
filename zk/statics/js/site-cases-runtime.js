(function () {
  'use strict';

  const cases = window.ZKCaseList;
  if (!Array.isArray(cases)) return;

  const escapeHtml = value => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  function renderCaseCard(item) {
    const thumbClass = item.imageClass ? `case-thumb case-image ${item.imageClass}` : 'case-thumb';
    const thumbContent = item.imageClass ? '' : escapeHtml(item.number);
    return `<article class="case-card reveal show">
      <div class="${thumbClass}">${thumbContent}</div>
      <div class="case-info">
        <div class="type">${escapeHtml(item.type)}</div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.summary)}</p>
        <a class="btn-mini" href="${escapeHtml(item.href)}">查看案例</a>
      </div>
    </article>`;
  }

  function renderCaseList() {
    const grid = document.querySelector('.cases-grid[data-case-list]');
    if (!grid) return;
    grid.innerHTML = cases.map(renderCaseCard).join('');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderCaseList, { once: true });
  else renderCaseList();
})();
