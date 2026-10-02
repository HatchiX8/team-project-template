# Modules 規則

本文件依 `module-template` 整理，作為後端模組開發的共用規範。新模組應依此結構實作。

## 概述

每個商業功能獨立為一個模組資料夾。請求處理順序為：

`route → controller → service → repository`

模組相關型別統一定義於 `*.types.ts`。

---

## 目錄結構

```text
modules/
├─ index.ts                 # 轉 export 各模組 route，供 app.ts 引用
├─ README.md                # 本規則
└─ module-template/         # 範例模組（可複製後改名使用）
   ├─ templat.route.ts
   ├─ templat.controller.ts
   ├─ templat.service.ts
   ├─ templat.repository.ts
   └─ templat.types.ts
```

- 一個商業功能對應一個資料夾，例如 `users/`、`orders/`。
- 檔名採「模組名 + 層級」命名，例如 `users.route.ts`。
- `module-template` 僅作範本；正式功能請建立新資料夾，勿直接在範本上累積業務邏輯。

---

## 分層責任

| 檔案 | 職責 | 限制 |
|---|---|---|
| `*.route.ts` | 定義 URL、HTTP method，並對應至 controller | 不處理參數檢查、商業邏輯、資料存取 |
| `*.controller.ts` | 參數與型別檢查，呼叫 service，回傳 HTTP 回應 | 不實作商業規則，不直接呼叫 repository |
| `*.service.ts` | 商業邏輯；需存取資料時呼叫 repository | 不使用 Express `req` / `res` |
| `*.repository.ts` | 資料存取（DB / SQL） | 不實作商業判斷，不處理 HTTP |
| `*.types.ts` | 模組內共用型別 | 型別不得散落於其他檔案 |

---

## 路由掛載方式

1. 模組 `*.route.ts` 結尾須：`export default routes`
2. `modules/index.ts` 僅負責轉 export，不在此使用 `app.use` 掛載路徑
3. 實際路徑掛載於 `app.ts`

範例：

```ts
// modules/index.ts
export { default as templateRoutes } from "./module-template/templat.route.js";

// app.ts
import { templateRoutes } from "./modules/index.js";
app.use("/api/templates", templateRoutes);
```

新增模組時：於 `index.ts` 增加 export，並於 `app.ts` 掛載對應路徑。

---

## 實作約定

### controller

- 參數檢查處先保留註解：`// 檢驗參數的邏輯`
- 呼叫 service 的結果須先賦值再回傳：

```ts
const result = await service.xxx(...);
response.status(200).json({ data: result });
```

- 使用 `try/catch` 處理錯誤，失敗時呼叫 `next(error)`
- 避免過度抽象的共用 wrapper（例如另包一層 `run()`）

### service

- 每個函式各自使用 `try/catch`，不另抽共用錯誤處理函式
- 資料存取透過 repository
- 不直接使用 Express request / response

### repository

- 僅負責資料存取
- 現行範例以記憶體模擬；接入正式資料庫時，主要修改此層

### types

- 請求 body、實體等型別統一放在 `*.types.ts`

---

## 新增模組步驟

1. 複製 `module-template`，調整資料夾與檔名
2. 實作 route / controller / service / repository / types
3. 於 `modules/index.ts` 轉 export
4. 於 `app.ts` 掛載 API 路徑

---

## 檢查清單

- [ ] 具備 route、controller、service、repository、types
- [ ] route 使用 `export default routes`
- [ ] `modules/index.ts` 僅轉 export，未掛載路徑
- [ ] 路徑掛載於 `app.ts`
- [ ] controller 不直接存取資料庫
- [ ] service 不使用 `req` / `res`
- [ ] repository 不含商業邏輯
- [ ] 型別集中於 types
