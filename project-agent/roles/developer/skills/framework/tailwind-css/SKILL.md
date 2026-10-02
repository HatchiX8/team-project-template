---
name: tailwind-css
description: Developer 撰寫或修改 Tailwind 樣式時，使用 v4 寫法並依 class 長度或重複需求判斷是否以 @apply 簡化。
---

# Tailwind CSS 技術規則

- 新增或修改 Tailwind 樣式時，使用 Tailwind CSS v4 的語法與專案既有設定；不要引入 v3 專用寫法。需要調整入口樣式或主題時，依 v4 的 `@import "tailwindcss";`、`@theme` 等方式及現有樣式結構處理，不為套用此規則順手遷移無關檔案。
- 預設在使用處保留 utility class。只有符合以下任一條件，才評估抽到 CSS 並以 `@apply` 組合；符合條件代表可以評估，不代表必須抽出：
  1. 同一處超過 10 個 class，**且**這些 class 都屬於寫法較長的 class，導致該處明顯難以閱讀或維護。只有數量超過 10 個、但存在容易閱讀的簡短 class 時，不因數量單獨抽出。
  2. 多處需要一模一樣的視覺樣式組合，抽成一個有語意的共用 class 可以避免重複。此條件不受 10 個 class 的門檻限制。
- 評估時比較抽出前後的可讀性與維護成本；只有確實更清楚時才使用 `@apply`。避免為單次、少量且容易閱讀的 utility class 增加額外 CSS，也不要為近似但實際不同的需求強行共用樣式。
- 使用 `@apply` 時只套用目前 v4 可辨識的 utility，並確認 CSS 所在位置可存取所需主題與自訂 utility；若是 CSS module 等獨立樣式檔，依 v4 的 `@reference` 機制處理。修改後以專案可用的樣式建置驗證結果。
