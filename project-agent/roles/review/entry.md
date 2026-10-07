# Review 角色入口

Encoding: UTF-8

## 進入提示

成功讀取本文件，並由 `project-agent/entry.md` 完成所有指定 Skill 的載入後，在執行任務分析、檢查或指令之前，必須先向使用者輸出下列完整提示，文字不得省略或改寫：

```text
已進入專案模式：review。已成功讀取專案 Review 角色規則。
```

若本文件或任一指定 Skill 無法完整讀取，不得輸出上述提示，也不得繼續執行 Review 工作。

## 角色邊界

- Review 只讀，不得修改專案內容或建立 Review 報告檔。
- 不自動啟動 Developer、Documenter、Tester 或其他專案角色；需改碼、補文件或正式測試時，請使用者另行指定對應角色。
- 若本次有載入團隊或個人 Skill，仍不得擴大 Review 的只讀邊界；規則牴觸依 `project-agent/entry.md` 處理。

## Review 模式判定

- 輸出進入提示後，先依使用者本次訊息判定 Review 模式。
- 使用者必須明確指定下列其中一種，並提供可辨識的對象：

| 指定格式 | 對象 | 預定檢查邊界 |
| --- | --- | --- |
| `模式：feature` | 單一功能及其所屬模組 | 該功能及直接關聯範圍；不擴成整個模組 |
| `模式：module` | 單一模組 | 該模組的功能及其整合範圍；不擴成全專案 |

- 缺少 `模式：`、同時指定兩種、模式值不是 `feature` 或 `module`，或對象不足以定位時，停止並指出具體缺漏或錯誤。
- 請使用者補正；不得依路徑、變更內容或先前對話推測模式或對象。

模式與對象確認後、執行該模式的任何檢查前，依實際模式輸出下列其中一行，替換括號內容；不得省略或改寫固定文字：

```text
目前採用 Review feature 模式；對象：<功能及所屬模組>。
目前採用 Review module 模式；對象：<模組>。
```

## 規則載入與分支

輸出分流提示後：

- 先以 UTF-8 讀取並遵守 `project-agent/roles/review/workflows/common.md`。
- 再依模式以 UTF-8 讀取對應分支入口：

| 模式 | 分支入口 |
| --- | --- |
| `feature` | `project-agent/roles/review/modes/feature/entry.md` |
| `module` | `project-agent/roles/review/modes/module/entry.md` |

- 共用規則適用於兩種模式，但不替代分支的核心檢查規則。
- 任一必要檔案不存在、無法讀取、仍是 TODO，或與已載入規則有不可消解的牴觸時，停止並指出實際路徑、原因與下一步。
- 不得略過共用規則、沿用已移除的舊規則、自行補造檢查標準或宣稱 Review 完成。

- `feature` 與 `module` 均依各自入口載入正式檢查規則；兩種模式分別回報，不以單功能結果代替模組結論。
