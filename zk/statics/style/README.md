# CSS 架构说明

本目录采用“兼容保留 + 渐进迁移”的方式重构。现有页面仍然可以继续引用旧 CSS 文件，运行时会额外加载新的核心样式层。

## 当前分层

| 路径 | 作用 |
| --- | --- |
| `core/tokens.css` | 全站设计变量，包括颜色、阴影、容器宽度、动画时长等。保留旧变量名并提供 `--zk-*` 新变量别名。 |
| `core/base.css` | 运行时安全基础层，包括视口稳定、表单字号、hero 入场兜底、无障碍动效降级。 |
| `core/layout.css` | 全站可复用布局原语，包括 `.container`、`.sec`、`.sec-head`、标题说明等。 |
| `components/buttons.css` | 全站按钮体系，包括 `.btn`、`.btn-primary`、`.btn-gold`、`.btn-line`、焦点态和移动端适配。 |
| `components/chrome.css` | 站点外壳，包括 header、brand、hamburger、footer、sticky 联系入口。 |
| `components/cards.css` | 复用卡片体系，包括课程卡、新闻卡、痛点卡、案例卡、信任卡等。 |
| `components/page-heroes.css` | 非首页 hero 背景和遮罩层，统一管理内页顶部视觉。 |
| `components/runtime.css` | 由 `site-runtime.js` 生成的组件样式，例如课程挑战模块、页面转场、二维码背景、运行时品牌 logo。 |
| `components/navigation.css` | 统一导航、下拉菜单、移动端抽屉菜单。 |
| `pages/home.css` | 首页页面级样式入口，负责首页 section 样式、首页媒体资源路径和首页专属 polish。 |
| `pages/detail.css` | 课程详情页页面级样式入口，负责详情页 hero、详情布局、侧栏、CTA、关联课程等。 |
| `pages/about.css` | 关于我们页面级样式入口，负责关于我们页 hero、概览、价值卡、服务对象、愿景和 CTA。 |
| `pages/courses.css` | 课程列表页面级样式入口，负责课程页 hero、课程体系、学习路径、能力维度、服务流程和 CTA。 |
| `pages/contact.css` | 联系页面级样式入口，负责联系页 hero、联系信息、二维码、地图占位和 FAQ。 |
| `pages/join.css` | 加盟合作页面级样式入口，负责加盟页 hero、合作对象、总部支持、合作流程和表单相关结构。 |
| `pages/news.css` | 新闻活动页面级样式入口，负责新闻列表、分类页、文章详情、文章侧栏和新闻 CTA。 |
| `news.css` | 新闻页兼容 shim，临时转发到 `pages/news.css`，用于仍未批量切换的三级文章页。 |
| `style.css` | 历史基础样式，暂时保留，作为兼容层，后续逐步删除已迁移片段。 |
| `effects.css` | 历史视觉增强和动效样式，暂时保留，后续逐步拆分。 |
| 页面专属 CSS | 其他暂未迁移的页面局部样式。 |

## 加载顺序

`site-runtime.js` 负责按以下顺序注入新 CSS 层：

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

首页、详情页、关于我们页、课程列表页、联系页、加盟合作页和一级新闻列表页额外由对应 HTML 显式加载：

```text
pages/home.css
pages/detail.css
pages/about.css
pages/courses.css
pages/contact.css
pages/join.css
pages/news.css
```

该顺序遵循“变量 → 基础 → 布局 → 组件 → 页面公共视觉 → 运行时组件 → 导航交互层 → 页面专属入口”的规则。

## 修改规则

1. 新增颜色、阴影、间距、动画变量时，优先放入 `core/tokens.css`。
2. 新增全站基础约束时，优先放入 `core/base.css`。
3. 新增全站布局原语时，优先放入 `core/layout.css`。
4. 修改按钮样式，优先放入 `components/buttons.css`。
5. 修改页眉、页脚、悬浮联系入口，优先放入 `components/chrome.css`。
6. 修改复用卡片样式，优先放入 `components/cards.css`。
7. 修改内页 hero 背景和遮罩，优先放入 `components/page-heroes.css`。
8. 由 JS 生成的 DOM 结构，其样式优先放入 `components/runtime.css`，不要再写进 JS 内联 `<style>`。
9. 修改导航、下拉菜单或移动端抽屉菜单，优先放入 `components/navigation.css`。
10. 修改首页 section、首页特殊布局或首页 polish，优先放入 `pages/home.css`。
11. 修改课程详情页结构样式，优先放入 `pages/detail.css`。
12. 修改关于我们页样式，优先放入 `pages/about.css`。
13. 修改课程列表页样式，优先放入 `pages/courses.css`。
14. 修改联系页样式，优先放入 `pages/contact.css`。
15. 修改加盟合作页样式，优先放入 `pages/join.css`。
16. 修改新闻列表、分类页或文章详情页样式，优先放入 `pages/news.css`。
17. 其他页面级特殊样式可以暂时保留在原页面 CSS，但不要继续增加 HTML 内联样式。

## 后续迁移建议

下一轮可以继续处理：

```text
legacy/style.compat.css       # 将 style.css 变成真正的兼容入口
三级新闻文章页                # 逐步从 news.css shim 切换到 pages/news.css
```

迁移时每次只处理一个组件族，确保页面视觉稳定后再删除旧样式片段。
