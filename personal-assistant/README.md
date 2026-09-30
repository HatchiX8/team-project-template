# 個人助理入口

此資料夾讓每位工程師自行選擇是否在本專案串接個人的 AI 助理模式。

個人助理只處理未指定專案角色時的日常問答、討論與個人工作方式。當使用者明確指定 `角色：developer` 或 `角色：review` 時，根目錄 `AGENTS.md` 會優先進入團隊的專案 Workflow，不會載入此入口。

## 檔案用途

```text
personal-assistant/
├─ README.md          # 設定與使用說明
├─ entry.example.md   # 可提交的入口範例
├─ skill-entry.example.md # 可提交的個人 Skill 入口範例
├─ entry.md           # 個人工程師的本機助理入口，不提交版本控制
└─ skill-entry.md     # 個人工程師的本機 Skill 入口，不提交版本控制
```

`entry.md` 與 `skill-entry.md` 已加入根目錄 `.gitignore`，每位工程師可以設定不同路徑，不會將個人電腦上的絕對路徑提交成團隊設定。

## 設定方式

1. 複製 `entry.example.md` 並命名為 `entry.md`。
2. 將範例中的路徑改成自己的 AI 助理入口檔案。
3. 需要在專案角色中組合個人 Skill 時，複製 `skill-entry.example.md` 並命名為 `skill-entry.md`。
4. 將個人 Skill 根目錄改成自己的實際路徑。
5. 確認目標檔案可以使用 UTF-8 正確讀取。
6. 在未指定專案角色的情況下開始對話，確認個人助理模式是否生效。

PowerShell 範例：

```powershell
Copy-Item -LiteralPath 'personal-assistant\entry.example.md' -Destination 'personal-assistant\entry.md'
Copy-Item -LiteralPath 'personal-assistant\skill-entry.example.md' -Destination 'personal-assistant\skill-entry.md'
```

## 未設定時的行為

`personal-assistant/entry.md` 不存在時，根目錄 `AGENTS.md` 會讓目前聊天環境維持一般 Agent 行為，不會因此阻止問答或要求所有工程師設定個人助理。

## 模式優先序

```text
明確指定 developer／review
→ 團隊專案 Workflow

未指定角色 + entry.md 存在
→ 個人助理入口

未指定角色 + entry.md 不存在
→ 聊天環境的一般 Agent
```

## 使用邊界

- 個人助理入口不得覆寫團隊專案角色的規則與限制。
- 個人助理模式不得因目前位於 Repository 內就自行修改專案。
- 需要修改專案內容時，請在任務中明確指定 `角色：developer`。
- 需要正式 Review 時，請在任務中明確指定 `角色：review`。
- 個人入口無法讀取時，應回報實際路徑與問題，不得猜測其他入口。
- 專案角色載入個人 Skill 時只讀取 `skill-entry.md`，不得重新啟動完整個人助理入口。
