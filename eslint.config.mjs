// eslint.config.mjs
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import ts from "typescript-eslint";

export default [
  // 1. ESlint의 권장 기본 규칙 (모든 파일)
  js.configs.recommended,

  // 2. TypeScript 권장 규칙
  ...ts.configs.recommended,

  // 3. Simple-import-sort 플러그인 설정
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },

  // 4. Unused-imports 플러그인 설정
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },

  // 5. Next.js 및 React 관련 규칙 설정
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "@next/next": nextPlugin,
      react: react,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...react.configs["jsx-runtime"].rules,
      // "react/prop-types": "off",
    },
  },
];
