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

## 三、宝塔 Nginx 配置建议

普通静态站点一般不需要额外反向代理。宝塔中站点根目录应指向上传后的目录，例如：

```text
/www/wwwroot/your-domain.com
```

默认首页建议包含：

```text
index.html
```

如果启用了缓存、CDN 或浏览器强缓存，修改 CSS/JS 后可能需要等待或清理缓存。

## 四、部署后检查清单

部署后建议依次检查以下页面：

```text
/
/about.html
/courses.html
/team.html
/expert/expert-02.html
/cases/case-01.html
/news.html
/news/company/company-03.html
/news/limited/limited-03.html
/contact.html
```

重点检查：

1. 左上角 logo 是否正常显示。
2. 顶部导航是否横向整齐显示。
3. 课程产品、专家团队、新闻活动下拉菜单是否默认隐藏，鼠标悬停或移动端点击后才显示。
4. 二级页面和三级页面是否能正常加载样式。
5. 点击“专家团队”是否跳转到 `team.html`。
6. 自主营页面和导航中是否不再出现“自主营（数学）”。
7. 手机端点击目录按钮后，是否显示清晰的右侧抽屉菜单。

## 五、常见问题

### 1. logo 破图

通常是 `statics/images/logo.svg` 路径错误。请确认页面中 `main.js` 的引用层级正确：

```text
一级页面：statics/js/main.js
二级页面：../statics/js/main.js
三级页面：../../statics/js/main.js
```

### 2. 顶部菜单全部摊开

通常是 `nav-dropdown.css` 没有加载成功。请打开浏览器开发者工具查看是否存在 404：

```text
statics/style/nav-dropdown.css
../statics/style/nav-dropdown.css
../../statics/style/nav-dropdown.css
```

### 3. 宝塔正常，GitHub Pages 不正常，或反过来

说明代码中可能仍有绝对路径或固定环境判断。后续修改时不要写：

```text
/zk/
/expert/
/cases/
/news/
```

应使用相对路径，或通过 `main.js` / `scroll-motion.js` 的路径工具生成。

### 4. 修改后浏览器仍显示旧内容

可尝试：

```text
Ctrl + F5
无痕窗口
清理浏览器缓存
清理宝塔或 CDN 缓存
```

移动端微信、Safari 等浏览器缓存可能更顽固，必要时可给 CSS/JS 增加版本号。

## 六、后续修改约束

后续新增页面时，应遵守：

1. 页面路径尽量保持静态 HTML 结构。
2. 一级页面引用 `statics/js/main.js`。
3. 二级页面引用 `../statics/js/main.js`。
4. 三级页面引用 `../../statics/js/main.js`。
5. 不新增 `/zk/` 作为路径判断条件。
6. 不在每个页面复制复杂导航逻辑，导航和补丁逻辑优先交给 `main.js` 与 `scroll-motion.js`。

