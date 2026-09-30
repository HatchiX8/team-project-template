# 模組文件

每個模組建立獨立目錄：

```text
docs/modules/<module-name>/
├─ overview.md
├─ flows.md
├─ data-rules.md
└─ permissions.md
```

- `overview.md`：目的、責任、邊界、主要角色、上下游與不負責事項。
- `flows.md`：正常流程、例外流程、狀態變化與跨模組互動。
- `data-rules.md`：欄位意義、驗證、唯一性、生命週期與一致性規則。
- `permissions.md`：角色權限、資料可見範圍、操作限制與拒絕情境。
