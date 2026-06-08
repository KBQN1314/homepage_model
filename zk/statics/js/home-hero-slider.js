(function () {
  'use strict';

  const SLIDE_DURATION = 7000;

  function initHeroSlider() {
    const hero = document.querySelector('.hero');
    if (!hero || hero.dataset.heroSliderReady === 'true') return;

    const slides = Array.from(hero.querySelectorAll('.slide'));
    const dots = Array.from(hero.querySelectorAll('.hero-dots button'));
    const progress = hero.querySelector('.progress-line');
    if (slides.length < 2) return;

    hero.dataset.heroSliderReady = 'true';

    let index = slides.findIndex(slide => slide.classList.contains('active'));
    if (index < 0) index = 0;
    let timer = null;

    function restartProgress() {
      if (!progress) return;
      progress.classList.remove('cur');
      void progress.offsetWidth;
      progress.classList.add('cur');
    }

    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      restartProgress();
    }

    function start() {
      clearInterval(timer);
      timer = setInterval(() => show(index + 1), SLIDE_DURATION);
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        show(i);
        start();
      });
    });

    show(index);
    start();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroSlider);
  } else {
    initHeroSlider();
  }
})();
