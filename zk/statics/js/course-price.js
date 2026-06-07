(function () {
  function getCoursePrice() {
    var path = window.location.pathname.split('/').pop();
    if (path === 'evaluation-detail.html') {
      return '199元 / 节（约2小时）';
    }
    if (['course-detail.html', 'photo-memory-detail.html', 'camp-detail.html', 'public-class-detail.html'].includes(path)) {
      return '9800元 / 期（7天6夜）';
    }
    return '';
  }

  function appendPriceRow() {
    var price = getCoursePrice();
    if (!price) return;

    var sideList = document.querySelector('.side-card .side-list');
    if (!sideList || sideList.querySelector('[data-course-price]')) return;

    var row = document.createElement('div');
    row.setAttribute('data-course-price', 'true');
    row.innerHTML = '<b>价格</b><span>' + price + '</span>';
    sideList.appendChild(row);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(appendPriceRow, 120);
    });
  } else {
    setTimeout(appendPriceRow, 120);
  }
})();
