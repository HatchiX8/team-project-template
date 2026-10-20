# 團隊 Skills

此目錄保存由團隊共同維護、會影響共同工作方式或正式專案產出的 Skill。

每個 Skill 使用獨立目錄：

```text
project-agent/skills/<skill-id>/SKILL.md
```

Skill ID 必須使用 lowercase kebab-case。

## 適合放入團隊 Skill 的能力

- 產生專案文件、模組文件或 API Contract。
- 產生 OpenAPI 或其他共同衍生物。
- 建立團隊約定的模組骨架。
- 執行共同測試、驗證或證據整理流程。
- 其他需要所有工程師採用一致方法的工作。

個人偏好、實驗性方法或只有單一工程師使用的能力，應保留在個人 Skill，不應直接複製到本目錄。

## 最小必要聲明

每個 `SKILL.md` 至少應說明：

- Skill 目的與適用範圍。
- 是否允許無角色使用。
- 無角色時可執行的行為。
- 正式寫入需要哪個角色。
- 需要讀取的專案來源文件。
- 產出位置與人工確認要求。
- 可與哪些角色組合。

Skill 只能補充角色能力，不得擴大角色權限或降低專案限制。

## 可用 Skills

| Skill | 用途 | 可組合角色 |
| --- | --- | --- |
| [api-contract] | 釐清與建立 API Contract | developer、review |
| [document-decisions] | 分析文件衝突與盲點，逐題決策後依授權統一修訂 | documenter |
| [requirement-analysis] | 新模組開發前唯讀分析需求與決策，在聊天室交付供 Developer 直接使用的通用工作包 | developer（分析階段唯讀） |
| [environment-readiness] | 判斷專案階段、比對環境配置與技術選型，逐項整備並在每步完成後停下供工程師檢視 | developer、documenter（依步驟分開使用） |

搭配 `角色：documenter`、`團隊 Skills：document-decisions` 與文件範圍時，依 Skill 預設流程分析、逐題決策並統一修訂；明確限定不修改或無角色使用時維持唯讀。預設讀者、檢查重點與完整呼叫範例見 Skill 本文，不需每次重複指定。

[api-contract]: api-contract/SKILL.md
[document-decisions]: document-decisions/SKILL.md
[requirement-analysis]: requirement-analysis/SKILL.md
[environment-readiness]: environment-readiness/SKILL.md
