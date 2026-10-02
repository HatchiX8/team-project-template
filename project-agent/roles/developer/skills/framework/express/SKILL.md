---
name: express
description: Developer 修改 Express 路由、Middleware、HTTP 處理或錯誤流程時，補充 Express 專屬規則。
---

# Express 技術規則

- 維持既有路由註冊、Middleware 與錯誤處理順序；新增 Middleware 時確認作用範圍與對既有路由的影響。
- Route／Middleware 負責 HTTP 邊界、輸入驗證與轉交處理；商業決策與資料存取依已核准專案分層及現有模式安置。
- Request 的 params、query、body 與已驗證身分不得僅憑 TypeScript 型別視為可信；驗證失敗須依 API Contract 回傳可辨識的錯誤。
- 不將內部例外、stack trace、路徑或敏感設定直接回傳；主要處理失敗不得回報成功。
- 變更 HTTP method、path、status、response 或錯誤格式時，先確認對應 API Contract 與呼叫端。
