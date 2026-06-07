(function () {
  const COURSE_CHALLENGES = {
    'course-detail.html': {
      title: '阶段挑战：让专注变化看得见',
      intro: '专注营通过可观察的阶段任务，帮助家长看到孩子在安静坐下、进入学习状态、听指令、抗干扰和情绪调节方面的变化。页面展示的是训练观察方向，不写成统一承诺结果。',
      items: [
        ['15→30分钟静坐专注观察', '以训练前的安静状态为参考，通过静坐、呼吸和身体锚定任务，观察孩子是否能逐步向更稳定、更持久的专注状态靠近。'],
        ['听指令与抗干扰挑战', '通过听觉追踪、视觉观察和抗干扰任务，观察孩子是否更容易锁定任务、减少被外界刺激带走。'],
        ['10分钟家庭练习反馈', '营期后配合每天约10分钟家庭练习，观察课堂训练是否能延伸到写作业、阅读和复习等日常场景。'],
        ['情绪觉察与表达记录', '通过表达练习和阶段反馈，观察孩子是否能更清楚地说出烦躁、紧张、退缩等状态，并尝试自我调节。'],
        ['21天家庭陪跑记录', '通过约21天家庭陪跑和反馈记录，帮助家长持续观察孩子学习状态的变化。']
      ],
      note: '以上为专注力训练中的阶段观察项目，不作为统一承诺结果；具体表现会因孩子基础、参与状态、年龄阶段和课后练习情况有所差异。'
    },
    'photo-memory-detail.html': {
      title: '结营挑战：让记忆变化看得见',
      intro: '记忆营设置阶段性挑战项目，观察孩子在静定专注、脑内成像、整页摄入、信息提取和学科迁移方面的训练变化。',
      items: [
        ['5秒单词成像挑战', '观察孩子是否能在短时间内把英语单词转化为更清晰的脑内图像，并完成提取反馈。'],
        ['1分钟古诗图像记忆挑战', '通过古诗文图像化处理，观察孩子在快速记忆和语言提取方面的变化。'],
        ['5分钟短文摄入挑战', '围绕约300字短文进行整体摄入、复述或默写反馈，观察信息提取质量。'],
        ['10秒整页摄入挑战', '通过整页摄入训练，观察孩子闭眼后是否能从脑内页面提取部分关键信息。'],
        ['学科迁移挑战', '将训练迁移到古诗文、英语单词、理科公式等内容，观察真实学习场景中的应用。']
      ],
      note: '以上为课程训练中的阶段挑战项目，用于观察训练变化，不作为统一承诺结果；实际表现会受孩子基础、专注状态、年龄阶段和练习完成度影响。'
    },
    'camp-detail.html': {
      title: '阅读突破挑战：速度、理解和复述一起看',
      intro: '阅读训练不只是追求“读得快”，而是同时观察阅读速度、理解率、结构复述和大篇幅材料处理能力。',
      items: [
        ['300→3000字/分钟速度挑战', '以常规阅读速度约300字/分钟为参考，训练中设置高效阅读速度挑战，观察孩子向更高效阅读状态靠近的可能性。'],
        ['75%理解率反馈', '速读后配合闭卷笔试、口头复述或结构提取，观察理解质量是否能够同步保持。'],
        ['全书核心结构复述', '合上书后复述全书核心结构与关键细节，观察是否真正读懂，而不是只追求速度。'],
        ['整页摄入与脑内成像', '训练整页摄入、脑内电影或结构图，观察文字是否能转化为图像与逻辑框架。'],
        ['大篇幅限时阅读反馈', '通过小说、说明文、议论文等大篇幅材料限时阅读，观察孩子面对考试阅读量时的稳定性。']
      ],
      note: '以上为阅读训练中的阶段观察项目，训练目标是综合提升速度、理解和复述质量；具体表现会因孩子基础、材料难度和练习情况有所差异。'
    },
    'public-class-detail.html': {
      title: '4天自学挑战：让孩子体验“我能自己学”',
      intro: '自主营（数学）围绕一本数学教材展开训练，通过格定义五步法、格定理四步法、问天录、错题本和AI辅助验证，帮助孩子体验从读懂教材到闭卷测评的完整闭环。',
      items: [
        ['4天一本书核心挑战', '围绕一本数学教材完成核心章节学习、定义理解、定理梳理、例题验证和错题复盘。'],
        ['90分闭卷测评挑战', '通过闭卷测评观察孩子对教材核心内容的掌握情况，作为阶段反馈目标，不作为统一承诺结果。'],
        ['定义定理大白话表达', '训练孩子用自己的话说清定义、定理、条件、结论和解题逻辑，避免只会背不会用。'],
        ['AI 24小时助教使用', '训练孩子把AI当作学习助教，会提问、会追问，也会验证答案是否可靠。'],
        ['知识全景图挑战', '绘制跨章节数学知识全景图，观察孩子是否真正理解章节之间的关系。'],
        ['补习依赖降低观察', '通过自学流程和错题复盘，观察孩子是否从“等老师讲”逐步转向“自己先学、再验证”。']
      ],
      note: '以上为数学自学训练中的阶段挑战和测评反馈，不作为统一承诺结果；实际表现会受年级基础、教材难度、参与状态和练习完成度影响。'
    }
  };

  function addStyle() {
    if (document.getElementById('courseChallengeStyle')) return;
    const style = document.createElement('style');
    style.id = 'courseChallengeStyle';
    style.textContent = `
      .course-challenge-block{background:linear-gradient(135deg,#fff 0%,#fbfaf6 100%);border:1px solid rgba(199,175,130,.28);box-shadow:0 20px 52px rgba(16,27,23,.09)}
      .course-challenge-block h2{letter-spacing:-.5px}
      .course-challenge-intro{font-size:17px;line-height:1.95;color:#5f6b66;margin:0 0 24px}
      .course-challenge-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:20px}
      .course-challenge-item{position:relative;padding:24px 24px 22px 26px;background:#fff;border-left:4px solid var(--gold,#c7af82);box-shadow:0 12px 30px rgba(16,27,23,.07);overflow:hidden}
      .course-challenge-item::after{content:'';position:absolute;right:-34px;top:-34px;width:82px;height:82px;border-radius:50%;background:rgba(199,175,130,.08)}
      .course-challenge-item b{display:block;color:var(--green,#045c39);font-size:21px;line-height:1.35;margin-bottom:9px}
      .course-challenge-item span{display:block;color:#65716c;line-height:1.85;font-size:15px}
      .course-challenge-note{margin-top:22px;padding:15px 18px;background:#f7f5ef;color:#7b6b4f;font-size:14px;line-height:1.85;border-left:3px solid var(--gold,#c7af82)}
      @media(max-width:760px){.course-challenge-grid{grid-template-columns:1fr}.course-challenge-item{padding:21px}}
    `;
    document.head.appendChild(style);
  }

  function normalizeCourseHeadings(main) {
    main.querySelectorAll('h2').forEach(h2 => {
      const text = h2.textContent.trim();
      if (text === '数字化亮点') h2.textContent = '训练观察重点';
      if (text === '家长能获得什么') h2.textContent = '孩子能获得什么';
      if (text === '家长能看到的变化') h2.textContent = '孩子能获得什么';
    });
  }

  function removeOldChallengeBlocks(main) {
    const oldTitles = [
      '看得见的阶段挑战', '结营挑战项目', '阶段挑战项目', '4天自学挑战',
      '结营挑战：让记忆变化看得见', '阅读突破挑战：速度、理解和复述一起看',
      '4天自学挑战：让孩子体验“我能自己学”', '阶段挑战：让专注变化看得见'
    ];
    [...main.querySelectorAll('.detail-block')].forEach(block => {
      const h2 = block.querySelector('h2');
      if (block.classList.contains('course-challenge-block') || (h2 && oldTitles.includes(h2.textContent.trim()))) block.remove();
    });
  }

  function createChallengeBlock(data) {
    const block = document.createElement('div');
    block.className = 'detail-block reveal show course-challenge-block';
    block.innerHTML = `
      <h2>${data.title}</h2>
      <p class="course-challenge-intro">${data.intro}</p>
      <div class="course-challenge-grid">
        ${data.items.map(([title, text]) => `<div class="course-challenge-item"><b>${title}</b><span>${text}</span></div>`).join('')}
      </div>
      <div class="course-challenge-note">${data.note}</div>
    `;
    return block;
  }

  function initCourseChallenges() {
    const page = location.pathname.split('/').pop();
    const data = COURSE_CHALLENGES[page];
    if (!data) return;
    const main = document.querySelector('.detail-main');
    if (!main) return;
    addStyle();
    normalizeCourseHeadings(main);
    removeOldChallengeBlocks(main);
    const blocks = [...main.querySelectorAll('.detail-block')];
    const anchor = blocks[1] || blocks[0];
    const challengeBlock = createChallengeBlock(data);
    if (anchor && anchor.nextSibling) main.insertBefore(challengeBlock, anchor.nextSibling);
    else main.appendChild(challengeBlock);
    normalizeCourseHeadings(main);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCourseChallenges);
  } else {
    initCourseChallenges();
  }

  setTimeout(initCourseChallenges, 250);
})();
