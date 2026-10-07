# 專案 Agent 規則

此資料夾保存團隊共用的專案 Agent 入口與角色規則。

根目錄 `AGENTS.md` 負責判斷使用者是否明確指定專案角色、是否符合受限的 Developer 任務延續條件，以及是否符合暫行免角色修改範圍。

指定 `developer`、`documenter`、`tester` 或 `review`，或符合 Developer 任務延續時，Agent 必須進入本資料夾的 `entry.md`，再載入對應角色規則。

每則訊息只能明確指定一個專案角色。

入口驗證並分派角色；僅同一對話、同一任務且仍在已確認範圍內的 Developer 修改可不重複指定。

另一項工作、原範圍不明或要修改範圍外模組／共用能力時，須重新指定 `角色：developer` 並確認範圍。

其他角色不沿用。

目前若未指定角色與 Skill，且明確要求修改的檔案全部位於根目錄 `docs/` 或 `project-agent/`，可依 `AGENTS.md` 的暫行例外直接修改，不進入本資料夾的角色入口。

這不包含根目錄 `AGENTS.md`、程式碼或其他目錄，也不改變 Tester 與 Review 的角色要求；未來改由 Documenter 管理這兩個目錄時，須另行修改根目錄入口。

## 目錄結構

```text
project-agent/
├─ README.md
├─ entry.md
├─ skill-entry.md
├─ skills/
│  └─ api-contract/
│     └─ SKILL.md
└─ roles/
   ├─ developer/
   │  ├─ entry.md
   │  ├─ core.md
   │  ├─ restrictions.md
   │  ├─ output.md
   │  ├─ skill-selection.md
   │  ├─ validation.md
   │  ├─ skills/
   │  │  ├─ target/       # frontend、backend
   │  │  ├─ framework/    # next-js、react、express
   │  │  ├─ language/     # typescript
   │  │  └─ runtime/      # node-js
   │  └─ workflows/
   │     ├─ local-change.md
   │     ├─ general-development.md
   │     └─ development.md
   ├─ documenter/
   │  ├─ entry.md
   │  ├─ workflow.md
   │  └─ output.md
   ├─ tester/
   │  ├─ entry.md
   │  ├─ workflow.md
   │  └─ output.md
   └─ review/
      ├─ entry.md
      ├─ workflows/
      │  └─ common.md
      └─ modes/
         ├─ feature/        # entry、scope、skill-selection、review、output
         └─ module/         # entry、scope、skill-selection、review、output
```

## 目前階段

共用入口目前負責驗證：

1. 根目錄可以辨識明確指定的角色。
2. Agent 可以讀取專案模式入口。
3. Agent 可以讀取對應角色規則。
4. Agent 會在開始工作前輸出明確的進入提示；Developer 延續時改輸出延續提示。
5. 入口或角色規則讀取失敗時，Agent 會停止工作。

Developer 已建立按需載入的局部修正與一般開發分流、共用開發流程、條列式設計準則與限制、技術 Skill 選取、修改後驗證及完成／停止時的輸出規則。

分流後會提示目前採用的路線；一般開發按任務影響讀取專案、模組與 API 三層正式依據。

Review 目前已建立入口模式判定、固定分流提示與兩模式必讀的 `workflows/common.md`；須明確指定 `模式：feature` 或 `模式：module` 及對應功能／模組，缺漏或不正確時停止。

入口先讀共用規則，再讀對應分支。

兩分支都依 scope → 技術準則選取 → review → output 執行；`feature` 僅檢查單一功能及直接關聯範圍，`module` 檢查整個指定模組。

Reviewer 參考既有 Developer Skills，獨立重查可唯讀觀察的技術準則，不重跑 Developer 修改流程。

Tester 第一版依 entry → workflow → output 處理模組 API 請求測試，涵蓋狀態碼、參數傳輸與錯誤回應。

腳本放在 `apps/server/tests/api/<module>/<feature>.test.ts`；使用已核准 API 依據及可用測試環境，缺少必要工具時交 Developer 補齊。

Documenter 第一版要求明確指定 `模式：write` 或 `模式：review` 及文件對象；write 建立或調整指定文件，review 唯讀檢查矛盾、語意與可執行性。

尚無各類文件必要內容範本時，可能遺漏的內容只列補充建議或待確認事項，不判定文件完整性，也不自行核准文件。

## 使用方式

Developer：

```text
角色：developer
任務：描述要執行的開發工作。
```

Review：

```text
角色：review
模式：feature
任務：檢查帳號模組的登入功能未提交變更。
```

只寫「幫我 review」或未提供可辨識的功能／模組時，Agent 應停止並請使用者補正。

兩種模式均依已核准正式依據與現有實作執行只讀檢查；`feature` 的結論不代表整個模組通過。

Documenter：

```text
角色：documenter
模式：write
任務：描述指定文件、用途與要建立或調整的內容。
```

文件審查使用 `模式：review` 並提供指定文件；這是 Documenter 的文件審查模式，不啟動 Review 角色的程式碼檢查。

Tester：

```text
角色：tester
任務：描述要建立、執行或維護的測試。
```

首次進入後，Agent 必須先輸出對應角色入口定義的固定提示；Developer 延續時，先輸出含原任務與範圍的延續提示。

若沒有看到對應提示，工程師應停止後續操作並檢查入口是否正確載入。

例如已進入 Developer 並確認「案件模組的 Web 表單與 Server API」為修改範圍，後續直接修正該表單或 API 可延續；若改為使用者管理模組，或需修改原本未納入的共用認證，須重新指定 `角色：developer` 並確認新增範圍。

僅為確認影響而讀取其他模組不需要重新指定。

## 搭配 Skill

```text
角色：developer
團隊 Skills：api-contract
個人 Skills：testing-workflow
任務：建立 API Contract 並規劃相關測試。
```

角色、團隊 Skill 與個人 Skill 會組成同一個任務流程，不會各自重複執行任務。

Developer 角色內的技術 Skill 由 `roles/developer/skill-selection.md` 依本次修改範圍選取，不需在 Prompt 逐項列出；它們不屬於上方明確指定的團隊或個人 Skill，也不會自動觸發 `api-contract` 等團隊 Skill。
