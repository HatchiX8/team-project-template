# 系統架構

## 系統概覽

- `apps/web`：TypeScript + Next.js 前端。
- `apps/server`：TypeScript + Node.js + Express 後端。
- `packages`：責任明確且具有公開介面的跨 App 共用套件。

## 服務責任

- Web 負責使用者介面與前端互動。
- Server 負責 HTTP API 與伺服器端流程。
- App 不得直接引用另一個 App 的內部實作。

## 依賴方向

TODO：說明允許與禁止的依賴方向。

## 部署單位

TODO：列出可獨立建置與部署的單位。

## 技術邊界

TODO：記錄不得由實作者或 Agent 自行推測的重要限制。
