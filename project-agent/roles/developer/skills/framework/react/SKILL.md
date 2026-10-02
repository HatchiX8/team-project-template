---
name: react
description: Developer 修改 React 元件、JSX、Hooks 或狀態資料流時，補充 React 專屬規則。
---

# React 技術規則

- 遵守 Hooks 呼叫規則；不直接修改 props 或 state，沿用 callback、setter、context 或既有 store action 傳遞變更。
- 狀態放在滿足實際共享需求的最近位置，避免不必要的全域狀態與重複來源。
- Effect 應對應明確的外部同步或副作用；不以 Effect 掩蓋可直接推導的資料流，也不為消除警告任意移除依賴。
- 共用邏輯確有重複或可讀性收益時才抽成以 `use` 開頭的 custom hook；不為抽象而抽象。
- `memo`、`useMemo` 與 `useCallback` 只在有具體效益或既有慣例要求時使用。
