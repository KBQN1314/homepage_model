(function () {
  'use strict';

  const VERSION = '2026.06.08-refactor';
  const currentScript = document.currentScript;

  function getPathPrefix() {
    const path = location.pathname;
    if (/\/zk\/news\/(company|growth|limited)\//.test(path)) return '../../';
    if (/\/zk\/(expert|cases)\//.test(path)) return '../';
    return '';
  }

  function isHomePage() {
    const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    return file === '' || file === 'index.html';
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (document.querySelector('script[src="' + src + '"]')) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      (document.body || document.documentElement).appendChild(script);
    });
  }

  const prefix = getPathPrefix();
  const cache = currentScript && currentScript.src.includes('?') ? currentScript.src.split('?')[1] : 'v=' + VERSION;

  loadScript(prefix + 'statics/js/site-data.js?' + cache)
    .then(function () { return loadScript(prefix + 'statics/js/site-runtime.js?' + cache); })
    .then(function () {
      if (!isHomePage()) return null;
      return loadScript(prefix + 'statics/js/site-news-data.js?' + cache)
        .then(function () { return loadScript(prefix + 'statics/js/site-home-runtime.js?' + cache); });
    })
    .catch(function (error) {
      console.error('[ZKSite] failed to initialize site runtime:', error);
    });
})();
