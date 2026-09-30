# 環境設定

## 環境列表

| 環境 | 用途 | 可提交範例 |
|---|---|---|
| Development | 工程師本機開發與整合 | `apps/<app>/.env.development.example` |
| Test | 自動化測試與測試環境 | `apps/<app>/.env.test.example` |
| Production | 正式部署 | `apps/<app>/.env.production.example` |

環境變數跟隨可獨立建置與部署的 App 保存。Web 與 Server 各自維護三種環境範例，不在 Monorepo 根目錄共用執行環境檔。

## Runtime 與 Port

- Web：Node.js 20.9.0 以上，Next.js 預設使用 `3000`。
- Server：Node.js 20.9.0 以上，Express 預設使用 `3001`。

## 環境變數

| 變數 | 適用端 | 用途 | 是否可公開 |
|---|---|---|---|
| `NODE_ENV` | 共用 | 識別 Development、Test 或 Production | 是 |
| `PORT` | Server | Express HTTP Port；未設定時使用 `3001` | 是 |
| `NEXT_PUBLIC_API_BASE_URL` | Web | 瀏覽器呼叫 API 的公開 Base URL | 是 |

新增變數時，需記錄名稱、用途、必要性與預設行為；不得填入真實 Secret。

名稱以 `NEXT_PUBLIC_` 開頭的變數會暴露至瀏覽器，不得存放 Token、密碼、Private Key 或其他 Secret。

## 建立本機環境檔

進入對應 App 後，依照使用環境複製範例：

```powershell
Copy-Item -LiteralPath 'apps\web\.env.development.example' -Destination 'apps\web\.env.development'
Copy-Item -LiteralPath 'apps\server\.env.development.example' -Destination 'apps\server\.env.development'
```

測試與正式環境使用相同方式，將檔名中的 `development` 改成 `test` 或 `production`。實際 `.env` 檔在任何 App 層級均由 `.gitignore` 排除，不得提交至 Git。

## Secret 管理

- Repository 只提交各 App 的 `.env.*.example`，範例不得包含真實憑證。
- Development Secret 只保留在工程師本機的實際 `.env`。
- Test 與 Production Secret 應由 CI/CD 或部署環境注入。
- 新增環境變數時，三種範例與本文件必須同步更新。
- Production 範例中的網址與值只作為 placeholder，上線前必須由部署設定取代。

## 目前限制

Next.js 可以依執行環境從 `apps/web` 載入對應環境檔。Server 目前只直接讀取 `process.env`，尚未建立 `apps/server` 內 `.env` 的載入與驗證機制；實際載入方式需在後端啟動流程確認後決定。
