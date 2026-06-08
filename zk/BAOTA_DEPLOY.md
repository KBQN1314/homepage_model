# 宝塔 Linux 部署说明

本文用于说明中科明心官网在宝塔 Linux 面板中部署时的目录结构、路径规则和常见问题排查。后续修改代码时，应优先考虑本说明中的部署场景。

## 一、推荐部署方式

将 `zk` 目录里面的内容上传到宝塔站点根目录，而不是把整个 `zk` 文件夹作为根目录下的一层。

推荐结构：

```text
网站根目录/
├── index.html
├── about.html
├── courses.html
├── team.html
├── cases.html
├── news.html
├── contact.html
├── join.html
├── expert/
├── cases/
├── news/
└── statics/
```

不推荐结构：

```text
网站根目录/
└── zk/
    ├── index.html
    ├── statics/
    └── ...
```

如果采用不推荐结构，页面虽然可能通过 `/zk/index.html` 打开，但后续路径、SEO、分享链接和站点根路径都更容易混乱。

## 二、路径规则

本项目是静态多页面网站，不依赖前端路由。所有页面都应使用相对路径引用资源。

一级页面示例：

```html
<script src="statics/js/main.js"></script>
```

二级页面示例：

```html
<script src="../statics/js/main.js"></script>
```

三级页面示例：

```html
<script src="../../statics/js/main.js"></script>
```

`main.js` 和 `scroll-motion.js` 会根据脚本实际引用路径自动计算当前页面层级，因此后续不要再用 `/zk/` 判断部署环境。

## 三、页面外壳规则

除首页外，大多数页面已经采用运行时统一外壳：

```html
<header id="header"></header>
...
<footer class="footer"></footer>
<div class="sticky"></div>
<script src="statics/js/main.js"></script>
```

二级、三级页面只需要根据层级调整 `main.js` 的相对路径。不要在新页面中复制整段旧导航、旧页脚或移动端菜单代码。顶部导航、底部 footer、右侧联系入口均由运行时统一生成。

首页 `index.html` 仍保留静态 header/footer 作为首屏兜底，不建议为了小改动重写整个首页。

## 四、当前内容状态

### 案例页

当前只保留 2 个真实案例：

```text
/cases/case-01.html
/cases/case-02.html
```

`case-03.html` 到 `case-08.html` 已物理删除，不应再在页面、导航、文档或外链中引用。如历史缓存或外部链接访问这些旧地址，服务器会返回 404。

### 移动端目录

移动端目录当前规则为：

```text
只显示一级菜单
点击一级菜单直接跳转
不展开二级菜单
不显示灰色遮罩
打开目录时隐藏右侧微信/联系悬浮按钮
```

如未来要恢复二级菜单，需要同时修改 `main.js`、`scroll-motion.js` 和 `nav-dropdown.css`，不要只改其中一个文件。

### 旧文案兼容

`main.js` 和 `scroll-motion.js` 中保留了旧品牌和旧“自主营（数学）”相关替换表，主要用于旧缓存或未清理页面的兜底兼容。新页面正文中不应继续写入旧品牌或旧课程名称。

## 五、宝塔 Nginx 配置建议

普通静态站点一般不需要额外反向代理。宝塔中站点根目录应指向上传后的目录，例如：

```text
/www/wwwroot/your-domain.com
```

默认首页建议包含：

```text
index.html
```

如果启用了缓存、CDN 或浏览器强缓存，修改 CSS/JS 后可能需要等待或清理缓存。

## 六、部署后检查清单

部署后建议依次检查以下页面：

```text
/
/about.html
/courses.html
/team.html
/expert/expert-02.html
/cases.html
/cases/case-01.html
/cases/case-02.html
/news.html
/news/company/company-03.html
/news/limited/limited-03.html
/contact.html
```

重点检查：

1. 左上角 logo 是否正常显示，不应放大覆盖页面。
2. 顶部导航是否横向整齐显示。
3. 课程产品、专家团队、新闻活动下拉菜单在桌面端是否默认隐藏，鼠标悬停后才显示。
4. 手机端点击目录按钮后，是否显示清晰的右侧抽屉菜单，且只显示一级菜单。
5. 二级页面和三级页面是否能正常加载样式。
6. 点击“专家团队”是否跳转到 `team.html`。
7. 自主营页面和导航中是否不再出现“自主营（数学）”。
8. 右侧微信/联系悬浮按钮是否不遮挡手机端目录。

## 七、常见问题

### 1. logo 破图或放大

通常是 `statics/images/logo.svg` 路径错误，或 header logo 样式没有加载。请确认页面中 `main.js` 的引用层级正确：

```text
一级页面：statics/js/main.js
二级页面：../statics/js/main.js
三级页面：../../statics/js/main.js
```

当前 `effects.css` 中有 logo 尺寸兜底，正常情况下 logo 不应超过 50px。

### 2. 顶部菜单全部摊开

通常是 `nav-dropdown.css` 没有加载成功。请打开浏览器开发者工具查看是否存在 404：

```text
statics/style/nav-dropdown.css
../statics/style/nav-dropdown.css
../../statics/style/nav-dropdown.css
```

### 3. 内页没有顶部导航

如果页面写的是：

```html
<header id="header"></header>
```

则需要确认 `main.js` 和运行时补丁是否正常加载。空 header 会由 `scroll-motion.js` 自动补全。

### 4. 宝塔正常，GitHub Pages 不正常，或反过来

说明代码中可能仍有绝对路径或固定环境判断。后续修改时不要写：

```text
/zk/
/expert/
/cases/
/news/
```

应使用相对路径，或通过 `main.js` / `scroll-motion.js` 的路径工具生成。

### 5. 修改后浏览器仍显示旧内容

可尝试：

```text
Ctrl + F5
无痕窗口
清理浏览器缓存
清理宝塔或 CDN 缓存
```

移动端微信、Safari 等浏览器缓存可能更顽固，必要时可给 CSS/JS 增加版本号。

## 八、后续修改约束

后续新增页面时，应遵守：

1. 页面路径尽量保持静态 HTML 结构。
2. 一级页面引用 `statics/js/main.js`，二级页面引用 `../statics/js/main.js`，三级页面引用 `../../statics/js/main.js`。
3. 不要直接写死 `/zk/`、`/expert/`、`/cases/` 等绝对路径。
4. 不要复制旧版 header/footer；优先使用运行时外壳。
5. 不要重新引入“中科心智能”“自主营（数学）”等旧文案。
