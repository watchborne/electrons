import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      // TypeScript already validates props; this rule produces false
      // positives on destructured, non-required props (e.g. `className`).
      "react/prop-types": "off",
      "import/order": [
        "error",
        {
          groups: [["builtin", "external"], "internal", ["parent", "sibling"]],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: [],
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
    },
  },
  {
    files: ["*.config.{js,mjs,ts}", "tailwind-preset.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },
);
