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
8. 旧 `style.css`、`effects.css` 当前仅作为兼容层保留；新的公共样式应按分层文件新增或修改。

## 重要文件

| 文件 | 作用 |
| --- | --- |
| `statics/js/main.js` | 入口加载器，根据当前页面层级加载 `site-data.js` 与 `site-runtime.js`。 |
| `statics/js/site-data.js` | 全站品牌信息、课程列表、课程详情文案、课程挑战数据。 |
| `statics/js/site-runtime.js` | 全站运行时：导航、页脚、课程渲染、详情页渲染、动效加载、链接修正、运行时样式加载。 |
| `statics/js/scroll-motion.js` | 滚动入场动画与移动端菜单增强。由运行时统一加载。 |
| `statics/js/course-challenges.js` | 兼容 shim。课程挑战模块已并入 `site-runtime.js`，此文件不再负责渲染。 |
| `statics/style/core/tokens.css` | 全站设计变量，保留旧变量名并提供 `--zk-*` 新变量别名。 |
| `statics/style/core/base.css` | 运行时安全基础层：视口稳定、表单字号、动效降级等。 |
| `statics/style/core/layout.css` | 全站布局原语：`.container`、`.sec`、标题区、通用栅格/堆叠辅助类。 |
| `statics/style/components/buttons.css` | 全站按钮体系：主按钮、金色按钮、线框按钮、焦点态、移动端按钮适配。 |
| `statics/style/components/chrome.css` | 站点外壳：header、brand、hamburger、footer、sticky 联系入口。 |
| `statics/style/components/cards.css` | 复用卡片体系：课程卡、新闻卡、痛点卡、案例卡、信任卡等。 |
| `statics/style/components/page-heroes.css` | 非首页 hero 背景、遮罩和内页顶部视觉统一。 |
| `statics/style/components/runtime.css` | 运行时生成组件的样式：课程挑战、二维码背景、品牌 logo、页面转场。 |
| `statics/style/components/navigation.css` | 下拉导航、移动端菜单和导航交互状态。 |
| `statics/style/style.css` | 历史基础样式，暂时保留为兼容层，后续逐步删除已迁移片段。 |
| `statics/style/effects.css` | 历史视觉增强、动画与页脚样式，暂时保留，后续逐步拆分。 |
| `statics/style/README.md` | CSS 分层与后续迁移规则。 |

## 运行时 CSS 加载顺序

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

该顺序保证变量先加载，基础和布局其次，组件随后，页面公共视觉、运行时生成组件和导航交互样式最后接管。

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

### 修改全站样式变量

优先修改：

```text
zk/statics/style/core/tokens.css
```

颜色、阴影、容器宽度、动画时长等基础变量应集中管理。

### 修改全站布局

优先修改：

```text
zk/statics/style/core/layout.css
```

例如容器宽度、section 上下间距、标题区排版等。

### 修改按钮、站点外壳、卡片、导航

优先修改：

```text
zk/statics/style/components/buttons.css
zk/statics/style/components/chrome.css
zk/statics/style/components/cards.css
zk/statics/style/components/navigation.css
```

不要继续把这些通用样式堆回 `style.css`。

### 修改内页顶部 hero 背景

优先修改：

```text
zk/statics/style/components/page-heroes.css
```

非首页页面的顶部背景、遮罩和层级统一放在这里。

### 修改运行时生成组件样式

优先修改：

```text
zk/statics/style/components/runtime.css
```

例如课程挑战模块、页面转场层、运行时注入的品牌 logo、二维码背景等。不要再把这些样式写进 `site-runtime.js` 的内联 `<style>`。

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
- `style.css`、`effects.css` 与页面专属 CSS 暂时保留；新公共样式已逐步进入 `core/` 与 `components/`。

## 后续建议

下一轮可以继续把 `style.css` 中首页专属 section 迁入 `pages/home.css`，并把课程详情页结构统一到 `pages/detail.css`。每次迁移一个组件族，确保页面视觉稳定后再删除旧样式片段。