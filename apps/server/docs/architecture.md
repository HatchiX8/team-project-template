# 後端架構

> 文件狀態：草案。本文件目前只記錄資料夾責任，不代表完整後端架構已核准。

```text
src/
├─ app.ts          # Express App 建立與共用 Middleware
├─ index.ts        # Process 啟動入口
├─ config/         # 環境變數與應用設定
├─ modules/        # 依商業功能組織的後端模組
├─ infrastructure/ # Database、Cache、Storage 與外部服務實作
└─ shared/         # 確實跨模組共用的基礎能力
```

Prisma Client 與資料庫連線放在 `infrastructure/database`；`schema.prisma` 與 Migration 預計放在 `apps/server/prisma`。

模組內的詳細分層、依賴方向與禁止事項待團隊討論後補充。
