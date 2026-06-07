(function () {
  function ensureMobileMenuStyle() {
    if (document.getElementById('mobileMenuFixStyle')) return;
    const style = document.createElement('style');
    style.id = 'mobileMenuFixStyle';
    style.textContent = `
      @media (max-width: 1100px) {
        header .hamb {
          display: inline-flex !important;
          cursor: pointer;
          position: relative;
          z-index: 1002;
        }

        header .nav-cta {
          display: none !important;
        }

        header nav,
        header .nav-dropdowns {
          position: fixed !important;
          left: 0 !important;
          right: 0 !important;
          top: 68px !important;
          display: grid !important;
          gap: 0 !important;
          padding: 18px 24px 26px !important;
          background: rgba(255, 255, 255, .98) !important;
          color: #26332f !important;
          box-shadow: 0 22px 55px rgba(16, 27, 23, .18) !important;
          transform: translate3d(0, -18px, 0) !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          transition: opacity .28s ease, transform .28s ease, visibility .28s ease !important;
          z-index: 1001 !important;
          max-height: calc(100vh - 68px) !important;
          overflow-y: auto !important;
        }

        body.mobile-menu-open header nav,
        body.mobile-menu-open header .nav-dropdowns {
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          transform: translate3d(0, 0, 0) !important;
        }

        header nav a,
        header .nav-dropdowns a,
        header .nav-link,
        header .nav-direct {
          display: block !important;
          padding: 13px 0 !important;
          color: #26332f !important;
          border-bottom: 1px solid rgba(4, 92, 57, .08) !important;
          font-size: 16px !important;
        }

        header .nav-item {
          width: 100% !important;
        }

        header .nav-panel {
          position: static !important;
          transform: none !important;
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          box-shadow: none !important;
          border: 0 !important;
          background: rgba(4, 92, 57, .04) !important;
          padding: 4px 14px !important;
          margin: 0 0 6px !important;
          display: none !important;
        }

        header .nav-item.open .nav-panel {
          display: block !important;
        }

        body.mobile-menu-open header .hamb i:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        body.mobile-menu-open header .hamb i:nth-child(2) {
          opacity: 0;
        }

        body.mobile-menu-open header .hamb i:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        header .hamb i {
          transition: transform .25s ease, opacity .25s ease;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function setupMobileMenu() {
    ensureMobileMenuStyle();
    const hamb = document.querySelector('.hamb');
    const header = document.querySelector('header');
    if (!hamb || !header || hamb.dataset.mobileMenuReady === 'true') return;

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

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1100) {
        document.body.classList.remove('mobile-menu-open');
        hamb.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMobileMenu);
  } else {
    setupMobileMenu();
  }
})();
