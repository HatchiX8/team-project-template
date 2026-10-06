# Review module 技術 Skill 選取

Encoding: UTF-8

本文件在 `scope.md` 確認實際技術範圍後使用。

- 既有 Developer 技術 Skill 是技術準則的單一來源，Review 依相同準則**獨立重查實作**，避免只依賴 Developer 自查。
- 這些檔案在本流程中只作檢查參考，不作為 Review 的執行 Skill；不啟動 Developer 流程、修改權限或 `project-agent/skills/` 的團隊 Skill。
- 技術準則不能取代已核准專案／模組／API 文件，也不能補造缺少的需求。

## 選取方式

- 依已定位的程式碼、設定及直接使用端，取實際涉及的 App、共用套件與技術行為聯集。
- 以相關已核准專案技術選型為依據，對照受影響 workspace 的 `package.json`、設定及程式碼；不因套件列在 `package.json` 就參考所有 Skill。
- 技術資料矛盾且會改變選取或檢查判準時，指出兩側證據並停止；不得靜默擇一。
- 對表中符合的項目，以 UTF-8 完整讀取對應 `SKILL.md` 作為參考；同一檔案只讀一次，並記錄實際參考的名稱。
- 應參考的檔案缺失或無法讀取時停止；沒有符合項目時不為湊數載入。

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

- 逐條挑出與本次模組相關、可從正式文件、現有程式碼或既有證據觀察的技術要求，作為 Review 核對項；不因 Developer 曾使用該 Skill 就假設實作已符合。
- Skill 中要求修改、重構、安裝、建置或測試的動作，不在 Review 重做。若可從現有結果檢查其技術目標，就核對結果；否則標示「未驗證」，不得聲稱該動作已執行或通過。
- 與本次實作無關的條目不作為發現；含糊到無法形成可核對標準的條目，不以主觀偏好判定違規。
- 技術建議與已核准正式依據不一致時，以正式依據為準並指出適用限制，不自行修改正式文件。
- 若本次另有明確啟用的團隊或個人 Skill，其必要要求與 Review 權限或正式依據不可同時遵守時，依 `project-agent/entry.md` 停止；不得把此處的「參考」邊界用來略過真正已啟用的 Skill 要求。
