import path from "node:path";
import { fileURLToPath } from "node:url";

import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";
import globals from "globals";
import tseslint from "typescript-eslint";

// 以設定檔所在的專案根目錄為基準，讓從根目錄或 App 執行時都能定位 TS 設定。
const rootDir = path.dirname(fileURLToPath(import.meta.url));
// 前後端 src 中的 TypeScript／TSX 共用以下型別感知與團隊規則。
const sourceFiles = ["apps/*/src/**/*.{ts,tsx}"];

// Monorepo 共用設定：各區塊依 files 決定適用範圍，後面的設定可覆寫前面同名規則。
// error 代表違規會讓 lint 失敗；off 代表關閉該規則。
export default defineConfig([
  // 產物與框架產生的宣告不屬於手寫原始碼。
  globalIgnores([
    "**/node_modules/**", // 第三方依賴，不由本專案維護。
    "**/.next/**", // Next.js 快取、編譯產物與自動產生的型別。
    "**/dist/**", // 後端及其他套件的編譯產物。
    "**/out/**", // 靜態匯出產物。
    "**/coverage/**", // 測試覆蓋率報告。
    "**/next-env.d.ts", // Next.js 自動維護的環境型別入口。
  ]),
  {
    // Next.js／React 規則只套用 Web，不影響 Express 後端。
    files: ["apps/web/**/*.{js,mjs,cjs,ts,tsx}"],
    // 採用 Next.js Core Web Vitals 推薦組，包含 React、Hooks 與框架使用檢查。
    extends: [nextVitals],
    // 告知 Next.js lint 插件，實際應用程式位於 monorepo 的 apps/web。
    settings: { next: { rootDir: "apps/web/" } },
  },
  {
    files: sourceFiles,
    // JS recommended 檢查常見程式錯誤；TS recommendedTypeChecked 加入型別感知檢查，
    // 例如未處理的 Promise、不安全的 any 傳遞與不必要的型別斷言。
    // 整組規則由套件維護，下面 rules 只列本專案額外設定或覆寫的項目。
    extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      // 透過 TypeScript Project Service 找到各檔案的 tsconfig，提供型別資訊。
      parserOptions: { projectService: true, tsconfigRootDir: rootDir },
    },
    // 不再需要的 eslint-disable 註解也視為錯誤，避免留下過時的規則豁免。
    linterOptions: { reportUnusedDisableDirectives: "error" },
    rules: {
      // 禁止未使用的變數；以 _ 開頭的函式參數與 catch 參數可表示刻意不使用。
      // 這個例外不包含一般區域變數，未使用的區域變數仍會報錯。
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
      // 關閉原生版本，改由下方支援 TypeScript 語法的版本統一檢查，避免重複報錯。
      "no-restricted-imports": "off",
      // 檢查靜態 import 與 re-export，包含型別引用；內部引用一律使用 @/。
      // 外部套件與 node: 模組照常使用；此規則限制引用寫法，不負責設定別名解析。
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              // 禁止以點開頭的路徑（含 ./、../），也禁止路徑中用 .. 跳回父層。
              regex: "^\\.|(^|/)\\.\\.(/|$)",
              message: "禁止相對模組路徑；專案內部引用一律使用 @/，同層也不例外。",
            },
          ],
        },
      ],
      // 補上靜態 import 規則未涵蓋的語法：動態 import、require 與 import() 型別。
      // 選取器檢查可直接辨識的字串／模板前綴，不會推算執行時才組合的路徑。
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "ImportExpression > Literal.source[value=/^\\./], ImportExpression > Literal.source[value=/\\/\\.\\.\\//], ImportExpression > TemplateLiteral.source > TemplateElement[value.raw=/^\\./], CallExpression[callee.name='require'] > Literal.arguments[value=/^\\./], TSImportType Literal[value=/^\\./]",
          message: "禁止相對模組路徑；專案內部引用一律使用 @/，同層也不例外。",
        },
      ],
      "no-debugger": "error", // 禁止留下 debugger 中斷點。
      eqeqeq: ["error", "always"], // 一律使用 ===／!==，避免隱式型別轉換的比較。
    },
  },
  {
    // 宣告前端可使用的瀏覽器全域名稱，例如 window、document。
    files: ["apps/web/src/**/*.{ts,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  {
    // 宣告後端可使用的 Node.js 全域名稱，例如 process、Buffer。
    files: ["apps/server/src/**/*.ts"],
    languageOptions: { globals: globals.node },
  },
  {
    // 設定檔不在 Server 的 src tsconfig 內，採不需要型別資訊的規則。
    files: ["eslint.config.mjs", "apps/*/*.{js,mjs,cjs,ts}"],
    // 設定檔仍檢查 JS／TS 基礎錯誤，但不啟用需要 TS 專案型別資訊的推薦組。
    extends: [js.configs.recommended, tseslint.configs.recommended],
    // 建置與工具設定在 Node.js 執行，因此使用 Node.js 的全域名稱。
    languageOptions: { globals: globals.node },
  },
  // 最後套用以關閉與 Prettier 衝突的排版規則；此設定本身不會執行格式化。
  prettier,
]);
