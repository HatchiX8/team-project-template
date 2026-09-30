---
name: api-contract
description: 協助團隊釐清並建立一致的 API Contract。
allow-without-role: discussion-only
write-role: developer
compatible-roles:
  - developer
  - review
---

# API Contract Skill

## 目的

協助工程師依專案文件與模組文件，整理 API 的介面、驗證、權限、錯誤與行為約定。

## 使用模式

### 未指定角色

可以進行需求釐清、逐項確認決策，以及在對話中產生草案。

不得直接建立或修改 Repository 內的正式 API Contract；需要寫入時，要求使用者指定 `角色：developer`。

### Developer

可以在工程師確認必要決策後，建立或修改 Repository 內的 API Contract，並依專案規則執行必要驗證。

### Review

只讀檢查 API Contract 與專案文件、模組文件、實作及測試是否一致，不得直接修改被檢查內容。

## 最小確認項目

建立正式 Contract 前，至少確認：

- API 目的與使用者情境。
- Endpoint 與 Method。
- 身分驗證與權限。
- Request 的來源、欄位與驗證條件。
- 成功 Response。
- 錯誤情境與 Error Code。
- 狀態變更與其他副作用。
- 尚未決定的內容。

缺少會實質改變介面或行為的必要決策時，不得自行補造正式規則。

## 來源與產出

- 優先讀取已核准的專案文件與對應模組文件。
- 正式 Contract 預設放在 `docs/api-contracts/<module-name>/<api-name>.md`。
- 文件格式應參考 `docs/templates/documentation-standard.md` 與專案 API Contract 範本。
- 產出必須由工程師確認後，才能視為正式依據。

## 邊界

- 不自行改變模組需求或權限規則。
- 不把尚未確認的建議寫成已核准決策。
- 不將 OpenAPI 視為另一份可獨立手動維護的來源。
- 不覆寫 Developer 或 Review 的角色限制。
