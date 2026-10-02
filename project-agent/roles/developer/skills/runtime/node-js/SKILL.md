---
name: node-js
description: Developer 修改 Server 的 Node.js 程式、程序行為或模組套件設定時，補充執行環境規則。
---

# Node.js 技術規則

- 依專案宣告的 Node.js 版本、package manager、lock file 與模組模式修改；不為單一需求自行升級執行環境或主要依賴。
- 維持既有 async／await、Promise、callback 與事件流程的錯誤傳遞；避免遺漏 `await` 或留下未處理的 rejection。
- 修改 listener、timer、stream、background task 或程序啟停時，確認生命週期與清理責任。
- 修改 package export、import path 或 ESM／CommonJS 邊界時，確認相關使用端；不得僅為局部修改轉換整個模組系統。
- 更新依賴時使用專案既有 package manager，不手動編修 lock file 以假裝完成安裝。
