(function () {
  const COURSE_CHALLENGES = {
    'course-detail.html': {
      title: '看得见的阶段挑战',
      intro: '专注力训练不只看孩子“听不听话”，而是通过可观察的任务，帮助家长看到孩子进入学习状态、保持专注和自我调节的过程变化。',
      items: [
        ['静坐专注观察', '通过静坐、呼吸和身体锚定任务，观察孩子从安静坐下到稳定投入的变化。'],
        ['抗干扰任务挑战', '通过听指令、视觉追踪和抗干扰小游戏，观察孩子是否更容易锁定任务。'],
        ['情绪觉察记录', '通过表达练习和阶段反馈，观察孩子是否能更清楚说出自己的烦躁、紧张和退缩。'],
        ['21天家庭陪跑', '营期后配合家庭练习和反馈记录，帮助家长把课堂训练延伸到日常学习场景。']
      ],
      note: '以上为专注力训练中的阶段观察项目，用于帮助家长理解孩子的训练变化；具体表现会因孩子基础、参与状态和课后练习情况有所差异。'
    },
    'photo-memory-detail.html': {
      title: '结营挑战：让记忆变化看得见',
      intro: '记忆营会设置阶段性挑战项目，观察孩子在静定专注、脑内成像、整页摄入和信息提取方面的训练变化。',
      items: [
        ['5秒单词成像挑战', '观察孩子是否能快速把英语单词转化为更清晰的脑内图像。'],
        ['1分钟古诗图像记忆挑战', '通过古诗文图像化处理，观察孩子的快速记忆和语言提取能力。'],
        ['5分钟短文摄入挑战', '围绕约300字短文进行整体摄入、复述或默写反馈，观察信息提取质量。'],
        ['陌生材料限时反馈', '通过陌生材料阅读、笔试或口述反馈，观察记忆方法是否具备迁移可能。'],
        ['学科迁移挑战', '将训练迁移到古诗文、英语单词、理科公式等内容，观察真实学习场景中的应用。']
      ],
      note: '以上为课程训练中的阶段挑战项目，不作为统一承诺结果；实际表现会受孩子基础、专注状态、年龄阶段和练习完成度影响。'
    },
    'camp-detail.html': {
      title: '阅读突破挑战：速度、理解和复述一起看',
      intro: '阅读训练不只是追求“读得快”，而是同时观察阅读速度、理解率、结构复述和大篇幅材料处理能力。',
      items: [
        ['阅读速度提升训练', '通过逐步减少逐字默读和线性阅读依赖，观察阅读速度的阶段变化。'],
        ['整页摄入挑战', '训练孩子从局部字词阅读转向整体页面摄入，观察信息捕捉效率。'],
        ['脑内成像挑战', '叙事材料形成脑内电影，说明文和议论文形成结构图，观察理解深度。'],
        ['核心结构复述挑战', '读完后用自己的话复述人物、事件、观点、结构和关键细节。'],
        ['限时阅读反馈', '通过大篇幅材料限时阅读，观察孩子面对考试阅读量时的稳定性。']
      ],
      note: '以上为阅读训练中的阶段观察项目，训练目标是综合提升速度、理解和复述质量；具体表现会因孩子基础和练习情况有所差异。'
    },
    'public-class-detail.html': {
      title: '4天自学挑战：让孩子体验“我能自己学”',
      intro: '自主营（数学）围绕一本数学教材展开训练，通过格定义五步法、格定理四步法、问天录、错题本和AI辅助验证，帮助孩子体验从读懂教材到闭卷测评的完整闭环。',
      items: [
        ['4天核心学习任务', '围绕一本数学教材完成核心章节学习、定义理解、定理梳理和题目验证。'],
        ['定义定理讲清楚', '训练孩子用大白话说清定义、定理、条件、结论和解题逻辑。'],
        ['AI提问与验证', '把AI当作学习助教，训练孩子会提问、会追问，也会验证答案是否可靠。'],
        ['知识全景图挑战', '绘制跨章节数学知识全景图，观察孩子是否真正理解章节之间的关系。'],
        ['闭卷测评反馈', '通过闭卷测评观察孩子对核心内容的掌握情况，并形成后续自学计划。']
      ],
      note: '以上为数学自学训练中的阶段挑战和测评反馈，不作为统一承诺结果；实际表现会受年级基础、教材难度、参与状态和练习完成度影响。'
    }
  };

  function addStyle() {
    if (document.getElementById('courseChallengeStyle')) return;
    const style = document.createElement('style');
    style.id = 'courseChallengeStyle';
    style.textContent = `
      .course-challenge-block{background:linear-gradient(135deg,#fff 0%,#fbfaf6 100%);border:1px solid rgba(199,175,130,.26);box-shadow:0 18px 45px rgba(16,27,23,.08)}
      .course-challenge-intro{font-size:16px;line-height:1.9;color:#5f6b66;margin:0 0 22px}
      .course-challenge-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:18px}
      .course-challenge-item{position:relative;padding:22px 22px 20px 24px;background:#fff;border-left:4px solid var(--gold,#c7af82);box-shadow:0 10px 28px rgba(16,27,23,.06)}
      .course-challenge-item b{display:block;color:var(--green,#045c39);font-size:19px;margin-bottom:8px}
      .course-challenge-item span{display:block;color:#65716c;line-height:1.8;font-size:15px}
      .course-challenge-note{margin-top:20px;padding:14px 16px;background:#f7f5ef;color:#7b6b4f;font-size:14px;line-height:1.8;border-left:3px solid var(--gold,#c7af82)}
      @media(max-width:760px){.course-challenge-grid{grid-template-columns:1fr}.course-challenge-item{padding:20px}}
    `;
    document.head.appendChild(style);
  }

  function removeOldChallengeBlocks(main) {
    const oldTitles = ['结营挑战项目', '阶段挑战项目', '4天自学挑战'];
    [...main.querySelectorAll('.detail-block')].forEach(block => {
      const h2 = block.querySelector('h2');
      if (h2 && oldTitles.includes(h2.textContent.trim())) block.remove();
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
    if (!main || main.querySelector('.course-challenge-block')) return;
    addStyle();
    removeOldChallengeBlocks(main);
    const blocks = [...main.querySelectorAll('.detail-block')];
    const anchor = blocks[1] || blocks[0];
    const challengeBlock = createChallengeBlock(data);
    if (anchor && anchor.nextSibling) {
      main.insertBefore(challengeBlock, anchor.nextSibling);
    } else {
      main.appendChild(challengeBlock);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCourseChallenges);
  } else {
    initCourseChallenges();
  }
})();
