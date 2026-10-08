# Git 協作規範

> 狀態：草稿

用於對齊團隊的 Git 協作方式，協助成員理解提交變更、提出 PR 與合併的約定。

## 適用範圍

團隊各專案的 Git 分支、提交、PR 與審查協作。

## Git 分支與提交規則

### 分支

| 分支 | 用途 | 合併來源 |
|---|---|---|
| `main` | 正式上線版本 | 只接受 `dev` 的 Pull Request |
| `dev` | 開發整合 | 只接受功能分支的 Pull Request |
| 功能分支 | 單一需求或修正 | 從最新的 `dev` 建立 |

- 功能分支命名為 `<類型>/<簡短英文 kebab-case>`，例如 `feat/case-list`；類型同下方 Commit 類型。
- 禁止直接推送 `main` 與 `dev`，一律經 Pull Request。
- 上線時由 `dev` 發 Pull Request 合併至 `main`。

### Commit 訊息

格式為 `<類型>(<範圍>): <中文描述>`。

| 類型 | 用途 |
|---|---|
| `feat` | 新功能 |
| `fix` | 修正錯誤 |
| `docs` | 只修改文件 |
| `refactor` | 不改變行為的程式調整 |
| `test` | 新增或修改測試 |
| `chore` | 設定、依賴或其他雜項 |

範圍為 `web`、`server` 或 `docs`，例如 `feat(server): 新增回報單建立 API`。

### Pull Request

- 目前不要求核准者，開 PR 的工程師可自行合併。
- 功能分支合併至 `dev` 使用 Squash merge，每個 Pull Request 在 `dev` 只留一筆 Commit；PR 標題即為該筆 Commit 訊息，必須符合上方格式。
- `dev` 合併至 `main` 使用一般 merge，不使用 Squash merge，避免 `dev` 與 `main` 的 Commit 歷史分岔，造成下次合併重複出現舊 Commit 或衝突。
- 測試結果依所屬專案的測試規範附在 PR 說明。

## 待確認事項

- TODO：確認 PR 說明除測試結果外，是否需要其他資訊與範例。

## 關聯文件

- [團隊工程規範](README.md)：共用規範索引。
- [版本與發布規範](versioning.md)：版本與發布約定。
