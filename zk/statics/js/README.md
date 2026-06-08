# Frontend runtime notes

本目录存放静态官网运行时脚本。当前站点仍是静态多页面网站，不使用构建工具，所有 HTML、CSS、JS 都需要能在 GitHub Pages 和宝塔 Linux 静态部署环境中直接运行。

## 当前入口

- `main.js`：全站主运行时，负责品牌常量、课程数据、导航链接、课程卡片、课程详情页、页面转场，以及按当前脚本路径加载必要的运行时脚本。
- `scroll-motion.js`：全站运行时兜底层，负责空 `header` 自动补全、footer/sticky 统一生成、旧品牌/旧课程文案兜底替换、移动端菜单最终样式与交互、滚动入场动效。
- `course-challenges.js`：课程详情页挑战模块兼容脚本。后续若挑战模块完全并入 `main.js`，再考虑删除。
- `site-home-sections.js`：首页局部区块运行时，负责首页“团队支撑、合作伙伴、加盟流程”三个区块的数据化渲染。

## 职责边界

1. 页面级 HTML 可以保留正文内容，但顶部导航建议统一写成 `<header id="header"></header>`，由运行时生成完整导航。
2. 页面底部建议统一写成 `<footer class="footer"></footer>` 和 `<div class="sticky"></div>`，由 `scroll-motion.js` 生成统一 footer 与联系入口。
3. 不要在单个 HTML 页面里复制整段旧导航、旧 footer 或移动端菜单样式。
4. 不要在 HTML 页面里直接重复引用 `scroll-motion.js`；它应由 `main.js` 统一加载。
5. 移动端目录目前按“一级菜单直接跳转”处理，不再展开二级菜单。后续如要恢复二级菜单，需要同时修改 `main.js`、`scroll-motion.js` 和 `nav-dropdown.css`，不能只改一个文件。
6. 旧品牌和旧“自主营（数学）”相关替换逻辑目前作为兼容兜底存在，主要用于旧缓存或未清理页面，不应继续在新页面正文中写入旧词。

## 首页维护规则

1. 首页仍保留部分静态正文，是当前最大、最复杂的页面。除非专门做“首页结构整理专项”，否则不要为了单个小改动重写整个 `index.html`。
2. 首页首屏背景轮播和进度条已经取消，当前首页应保持单张静态 hero 背景。不要恢复 `home-hero-slider.js`，也不要再新增首页背景轮播脚本。
3. 首页“团队支撑、合作伙伴、加盟流程”的文案或顺序，优先修改 `site-home-sections.js` 中的 `HOME_SECTIONS`，不要回到 `index.html` 中逐个改卡片。
4. `index.html` 中保留的静态卡片是兜底内容；脚本加载成功后会用数据重新渲染相关区块。
5. 新增首页数据化区块时，优先新增独立数据结构和渲染函数，避免继续扩大 `index.html` 的硬编码内容。
6. 动态插入 HTML 时必须使用 `escapeHtml()` 或等效处理，避免把数据内容直接拼进 HTML。

## 部署说明

当前仓库为静态站点。提交到 `main` 后，由 GitHub Pages 静态分支发布机制更新页面；本仓库当前没有检测到该提交触发 GitHub Actions 构建流程。

宝塔 Linux 部署时，推荐把 `zk` 目录内的文件作为网站根目录内容上传，而不是把整个 `zk` 文件夹再套一层。路径规则详见仓库根目录下的 `zk/BAOTA_DEPLOY.md`。
