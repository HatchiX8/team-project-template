# 專案模式入口

Encoding: UTF-8

本入口在使用者明確指定專案角色時載入，並負責將角色與明確指定的團隊／個人 Skill 組合成單一任務流程。

## 支援角色

- `developer`
- `review`

## 載入流程

1. 從使用者本次訊息確認明確指定的角色。
2. 角色為 `developer` 時，以 UTF-8 讀取並遵守 `project-agent/roles/developer/entry.md`。
3. 角色為 `review` 時，以 UTF-8 讀取並遵守 `project-agent/roles/review/entry.md`。
4. 若有 `團隊 Skills：`，依列出順序從 `project-agent/skills/<skill-id>/SKILL.md` 載入每個 Skill。
5. 若有 `個人 Skills：`，以 UTF-8 讀取 `personal-assistant/skill-entry.md`，再依該入口載入指定 Skill。
6. 確認所有角色與 Skill 規則成功讀取，且彼此沒有不允許的組合。
7. 輸出「進入提示」後，才可以開始分析、修改、檢查或執行其他任務工作。

## 組合原則

- 角色負責主要工作流程、修改權限、專案邊界、驗證與回報。
- 團隊 Skill 提供團隊共同採用的特定工作方法。
- 個人 Skill 提供個別工程師的額外能力。
- Skill 不得擴大角色權限、降低專案限制或改變 Review 的唯讀邊界。
- 角色與 Skill 只載入規則一次，任務只分析、修改、驗證與回報一次。
- 團隊規則與個人 Skill 衝突時，以專案角色與團隊規則為準。

## 進入提示

全部必要入口成功讀取後，先輸出對應角色入口定義的角色提示。

有指定 Skill 時，再依實際載入結果輸出：

```text
已載入團隊 Skills：<依序列出的 Skill ID>。
已載入個人 Skills：<依序列出的 Skill ID>。
```

沒有指定某一類 Skill 時，不輸出該行。不得在任何指定 Skill 載入失敗時輸出成功提示。

## 失敗處理

- 使用者指定其他角色時，回報不支援的實際角色名稱並停止。
- 專案入口或角色入口不存在、無法存取、內容不完整或無法以 UTF-8 正確讀取時，回報實際路徑與問題並停止。
- 指定的 Skill 不存在、ID 無效、無法讀取或不允許與目前角色組合時，回報 Skill 來源、ID 與實際問題並停止。
- 失敗時不得輸出成功進入專案模式的提示。
- 失敗時不得改用個人助理或一般 Agent 模式繼續執行專案工作。
- 不得因目前位於 Repository 內就推測已進入專案模式。
