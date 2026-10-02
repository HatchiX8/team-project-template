---
name: typescript
description: Developer 修改 TypeScript 程式或型別時，補充型別邊界與使用端檢查規則。
---

# TypeScript 技術規則

- Function 邊界、跨模組資料與重要 payload 應有可追蹤的型別；沿用專案既有的 type、interface 與命名慣例。
- API DTO、狀態、事件、callback 與外部服務資料的型別應對應實際 Contract 與執行期行為；型別宣告不能代替外部輸入驗證。
- 不以無理由的 `any` 或型別斷言掩蓋尚未確認的資料結構；必要時說明具體邊界。
- 修改匯出型別或共用型別前，查找相關引用與使用端，確認編譯期與執行期行為仍一致。
