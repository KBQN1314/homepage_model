# 中科明心官网架构说明

## 项目定位

本项目是一个静态多页面官网。为了兼容 GitHub Pages、宝塔静态部署和现有页面路径，重构后仍保留 `zk/*.html`、`zk/news/*/*.html`、`zk/expert/*.html`、`zk/cases/*.html` 等访问路径。

## 核心原则

1. 页面 HTML 只负责提供语义结构、正文内容和必要挂载点。
2. `statics/js/main.js` 只作为兼容入口和加载器，不直接承载业务逻辑。
3. 全站公共数据优先放入 `statics/js/site-data.js`；已独立拆出的列表数据放入对应 `site-*-data.js`。
4. 全站公共渲染逻辑集中放在 `statics/js/site-runtime.js`；已独立拆出的列表渲染放入对应 `site-*-runtime.js`。
5. 导航、页脚、sticky 联系入口、课程卡片、课程详情页主体内容、课程挑战模块和旧文案修正由统一运行时管理。
6. 页面不要手动重复引入 `scroll-motion.js` 或 `course-challenges.js`。
7. 新增公共样式优先进入 `statics/style/core/` 或 `statics/style/components/`，不要写入 JS 内联样式。
8. 页面级样式统一进入 `statics/style/pages/`，不要重新新增旧式临时覆盖文件。
9. `style.css` 仅作为兼容导入入口保留，不再承载实际样式规则；`effects.css` 仅作为动效层保留。
10. 页面应显式加载对应 `pages/*.css`；运行时会做页面级样式兜底加载，已存在时不会重复插入。
11. 新增或轻量页面可以只保留 `<header id="header"></header>`、`<footer class="footer"></footer>`、`<div class="sticky"></div>` 这类运行时占位，不要复制整段导航或页脚 HTML。

## 重要文件

| 文件 | 作用 |
| --- | --- |
| `statics/js/main.js` | 入口加载器，根据当前页面层级加载 `site-data.js` 与 `site-runtime.js`。 |
| `statics/js/site-data.js` | 全站品牌信息、课程列表、课程详情文案、课程挑战数据。 |
| `statics/js/site-runtime.js` | 全站运行时：导航、页脚、sticky、课程渲染、详情页渲染、动效加载、链接修正、公共与页面级样式兜底加载。 |
| `statics/js/site-cases-data.js` | 案例列表数据。当前只承接 `cases.html` 的案例卡片字段，不承接案例详情正文。 |
| `statics/js/site-cases-runtime.js` | 案例列表渲染器，根据 `ZKCaseList` 渲染 `cases.html` 的 `.cases-grid[data-case-list]`。 |
| `statics/js/site-news-data.js` | 新闻列表数据。当前承接 `news.html` 与三个新闻分类页的新闻卡片字段，不承接新闻文章正文。 |
| `statics/js/site-news-runtime.js` | 新闻列表渲染器，根据当前页面自动筛选 `ZKNewsList` 并渲染 `.news-page-grid[data-news-list]`。 |
| `statics/js/site-team-data.js` | 团队列表数据。当前承接团队总览、核心专家、助教团队的成员卡片字段，不承接专家详情正文。 |
| `statics/js/site-team-runtime.js` | 团队列表渲染器，根据当前页面筛选 `ZKTeamMembers` 并渲染 `.team-grid[data-team-list]`。 |
| `statics/js/scroll-motion.js` | 滚动入场动画与移动端菜单增强，由运行时统一加载。 |
| `statics/js/course-challenges.js` | 兼容 shim。课程挑战模块已并入 `site-runtime.js`，此文件不再负责渲染。 |
| `statics/style/core/tokens.css` | 全站设计变量。 |
| `statics/style/core/base.css` | reset、基础元素、loading、body、无障碍动效降级等基础层。 |
| `statics/style/core/layout.css` | 全站布局原语。 |
| `statics/style/components/buttons.css` | 全站按钮体系。 |
| `statics/style/components/chrome.css` | 站点外壳：header、brand、hamburger、footer、sticky 联系入口。 |
| `statics/style/components/cards.css` | 复用卡片体系。 |
| `statics/style/components/page-heroes.css` | 尚未迁入 `pages/` 的通用内页 hero 背景和遮罩。 |
| `statics/style/components/runtime.css` | 运行时生成组件样式。 |
| `statics/style/components/navigation.css` | 导航、下拉菜单和移动端菜单。 |
| `statics/style/pages/*.css` | 页面级样式入口，如首页、课程详情、关于我们、课程列表、联系、加盟、新闻、团队、案例和 utility 页面。 |
| `statics/style/team-avatars.css` | 团队头像资源层，仅维护专家/助教头像类和头像图片。 |
| `statics/style/style.css` | 历史兼容入口，通过 `@import` 聚合 core/components 层，保留稳定 URL。 |
| `statics/style/effects.css` | 全站动效入口，仅保留 hero 动效、reveal、滚动入场、页面转场和动效降级。 |
| `statics/style/README.md` | CSS 分层与迁移规则。 |

## 样式加载规则

`style.css` 作为兼容入口导入公共层：`core/tokens.css`、`core/base.css`、`core/layout.css`、`components/buttons.css`、`components/chrome.css`、`components/cards.css`、`components/page-heroes.css`、`components/runtime.css`、`components/navigation.css`。

`site-runtime.js` 会先检测页面是否已经加载 `statics/style/style.css`。正常页面已经加载时，运行时不会重复注入上述公共层；只有未来少数没有加载 `style.css` 的独立页面，才会按文件逐个兜底注入，并且会逐个检查是否已存在。

页面级 CSS 由对应 HTML 显式加载，例如 `pages/home.css`、`pages/detail.css`、`pages/about.css`、`pages/courses.css`、`pages/contact.css`、`pages/join.css`、`pages/news.css`、`pages/team.css`、`pages/cases.css`、`pages/utility.css`。`site-runtime.js` 会根据当前路由判断页面级 CSS 是否已经存在；若缺失，会补齐对应 `pages/*.css`。

## 结构模式

### 首页结构

`index.html` 采用“外壳运行时化、首页正文静态保留”的模式。导航、页脚和 sticky 由 `site-runtime.js` 统一渲染；首页 hero、痛点、课程、测评、团队、合作伙伴、新闻、加盟和联系区块仍保留在 HTML 中。

### 一级内容页结构

`about.html`、`courses.html`、`contact.html`、`join.html` 采用“外壳运行时化、正文静态保留”的模式。导航、页脚和 sticky 由 `site-runtime.js` 统一渲染；页面 hero、正文模块、表单和 CTA 等内容仍保留在 HTML 中。

### 团队列表页结构

`team.html`、`team-page-2.html`、`experts.html`、`assistants.html` 已采用“外壳运行时化、列表数据化”的模式。页面保留 hero、筛选标签、分页和 `.team-grid[data-team-list]` 挂载点；成员卡片数据来自 `statics/js/site-team-data.js`，渲染逻辑来自 `statics/js/site-team-runtime.js`。专家详情正文仍保留在 `expert/*.html` 中。

### 案例列表页结构

`cases.html` 已采用“外壳运行时化、列表数据化”的模式。页面只保留 hero、说明文案和 `.cases-grid[data-case-list]` 挂载点；案例卡片数据来自 `statics/js/site-cases-data.js`，渲染逻辑来自 `statics/js/site-cases-runtime.js`。

### 新闻列表页结构

`news.html`、`company-news.html`、`growth-news.html`、`limited-activity.html` 已采用“外壳运行时化、列表数据化”的模式。页面只保留 hero、筛选标签、分页/CTA 和 `.news-page-grid[data-news-list]` 挂载点；新闻卡片数据来自 `statics/js/site-news-data.js`，渲染逻辑来自 `statics/js/site-news-runtime.js`。新闻文章正文仍保留在三级文章 HTML 中。

### 课程详情页结构

四个课程详情页已经采用最小运行时 shell。HTML 只需要保留 `header#header`、`detail-hero`、`detail-main`、`side-card`、`detail-cta-wrap`、`footer.footer`、`div.sticky` 等运行时挂载点。课程标题、简介、标签、面包屑、课程介绍、训练路径、挑战模块、侧栏和 CTA 都由 `site-runtime.js` 根据当前文件名自动渲染。

### 专家详情页结构

专家详情页目前采用“外壳运行时化、正文静态保留”的模式。导航由 `site-runtime.js` 统一渲染；专家姓名、简介、履历、头像类名和上一篇/下一篇链接仍保留在对应 HTML 中。除非先新增专家详情数据模型和渲染函数，否则不要删除专家详情正文内容。

### 案例详情页结构

案例详情页目前采用“外壳运行时化、正文静态保留”的模式。导航、页脚和 sticky 由 `site-runtime.js` 统一渲染；案例标题、正文、指标、上下篇链接仍保留在对应 HTML 中。除非先新增案例详情数据模型和渲染函数，否则不要删除案例详情正文内容。

### 新闻文章详情页结构

新闻文章详情页目前采用“外壳运行时化、正文静态保留”的模式。导航、页脚和 sticky 由 `site-runtime.js` 统一渲染；新闻标题、正文、分类侧栏、上下篇链接、图片和图注仍保留在对应 HTML 中。除非先新增新闻文章详情数据模型和渲染函数，否则不要删除新闻文章正文内容。

## 修改规则

### 修改课程名称、价格、详情介绍

优先修改：

```text
zk/statics/js/site-data.js
```

详情页会被运行时覆盖，不要逐页重复修改。

### 修改案例列表卡片

优先修改：

```text
zk/statics/js/site-cases-data.js
```

`cases.html` 的案例卡片由该数据文件和 `site-cases-runtime.js` 渲染，不要重新把 8 个案例卡片硬编码回 HTML。

### 修改新闻列表卡片

优先修改：

```text
zk/statics/js/site-news-data.js
```

`news.html`、`company-news.html`、`growth-news.html`、`limited-activity.html` 的新闻卡片由该数据文件和 `site-news-runtime.js` 渲染，不要重新把新闻卡片硬编码回 HTML。

### 修改团队成员列表卡片

优先修改：

```text
zk/statics/js/site-team-data.js
```

`team.html`、`team-page-2.html`、`experts.html`、`assistants.html` 的成员卡片由该数据文件和 `site-team-runtime.js` 渲染，不要重新把成员卡片硬编码回 HTML。专家详情正文暂不由该数据文件渲染。

### 修改导航、页脚或 sticky 内容

优先修改：

```text
zk/statics/js/site-runtime.js
```

不要逐页修改 HTML 中的 `<nav>`、`<footer>` 或 sticky 联系入口。

### 修改全站样式变量、基础、布局和组件

优先修改：

```text
zk/statics/style/core/tokens.css
zk/statics/style/core/base.css
zk/statics/style/core/layout.css
zk/statics/style/components/buttons.css
zk/statics/style/components/chrome.css
zk/statics/style/components/cards.css
zk/statics/style/components/navigation.css
zk/statics/style/components/runtime.css
```

不要继续把这些通用样式堆回 `style.css`。

### 修改页面级样式

优先修改对应的页面入口：

```text
zk/statics/style/pages/home.css
zk/statics/style/pages/detail.css
zk/statics/style/pages/about.css
zk/statics/style/pages/courses.css
zk/statics/style/pages/contact.css
zk/statics/style/pages/join.css
zk/statics/style/pages/news.css
zk/statics/style/pages/team.css
zk/statics/style/pages/cases.css
zk/statics/style/pages/utility.css
```

已迁移页面不要重新新增或引用旧的 `home.css`、`home-polish.css`、`course-detail.css`、`about.css`、`courses.css`、`contact.css`、`join.css`、`news.css`、`team.css`、`cases.css`。

## 当前保留的兼容策略

- 现有 HTML 路径不变，避免旧链接失效。
- `course-challenges.js` 保留为 shim，避免旧缓存或旧页面引用时报错。
- `main.js` 保留原文件名，避免所有页面大规模改 script 路径。
- `style.css`、`effects.css` 保留稳定 URL，但职责已经收敛。
- 专家详情、案例详情、新闻文章正文仍静态保留，避免一次性数据化导致内容丢失。

## 后续建议

下一步可以继续把首页区块、专家详情、案例详情或新闻文章详情逐步抽入数据层。每次只处理一个内容族，确保页面视觉和内容稳定后再删除旧静态正文。
