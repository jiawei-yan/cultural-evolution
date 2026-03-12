# 人类文化演化图谱

一个基于 React、Vite、D3 和 Framer Motion 的交互式网页，用世界地图、时间轴和文明详情面板来展示人类文化从远古文明到当代全球化的演化过程。

## 功能

- 按历史篇章切换的时间轴界面
- 文化热点分布地图与交互式节点
- 时代观察、强度对比和文明线索卡片
- 侧边详情面板，展示文明特征、影响与地理信息
- 适配桌面端和移动端

## 技术栈

- React 19
- TypeScript
- Vite
- Tailwind CSS
- D3.js
- Framer Motion
- shadcn/ui

## 本地开发

```bash
npm install
npm run dev
```

构建生产版本：

```bash
npm run build
```

## GitHub Pages 发布

仓库已包含 GitHub Actions 工作流 `./.github/workflows/deploy.yml`。

发布步骤：

1. 将当前 `app/` 目录作为一个 GitHub 仓库推送到 `main` 分支。
2. 在 GitHub 仓库设置中打开 `Pages`。
3. 将 `Build and deployment` 的来源设置为 `GitHub Actions`。
4. 之后每次推送到 `main`，都会自动构建并发布站点。

## 项目结构

```text
src/
├── components/
├── data/
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```
