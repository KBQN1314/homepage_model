# 中科明心官网架构说明

## 项目定位

本项目是一个静态多页面官网。为了兼容 GitHub Pages、宝塔静态部署和现有页面路径，重构后仍保留 `zk/*.html`、`zk/news/*/*.html`、`zk/expert/*.html`、`zk/cases/*.html` 等访问路径。

## 核心原则

1. 页面 HTML 只负责提供语义结构和兜底内容。
2. 全站公共数据集中放在 `statics/js/site-data.js`。
3. 全站公共渲染逻辑集中放在 `statics/js/site-runtime.js`。
4. `statics/js/main.js` 只作为兼容入口和加载器，不再直接承载业务逻辑。
5. 导航、页脚、课程卡片、课程详情页主体内容、课程挑战模块、旧文案修正都由统一运行时管理。
6. 页面不要再手动重复引入 `scroll-motion.js` 或 `course-challenges.js`。
7. 新增公共样式优先进入 `statics/style/core/` 或 `statics/style/components/`，不要再写入 JS 内联样式。
8. 页面级样式统一进入 `statics/style/pages/`，不要重新新增旧式临时覆盖文件。
9. `style.css`、`effects.css` 当前仅作为兼容层保留；新的公共样式应按分层文件新增或修改。

## 重要文件

| 文件 | 作用 |
| --- | --- |
| `statics/js/main.js` | 入口加载器，根据当前页面层级加载 `site-data.js` 与 `site-runtime.js`。 |
| `statics/js/site-data.js` | 全站品牌信息、课程列表、课程详情文案、课程挑战数据。 |
| `statics/js/site-runtime.js` | 全站运行时：导航、页脚、课程渲染、详情页渲染、动效加载、链接修正、运行时样式加载。 |
| `statics/js/scroll-motion.js` | 滚动入场动画与移动端菜单增强。由运行时统一加载。 |
| `statics/js/course-challenges.js` | 兼容 shim。课程挑战模块已并入 `site-runtime.js`，此文件不再负责渲染。 |
| `statics/style/core/tokens.css` | 全站设计变量。 |
| `statics/style/core/base.css` | 运行时安全基础层。 |
| `statics/style/core/layout.css` | 全站布局原语。 |
| `statics/style/components/buttons.css` | 全站按钮体系。 |
| `statics/style/components/chrome.css` | 站点外壳：header、brand、hamburger、footer、sticky 联系入口。 |
| `statics/style/components/cards.css` | 复用卡片体系。 |
| `statics/style/components/page-heroes.css` | 尚未迁入 `pages/` 的通用内页 hero 背景和遮罩。 |
| `statics/style/components/runtime.css` | 运行时生成组件样式。 |
| `statics/style/components/navigation.css` | 导航、下拉菜单和移动端菜单。 |
| `statics/style/pages/home.css` | 首页页面级样式入口。 |
| `statics/style/pages/detail.css` | 课程详情页页面级样式入口。 |
| `statics/style/pages/about.css` | 关于我们页面级样式入口。 |
| `statics/style/pages/courses.css` | 课程列表页面级样式入口。 |
| `statics/style/pages/contact.css` | 联系页面级样式入口。 |
| `statics/style/pages/join.css` | 加盟合作页面级样式入口。 |
| `statics/style/pages/news.css` | 新闻活动页面级样式入口，包含新闻列表、分类页和三级文章详情页。 |
| `statics/style/pages/team.css` | 团队/专家页面级样式入口，包含团队总览、专家列表、助教列表和专家详情页。 |
| `statics/style/pages/cases.css` | 案例页面级样式入口，包含案例列表、案例详情、案例图片、案例指标和案例 CTA。 |
| `statics/style/pages/utility.css` | 轻量独立页面样式入口，包含 404、隐私政策、提交成功等页面正文卡片和 CTA。 |
| `statics/style/team-avatars.css` | 团队头像资源层，仅维护专家/助教头像类和头像图片。 |
| `statics/style/style.css` | 历史基础样式，暂时保留为兼容层。 |
| `statics/style/effects.css` | 历史视觉增强和动效样式，暂时保留为兼容层。 |
| `statics/style/README.md` | CSS 分层与迁移规则。 |

## 公共 CSS 加载顺序

`site-runtime.js` 按如下顺序注入公共 CSS：

```text
core/tokens.css
core/base.css
core/layout.css
components/buttons.css
components/chrome.css
components/cards.css
components/page-heroes.css
components/runtime.css
components/navigation.css
```

页面级 CSS 由对应 HTML 显式加载，例如：

```text
pages/home.css
pages/detail.css
pages/about.css
pages/courses.css
pages/contact.css
pages/join.css
pages/news.css
pages/team.css
pages/cases.css
pages/utility.css
```

## 修改规则

### 修改课程名称、价格、详情介绍

优先修改：

```text
zk/statics/js/site-data.js
```

不要在每个详情页里重复修改。详情页会被运行时覆盖。

### 修改导航或页脚内容

优先修改：

```text
zk/statics/js/site-runtime.js
```

不要逐页修改 HTML 中的 `<nav>` 或 `<footer>`。

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

### 修改团队头像资源

优先修改：

```text
zk/statics/style/team-avatars.css
```

该文件仅维护专家/助教头像类和头像图片，不承载页面布局。

### 新增课程

1. 在 `site-data.js` 的 `courses` 中新增课程。
2. 在 `courseCopy` 中新增对应 `key` 的文案。
3. 如有详情页，在 `site-runtime.js` 的 `DETAIL_MAP` 中配置页面文件名到课程 key 的映射。

### 新增页面

1. 保留标准结构：`header.nav-wrap`、`main.main`、`footer.footer`、`script src="statics/js/main.js"`。
2. 如果页面位于二级目录，根据相对路径引用 `../statics/js/main.js`；如果位于三级目录，根据相对路径引用 `../../statics/js/main.js`。
3. 不要手动重复引用 `scroll-motion.js`，运行时会自动加载。

## 当前保留的兼容策略

- 现有 HTML 路径不变，避免旧链接失效。
- `course-challenges.js` 保留为 shim，避免旧缓存或旧页面引用时报错。
- `main.js` 保留原文件名，避免所有页面大规模改 script 路径。
- `style.css`、`effects.css` 暂时保留为历史兼容层。
- 首页、课程详情页、关于我们页、课程列表页、联系页、加盟合作页、新闻活动页、团队/专家页、案例页、轻量独立页样式迁移已完成，对应旧 CSS 入口已删除或替换。

## 后续建议

下一轮可以开始把 `style.css` 拆成真正的兼容入口，并逐步清理 `effects.css` 中已经被组件层接管的样式。每次迁移一个组件族，确保页面视觉稳定后再删除旧样式片段。
