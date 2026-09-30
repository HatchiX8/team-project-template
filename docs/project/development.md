# 開發指南

## 前置需求

- Node.js 20.9.0 以上版本。
- npm（隨 Node.js 安裝）。

## 安裝與啟動

```bash
npm install
npm run dev
```

`npm run dev` 會同時啟動 Web 與 Server。需要單獨啟動時，可使用 `npm run dev:web` 或 `npm run dev:server`。

## 常用指令

- `npm run dev`：同時啟動 Next.js 前端與 Express 後端。
- `npm run dev:web`：啟動 Next.js 前端。
- `npm run dev:server`：啟動 Express 後端。
- `npm run typecheck`：檢查所有 workspace 的 TypeScript 型別。
- `npm run build`：建置所有 workspace。

## 開發流程

TODO：說明從需求、文件核准、實作到 Review 的完整標準流程。
