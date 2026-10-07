# Review feature 技術 Skill 選取

Encoding: UTF-8

本文件在 `scope.md` 確認指定功能的實際技術範圍後使用。

- 既有 Developer 技術 Skill 是技術準則的單一來源；Review 依相同準則獨立重查與本功能相關的實作，不假設 Developer 已檢查通過。
- 這些 Skill 僅作唯讀檢查參考，不啟動 Developer 流程、修改權限或團隊 Skill；技術準則不能取代已核准的專案、模組及 API 需求。

## 選取方式

- 依功能實作、設定及直接使用端，取實際涉及的 App、共用套件與技術行為聯集；不因整個模組使用某技術就載入與本功能無關的 Skill。
- 以相關已核准專案技術選型為依據，對照受影響 workspace 的 `package.json`、設定與程式碼；技術資料矛盾且會改變選取或判準時，指出兩側證據後停止。
- 對表中符合的項目，以 UTF-8 完整讀取對應 `SKILL.md` 作為參考，同一檔案只讀一次並記錄名稱。
- 應參考檔案缺失或無法讀取時停止；沒有符合項目時不為湊數載入。

| 本次檢查涉及 | 參考的 Developer 技術 Skill |
| --- | --- |
| Web 前端程式或 UI 資料流 | `project-agent/roles/developer/skills/target/frontend/SKILL.md` |
| Server 後端程式、API 或資料流程 | `project-agent/roles/developer/skills/target/backend/SKILL.md` |
| TypeScript 程式或型別 | `project-agent/roles/developer/skills/language/typescript/SKILL.md` |
| Next.js 應用程式碼、路由、渲染或設定 | `project-agent/roles/developer/skills/framework/next-js/SKILL.md` |
| React 元件、JSX、Hooks、Context 或狀態資料流 | `project-agent/roles/developer/skills/framework/react/SKILL.md` |
| Tailwind utility class、樣式 CSS 或相關設定 | `project-agent/roles/developer/skills/framework/tailwind-css/SKILL.md` |
| Node.js 程式、程序行為或套件／模組設定 | `project-agent/roles/developer/skills/runtime/node-js/SKILL.md` |
| Express 路由、Middleware、HTTP request／response 或錯誤處理 | `project-agent/roles/developer/skills/framework/express/SKILL.md` |

## 將 Developer 準則用於 Review

- 只挑出與指定功能相關、可從正式文件、現有程式碼或既有證據觀察的技術要求；與本功能無關或含糊到無法核對的條目不作為發現。
- Skill 中的修改、重構、安裝、建置或測試動作不在 Review 重做；可唯讀核對結果時才核對，否則標示「未驗證」。
- 技術建議與已核准正式依據不一致時，以正式依據為準並指出適用限制；不得以 Skill 補造需求。
- 若另有明確啟用的團隊或個人 Skill，其必要要求與 Review 權限或正式依據不可同時遵守，依 `project-agent/entry.md` 停止，不以此處的「參考」邊界略過真正已啟用的 Skill。
