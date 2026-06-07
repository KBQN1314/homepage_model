(function () {
  function initHeroRotationFix() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const slides = Array.from(hero.querySelectorAll('.slide'));
    const dots = Array.from(hero.querySelectorAll('.hero-dots button'));
    const eyebrow = hero.querySelector('.eyebrow');
    const title = hero.querySelector('.hero-inner h1');
    const subtitle = hero.querySelector('.hero-inner h2');
    const desc = hero.querySelector('.hero-inner p');
    const actions = hero.querySelector('.hero-actions');
    const floatingTitle = hero.querySelector('.floating-card b');
    const floatingText = hero.querySelector('.floating-card span');
    if (!slides.length || !title || !subtitle || !desc) return;

    const content = [
      {
        eyebrow: 'Scientific Training · Family Support',
        title: '中科明心(北海)智能科技有限公司',
        subtitle: '专注青少年学习力成长与家庭教育支持',
        desc: '以科学训练、家庭支持和过程反馈，帮助孩子提升内驱力、专注力、感知力、记忆力、阅读力、表达力和自信心。',
        primary: '微信咨询',
        primaryHref: 'contact.html',
        secondary: '了解课程体系',
        secondaryHref: '#course',
        floatTitle: '8-18岁',
        floatText: '面向青少年及家长'
      },
      {
        eyebrow: 'Course System · Learning Ability',
        title: '系统训练，陪伴孩子逐步提升学习力',
        subtitle: '专注营、记忆营、阅读营、自主营，多阶段支持成长',
        desc: '从孩子的真实学习状态出发，提供科学训练、家庭支持和及时反馈，让成长更有方向。',
        primary: '查看课程',
        primaryHref: '#course',
        secondary: '微信咨询',
        secondaryHref: 'contact.html',
        floatTitle: '4大课程',
        floatText: '阶段训练 · 过程反馈'
      },
      {
        eyebrow: 'Public Service · Growth Activities',
        title: '以专业服务连接家庭、学校与成长场景',
        subtitle: '公益公开课、阅读成长、家庭陪伴与学习力支持',
        desc: '结合课程实践、公益活动和家庭教育沟通，帮助家长更清晰地理解孩子学习状态背后的能力因素。',
        primary: '新闻活动',
        primaryHref: 'news.html',
        secondary: '联系我们',
        secondaryHref: 'contact.html',
        floatTitle: '公益活动',
        floatText: '阅读成长 · 家庭支持'
      }
    ];

    let currentIndex = Math.max(0, slides.findIndex(slide => slide.classList.contains('active')));
    let lastChange = Date.now();

    function render(index) {
      const data = content[index] || content[0];
      if (eyebrow) eyebrow.textContent = data.eyebrow;
      title.textContent = data.title;
      subtitle.textContent = data.subtitle;
      desc.textContent = data.desc;
      if (actions) {
        actions.innerHTML = `<a class="btn btn-gold" href="${data.primaryHref}">${data.primary}</a><a class="btn btn-line" href="${data.secondaryHref}">${data.secondary}</a>`;
      }
      if (floatingTitle) floatingTitle.textContent = data.floatTitle;
      if (floatingText) floatingText.textContent = data.floatText;
      currentIndex = index;
      lastChange = Date.now();
    }

    function show(index) {
      const next = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('active', i === next));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === next));
      render(next);
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', function () {
        show(i);
      });
    });

    const observer = new MutationObserver(function () {
      const activeIndex = Math.max(0, slides.findIndex(slide => slide.classList.contains('active')));
      if (activeIndex !== currentIndex) render(activeIndex);
    });
    slides.forEach(slide => observer.observe(slide, { attributes: true, attributeFilter: ['class'] }));

    render(currentIndex);

    setInterval(function () {
      if (Date.now() - lastChange > 8500) show(currentIndex + 1);
    }, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroRotationFix);
  } else {
    initHeroRotationFix();
  }
})();
