# 團隊命名規範

> 狀態：草稿

整理團隊共用的命名約定，讓工程師與 Agent 使用一致的名稱格式。

## 適用範圍

團隊專案中的資料夾、檔案、Type、Schema，以及程式碼中的變數與函式。

## 命名規則

### 資料夾

- 資料夾名稱使用小駝峰（camelCase）。
- 資料夾名稱至少由兩個單字組成，例如 `caseManagement`。

### 檔案

- 檔案主名稱使用大駝峰（PascalCase）；副檔名不納入駝峰命名。
- 檔案主名稱至少由兩個單字組成，例如 `CaseService.ts`。

### Type

- Type 名稱使用大駝峰（PascalCase）。
- Type 名稱至少由兩個單字組成，例如 `CaseStatus`。

### Schema

- Schema 名稱使用底線分隔（snake_case），例如 `user_id`。
- Schema 欄位名稱使用小駝峰（camelCase），例如 `userId`。

### 變數與函式

- 變數名稱使用小駝峰（camelCase），例如 `caseCount`。
- 函式名稱使用小駝峰（camelCase），例如 `getCaseList`。

## 固定用途名稱豁免

- 工具、框架或專案結構的固定用途名稱，可以豁免上述格式與至少兩個單字的要求。
- 固定用途名稱例如 `web`、`server`、`src`、`index.ts`、`package.json`、`tsconfig.json`、`README.md` 與 `AGENTS.md`。
- 框架要求的檔名依框架約定保留，例如 Next.js 的 `page.tsx`、`layout.tsx` 與 `route.ts`。
- 自訂名稱不得僅因目前已存在，就推定為固定用途名稱。

## 關聯文件

- [團隊工程規範](README.md)：規範索引與導讀順序。
- [Agent 操作範圍](agent-operations.md)：Agent 修改邊界。
