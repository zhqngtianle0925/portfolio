# 🚀 部署指引 — 个人介绍网站

你的网站已完成开发，只需将 `index.html` 部署到 GitHub Pages 即可获得公开访问链接。

---

## 准备工作

1. 确保你有 [GitHub](https://github.com) 账号（没有的话去注册一个，2分钟）
2. 确保你的网络可以访问 github.com（当前机器网络受限，请切换到正常网络环境操作）

---

## 方案 A：命令行部署（推荐 ⭐）

### 1. 安装 Git
- 下载地址：https://git-scm.com/downloads/win
- 安装时全部默认选项，一路 Next 即可

### 2. 打开终端（PowerShell 或 CMD），执行以下命令：

```bash
# 进入项目目录
cd C:\Users\25231\Desktop\zqh666

# 初始化 Git 仓库
git init
git add index.html
git commit -m "✨ 个人介绍网站 v1.0"

# 在 GitHub 上创建新仓库（先去 github.com → New Repository）
# 仓库名建议：portfolio 或 zqh-homepage
# 不要勾选 "Add a README file"

# 关联远程仓库（替换 YOUR_USERNAME 和 YOUR_REPO）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 3. 启用 GitHub Pages
1. 打开你的 GitHub 仓库页面
2. 点击 **Settings** → **Pages**
3. **Source** 选择 `Deploy from a branch`
4. **Branch** 选择 `main`，文件夹选 `/ (root)`
5. 点击 **Save**
6. 等待1-2分钟后，访问 `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## 方案 B：网页上传部署（无需安装任何工具）

### 1. 创建 GitHub 仓库
1. 登录 [github.com](https://github.com)
2. 点击右上角 **+** → **New repository**
3. 仓库名填写：`portfolio`
4. 选 **Public**（公开）
5. **不要勾选** "Add a README file"
6. 点击 **Create repository**

### 2. 上传文件
1. 在仓库页面点击 **uploading an existing file** 链接
2. 将 `C:\Users\25231\Desktop\zqh666\index.html` 拖拽到上传区域
3. 填写 commit message：`✨ 个人介绍网站 v1.0`
4. 点击 **Commit changes**

### 3. 启用 GitHub Pages
1. 点击 **Settings** → **Pages**
2. **Source** → `Deploy from a branch`
3. **Branch** → `main`，`/ (root)`
4. 点击 **Save**
5. 等待1-2分钟，你的网站就上线了！

---

## 🔗 最终访问地址

```
https://你的GitHub用户名.github.io/portfolio/
```

例如：`https://zqh666.github.io/portfolio/`

---

## 📝 自定义真实信息

上线后如需修改内容（邮箱、学校、微信号等），搜索以下关键词即可定位到对应位置：

| 搜索关键词 | 对应内容 |
|-----------|---------|
| `zqh_work@163.com` | 邮箱 |
| `186-2873-6617` | 电话 |
| `信息工程大学` | 学校 |
| `成都` | 城市 |
| `zqh_wechat` | 微信号（二维码内容） |
| `linkedin.com/in/zqh666` | LinkedIn |
| `github.com/zqh666` | GitHub |
| `GPA 3.6` | 绩点 |

---

## 🎨 技术亮点

- **纯 HTML/CSS/JS** — 零依赖框架，单文件部署
- **暗色科技风主题** — 终端卡片 + 渐变文字 + 网格背景
- **打字机效果** — Hero 区域多语句轮播打字
- **滚动渐显动画** — IntersectionObserver 驱动
- **导航滚动高亮** — 自动追踪当前阅读位置
- **真实二维码** — QRCode.js 库动态生成
- **返回顶部按钮** — 长页面快速导航
- **桌面端适配** — 1024px+ 完美展示
