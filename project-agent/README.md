# 專案 Agent 規則

此資料夾保存團隊共用的專案 Agent 入口與角色規則。

根目錄 `AGENTS.md` 只負責判斷使用者是否明確指定專案角色。指定 `developer`、`documenter`、`tester` 或 `review` 時，Agent 必須進入本資料夾的 `entry.md`，再載入對應角色規則。

每則訊息只能明確指定一個專案角色。入口驗證並分派角色，不依任務內容或前一則訊息自行選擇角色；分派後由角色規則確認任務權限與所需依據。

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
   │  └─ entry.md
   ├─ tester/
   │  └─ entry.md
   └─ review/
      └─ entry.md
```

## 目前階段

共用入口目前負責驗證：

1. 根目錄可以辨識明確指定的角色。
2. Agent 可以讀取專案模式入口。
3. Agent 可以讀取對應角色規則。
4. Agent 會在開始工作前輸出明確的進入提示。
5. 入口或角色規則讀取失敗時，Agent 會停止工作。

Developer 已建立按需載入的局部修正與一般開發分流、共用開發流程、條列式設計準則與限制、技術 Skill 選取、修改後驗證及完成／停止時的輸出規則。分流後會提示目前採用的路線；一般開發按任務影響讀取專案、模組與 API 三層正式依據。其他角色的詳細流程與團隊 Skill 規則將在後續階段逐步補充。

## 使用方式

Developer：

```text
角色：developer
任務：描述要執行的開發工作。
```

Review：

```text
角色：review
任務：描述要檢查的範圍。
```

Documenter：

```text
角色：documenter
任務：描述要建立或維護的文件。
```

Tester：

```text
角色：tester
任務：描述要建立、執行或維護的測試。
```

正常進入後，Agent 必須先輸出對應角色入口定義的固定提示。若沒有看到提示，工程師應停止後續操作並檢查入口是否正確載入。

## 搭配 Skill

```text
角色：developer
團隊 Skills：api-contract
個人 Skills：testing-workflow
任務：建立 API Contract 並規劃相關測試。
```

角色、團隊 Skill 與個人 Skill 會組成同一個任務流程，不會各自重複執行任務。

Developer 角色內的技術 Skill 由 `roles/developer/skill-selection.md` 依本次修改範圍選取，不需在 Prompt 逐項列出；它們不屬於上方明確指定的團隊或個人 Skill，也不會自動觸發 `api-contract` 等團隊 Skill。
