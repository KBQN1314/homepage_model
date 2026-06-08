# CSS 架构说明

本目录已经完成主要样式分层重构。公共样式进入 `core/` 与 `components/`，页面级样式进入 `pages/`，历史入口 `style.css` 与 `effects.css` 仅作为稳定 URL 和动效入口保留。

## 当前分层

| 路径 | 作用 |
| --- | --- |
| `core/tokens.css` | 全站设计变量，包括颜色、阴影、容器宽度、动画时长等。保留旧变量名并提供 `--zk-*` 新变量别名。 |
| `core/base.css` | 全站基础层，包括 reset、body、链接、图片、loading、表单字号、hero 入场兜底、无障碍动效降级。 |
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
| `pages/team.css` | 团队/专家页面级样式入口，负责团队页 hero、成员卡、分页、专家详情、团队 CTA 等结构。 |
| `pages/cases.css` | 案例页面级样式入口，负责案例列表、案例详情、案例图片、案例指标、案例 CTA 等结构。 |
| `pages/utility.css` | 轻量独立页面样式入口，负责 404、提交成功、隐私政策等页面的正文卡片和 CTA。 |
| `team-avatars.css` | 团队头像资源层，专门维护专家/助教头像类和头像图片，不承载页面布局。 |
| `style.css` | 历史兼容入口，仅通过 `@import` 聚合 core/components 层，保留该文件名以兼容现有 HTML。 |
| `effects.css` | 全站动效入口，仅保留 hero 动效、reveal、滚动入场、页面转场和动效降级。 |

## 加载顺序

`style.css` 作为兼容入口会同步导入以下公共层：

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

`site-runtime.js` 会先检测页面是否已经加载 `statics/style/style.css`。正常页面已经加载时，运行时不会重复注入上述公共层；只有未来少数没有加载 `style.css` 的独立页面，才会按文件逐个兜底注入，并且会逐个检查是否已存在。

页面级 CSS 由对应 HTML 显式加载：

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

1. 新增颜色、阴影、间距、动画变量时，优先放入 `core/tokens.css`。
2. 新增全站 reset、body、loading、基础元素约束时，优先放入 `core/base.css`。
3. 新增全站布局原语时，优先放入 `core/layout.css`。
4. 修改按钮样式，优先放入 `components/buttons.css`。
5. 修改页眉、页脚、悬浮联系入口，优先放入 `components/chrome.css`。
6. 修改复用卡片样式，优先放入 `components/cards.css`。
7. 修改内页 hero 背景和遮罩，优先放入 `components/page-heroes.css`。
8. 由 JS 生成的 DOM 结构，其样式优先放入 `components/runtime.css`，不要再写进 JS 内联 `<style>`。
9. 修改导航、下拉菜单或移动端抽屉菜单，优先放入 `components/navigation.css`。
10. 修改页面级特殊样式，优先放入对应的 `pages/*.css`。
11. 修改专家或助教头像资源，优先放入 `team-avatars.css`。
12. 修改纯动效、滚动入场或页面转场动画时，优先放入 `effects.css`。
13. 不要继续向 `style.css` 增加实际样式规则；它只保留兼容导入职责。

## 已迁移的旧入口

以下旧 CSS 入口已迁移并删除，后续不要重新引用：

```text
home.css
home-polish.css
course-detail.css
about.css
courses.css
contact.css
join.css
news.css
team.css
cases.css
nav-dropdown.css
```

迁移新页面时，每次只处理一个页面族，确保页面视觉稳定后再删除旧样式片段。
