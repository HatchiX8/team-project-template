# 團隊 Skill 入口

Encoding: UTF-8

本入口用於未指定專案角色、但明確指定 `團隊 Skills：` 的情境。

## 載入流程

1. 解析使用者明確列出的團隊 Skill ID。
2. Skill ID 必須是 lowercase kebab-case，不得包含絕對路徑、`..` 或路徑分隔符號。
3. 依列出順序，以 UTF-8 讀取 `project-agent/skills/<skill-id>/SKILL.md`。
4. 若同時指定 `個人 Skills：`，再讀取 `personal-assistant/skill-entry.md` 並載入指定個人 Skill。
5. 全部成功載入後，向使用者提示實際載入的 Skill，再開始執行一次任務。

## 無角色邊界

- Skill 可進行問答、需求釐清、方案討論與對話中的草案產生。
- Skill 只有在自身明確允許無角色寫入時，才能修改其授權範圍內的低風險文件。
- 修改程式碼、依賴、執行環境或已核准的正式專案依據時，必須要求使用者指定 `角色：developer`。
- 正式 Review 必須要求使用者指定 `角色：review`。
- Skill 載入失敗時不得忽略、替換或猜測其他 Skill。

## 成功提示

```text
已載入團隊 Skills：<依序列出的 Skill ID>。
已載入個人 Skills：<依序列出的 Skill ID>。
```

沒有指定某一類 Skill 時，不輸出該行。
