---
name: next-js
description: Developer 修改 Next.js 應用程式碼、路由、渲染或設定時，補充 Next.js 邊界規則。
---

# Next.js 技術規則

- 沿用專案採用的 App Router 結構與既有路由組裝方式；修改 route、layout 或 page 時確認直接受影響的導航與渲染行為。
- 在 Server／Client Component 邊界放置程式碼時，確認互動需求、可序列化資料與伺服器專用資源的使用位置；不為方便而擴大 Client 邊界。
- 修改資料取得、快取或重新驗證行為時，先確認既有更新與可見性要求，不自行改變資料新鮮度或授權邊界。
- 不把環境密鑰或伺服器專用邏輯放入會送到瀏覽器的程式碼。
