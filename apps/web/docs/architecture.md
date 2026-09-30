# 前端架構

> 文件狀態：草案。本文件目前只記錄資料夾責任，不代表完整前端架構已核准。

```text
src/
├─ app/          # App Router、Layout、Page 與頁面組裝
├─ components/   # 跨 Feature 共用的 UI 與版面元件
├─ features/     # 依商業功能組織的前端模組
├─ lib/          # 不含商業語意的共用技術能力
├─ config/       # 應用程式執行設定
├─ store/        # Redux 與跨 Feature 全域狀態
└─ types/        # 跨 Feature 共用型別
```

只供單一路由使用的檔案優先共置在 `app` 對應 Route；屬於單一商業功能且會跨頁面使用的內容放在 `features`；跨多個 Feature 使用的內容才放入共用目錄。

詳細依賴方向與禁止事項待團隊討論後補充。
