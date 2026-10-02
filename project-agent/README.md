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
   │  └─ entry.md
   ├─ documenter/
   │  └─ entry.md
   ├─ tester/
   │  └─ entry.md
   └─ review/
      └─ entry.md
```

## 目前階段

目前只建立最小角色流程，用來驗證：

1. 根目錄可以辨識明確指定的角色。
2. Agent 可以讀取專案模式入口。
3. Agent 可以讀取對應角色規則。
4. Agent 會在開始工作前輸出明確的進入提示。
5. 入口或角色規則讀取失敗時，Agent 會停止工作。

詳細的開發、驗證、Review 與其他團隊 Skill 規則將在後續階段逐步補充。

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
