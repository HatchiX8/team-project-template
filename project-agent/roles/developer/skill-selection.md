# Developer 技術 Skill 選取

Encoding: UTF-8

本文件只在 Developer 修改任務的分流規則載入時使用；唯讀分析不預載技術 Skill。這些 Skill 是 Developer 角色內的技術補充規則，不是 `project-agent/skills/` 的團隊 Skill，也不取代使用者以 `團隊 Skills：` 或 `個人 Skills：` 明確指定的 Skill。不得由技術選取自行觸發 `api-contract` 等團隊 Skill。

## 選取方式

1. 依任務、預計修改的位置及相關使用端，確認本次涉及的 App、共用套件與技術行為。跨 Web／Server 時取所有受影響範圍的聯集；同一 Skill 只讀一次。不得只因依賴列在 `package.json` 就載入所有 Skill。
2. 以 `docs/project/` 中與任務相關的已核准技術選型為正式依據，並以受影響 workspace 的 `package.json`、設定與原始碼核對實際技術。`package.json` 的精確版本不另抄入路由表。技術資料若互相矛盾且會改變 Skill 選取或實作方式，依 `entry.md` 停止並回報；不得靜默擇一。
3. 對下表每個符合的條件，於修改前以 UTF-8 讀取對應 `SKILL.md`。表中只登記目前存在的 Developer 技術 Skill，不是專案技術清單；未列出的技術不得猜測 Skill 路徑或借用其他角色規則。已選 Skill 缺失或無法讀取時，依 `entry.md` 停止。沒有符合條件的技術 Skill 時，依角色規則與正式依據工作，不為湊數載入。

| 條件 | Developer 技術 Skill |
| --- | --- |
| 修改 `apps/web` 的前端程式或 UI 資料流 | `skills/target/frontend/SKILL.md` |
| 修改 `apps/server` 的後端程式、API 或資料流程 | `skills/target/backend/SKILL.md` |
| 修改 TypeScript 程式或型別（含兩個 App 或共用套件） | `skills/language/typescript/SKILL.md` |
| 修改 `apps/web` 的 Next.js 應用程式碼、路由、渲染或設定 | `skills/framework/next-js/SKILL.md` |
| 修改 React 元件、JSX、Hooks、Context 或 React 狀態資料流 | `skills/framework/react/SKILL.md` |
| 撰寫或修改 Tailwind utility class、Tailwind 樣式 CSS 或相關設定 | `skills/framework/tailwind-css/SKILL.md` |
| 修改 `apps/server` 的 Node.js 程式、程序行為或套件／模組設定 | `skills/runtime/node-js/SKILL.md` |
| 修改 Express 路由、Middleware、HTTP request／response 或錯誤處理 | `skills/framework/express/SKILL.md` |

表內路徑均以 `project-agent/roles/developer/` 為基準。若只改文件、命名或其他不涉及對應技術行為的內容，不因檔案位於某個 App 就強制載入該 App 全部 Skill。若技術 Skill 的通用建議與已核准專案／模組／API 依據衝突，以正式依據及 Developer 角色限制為準；不得用 Skill 補造缺少的正式決策。

所有選定的技術 Skill 讀取完成後、修改前，依 `project-agent/entry.md` 的組合原則檢查其必要步驟與 Developer Workflow、權限、專案限制、正式依據及本次其他必要 Skill 能否同時遵守。不可消解的牴觸依該入口的失敗處理停止，不得只因技術 Skill 較晚載入就覆蓋先前規則；工作中補讀 Skill 時亦同。

選取完成後，若有載入技術 Skill，修改前向使用者列出實際載入的 Skill 名稱，方便核對跨 App 任務是否遺漏；這不是另一套任務流程，也不得冒稱已載入團隊或個人 Skill。例如同時修改 Web 表單與 Server 的 Express API，應合併 frontend、next-js、react、backend、node-js、express、typescript，並依影響讀取相關 API Contract。

工作中發現新的受影響 App、使用端或技術行為時，先返回 `entry.md` 的分流與正式依據檢查，重新取聯集並補讀新增的 Skill，完成前置檢查後才修改新範圍。不得因原先已選 Skill 而忽略擴大的影響。
