Encoding: UTF-8

# Agent 入口

每則使用者訊息都必須重新判斷角色與 Skill，並依下列優先序執行。角色與 Skill 可以組合，但只能形成一個任務流程，不得各自重複執行任務。

## 1. 專案角色模式

使用者在本則訊息明確且只指定一個 `角色：developer`、`角色：documenter`、`角色：tester` 或 `角色：review` 時，必須直接以 UTF-8 讀取並遵守下列專案 Workflow 入口：

`project-agent/entry.md`

- 專案角色模式優先於個人助理模式。
- 不得因目前位於專案目錄就自動進入專案角色模式。
- 不得根據任務內容或前一則訊息自行推測、沿用或改派專案角色。
- 同一則訊息指定多個專案角色時，停止專案角色工作並請使用者選定單一角色；需要多個角色的工作應分成不同任務。
- 指定的角色無效或專案入口無法讀取時，停止角色工作並回報實際問題；不得改用其他模式執行專案修改。
- 停止專案角色工作時，必須向使用者指出具體原因、發生在哪個角色欄位或入口路徑，以及可採取的下一步；不得只回覆「無法執行」或「載入失敗」。
- 只有成功讀取專案入口與對應角色規則，並輸出規則要求的進入提示後，才視為已進入專案模式。
- 同一則訊息包含 `團隊 Skills：` 或 `個人 Skills：` 時，由專案入口在角色規則之上載入指定 Skill；不得另外啟動第二套流程。

## 2. 無角色 Skill 模式

使用者未指定專案角色，但明確指定 Skill 時：

- 包含 `團隊 Skills：` 時，以 UTF-8 讀取並遵守 `project-agent/skill-entry.md`。
- 只包含 `個人 Skills：` 時，以 UTF-8 讀取並遵守 `personal-assistant/skill-entry.md`。
- 同時包含兩種 Skill 時，先載入團隊 Skill，再由團隊 Skill 入口載入個人 Skill。
- 無角色 Skill 只能依各 Skill 明確宣告的邊界執行；不得自行取得 Developer、Documenter、Tester 或 Review 權限。
- Skill 要求專案角色但使用者未指定時，停止需要該權限的工作並提示應指定的角色。

## 3. 個人助理模式

使用者未指定專案角色，且 `personal-assistant/entry.md` 存在時，必須直接以 UTF-8 讀取並遵守該入口。

- `personal-assistant/entry.md` 是個別工程師的本機設定，不是團隊共用規則。
- 個人助理模式不得自行取得 Developer、Documenter、Tester 或 Review 的專案權限。

## 4. 一般 Agent 模式

使用者未指定專案角色，且 `personal-assistant/entry.md` 不存在時，維持目前聊天環境的一般 Agent 行為。

- 個人助理入口未設定不視為錯誤。
- 一般 Agent 模式可以回答問題與進行未改變專案狀態的討論。
- 使用者明確要求時，可以修改一般說明、參考範本與未核准草案。
- 修改程式碼、依賴、執行環境或已核准的專案正式依據時，必須請使用者明確指定 `角色：developer`。
- 建立或維護專案正式文件時，必須請使用者明確指定 `角色：documenter`。
- 建立、修改或執行正式測試流程時，必須請使用者明確指定 `角色：tester`。
- 需要正式檢查變更時，必須請使用者明確指定 `角色：review`。

## Skill 指定格式

- 團隊共用 Skill：`團隊 Skills：<skill-id>`。
- 個人工具 Skill：`個人 Skills：<skill-id>`。
- 多個 Skill 使用半形逗號分隔，並依列出順序載入。
- Skill ID 只能使用 lowercase kebab-case；不得包含絕對路徑、`..` 或路徑分隔符號。
- 不得只使用未標示來源的 `Skills：`，以避免團隊與個人 Skill 同名時產生歧義。
