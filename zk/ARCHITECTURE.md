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
| `statics/style/components/runtime.css` | 运行时生成组件的样式：课程挑战、二维码背景、品牌 logo、页面转场。 |
| `statics/style/nav-dropdown.css` | 下拉导航、移动端菜单、非首页 hero 背景，由运行时统一注入。 |
| `statics/style/style.css` | 历史基础样式，暂时保留，后续逐步拆分。 |
| `statics/style/effects.css` | 历史视觉增强、动画与页脚样式，暂时保留，后续逐步拆分。 |
| `statics/style/README.md` | CSS 分层与后续迁移规则。 |

## 修改规则

### 修改课程名称、价格、详情介绍

优先修改：

```text
zk/statics/js/site-data.js
```

不要在每个详情页里重复修改。详情页会被运行时覆盖。

### 修改导航或页脚

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
- 现有 CSS 文件名不变，避免全站一次性破坏样式引用。
- `course-challenges.js` 保留为 shim，避免旧缓存或旧页面引用时报错。
- `main.js` 保留原文件名，避免所有页面大规模改 script 路径。
- `style.css`、`effects.css` 与页面专属 CSS 暂时保留；新公共样式逐步进入 `core/` 与 `components/`。

## 后续建议

下一轮可以继续把 `style.css` 与 `effects.css` 拆为 `core/layout.css`、`components/buttons.css`、`components/cards.css`、`components/footer.css`、`pages/home.css` 等，并逐步删除页面内联 `<style>`。每次迁移一个组件族，避免一次性改动导致页面视觉回归风险。