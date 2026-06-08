# CSS 架构说明

本目录采用“兼容保留 + 渐进迁移”的方式重构。现有页面仍然可以继续引用旧 CSS 文件，运行时会额外加载新的核心样式层。

## 当前分层

| 路径 | 作用 |
| --- | --- |
| `core/tokens.css` | 全站设计变量，包括颜色、阴影、容器宽度、动画时长等。保留旧变量名并提供 `--zk-*` 新变量别名。 |
| `core/base.css` | 运行时安全基础层，包括视口稳定、表单字号、hero 入场兜底、无障碍动效降级。 |
| `components/runtime.css` | 由 `site-runtime.js` 生成的组件样式，例如课程挑战模块、页面转场、二维码背景、运行时品牌 logo。 |
| `nav-dropdown.css` | 统一导航、下拉菜单、移动端抽屉菜单、非首页 hero 背景。 |
| `style.css` | 历史基础样式，暂时保留，后续逐步拆入 `core/`、`components/`、`pages/`。 |
| `effects.css` | 历史视觉增强和动效样式，暂时保留，后续逐步拆分。 |
| 页面专属 CSS | 如 `about.css`、`courses.css`、`contact.css` 等，暂时保留页面局部样式。 |

## 修改规则

1. 新增颜色、阴影、间距、动画变量时，优先放入 `core/tokens.css`。
2. 新增全站基础约束时，优先放入 `core/base.css`。
3. 由 JS 生成的 DOM 结构，其样式优先放入 `components/runtime.css`，不要再写进 JS 内联 `<style>`。
4. 导航和移动端菜单继续放在 `nav-dropdown.css`，直到后续专门拆为 `components/navigation.css`。
5. 页面级特殊样式可以暂时保留在原页面 CSS，但不要继续增加 HTML 内联样式。

## 后续迁移建议

下一轮可以把 `style.css` 中的基础组件继续拆分为：

```text
core/layout.css
components/buttons.css
components/cards.css
components/footer.css
pages/home.css
```

迁移时每次只处理一个组件族，确保页面视觉稳定后再删除旧样式片段。
