# 個人 Skill 入口

本檔案是設定範例。複製為 `skill-entry.md` 後，將 Skill Root 改成自己的個人 Skill 目錄。

## Skill Root

`C:\path\to\your\personal-workflow\skills`

## 載入規則

1. 只載入使用者以 `個人 Skills：` 明確指定的 Skill。
2. Skill ID 必須是 lowercase kebab-case，不得包含絕對路徑、`..` 或路徑分隔符號。
3. 依列出順序，以 UTF-8 讀取 `<Skill Root>/<skill-id>/SKILL.md`。
4. 不得重新載入個人助理總入口，也不得重新判斷專案角色。
5. Skill 不得擴大目前角色權限或降低專案規則。
6. 任一 Skill 不存在、無法讀取或不允許與目前角色組合時，回報實際問題並停止。
