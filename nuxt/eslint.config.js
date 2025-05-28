import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import { globalIgnores } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

const compat = new FlatCompat();

export default [
  globalIgnores([
    "node_modules",
    ".output/**/*",
    ".nuxt/**/*",
  ]),
  js.configs.recommended,
  ...vue.configs["flat/recommended"],
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        defineNuxtConfig: "readonly",
        defineNuxtPlugin: "readonly",
        defineNuxtComponent: "readonly",
        useNuxtApp: "readonly",
        useRuntimeConfig: "readonly",
        useRoute: "readonly",
        useRouter: "readonly",
        useState: "readonly",
        useFetch: "readonly",
        useAsyncData: "readonly",
        useHead: "readonly",
        useSeoMeta: "readonly",
        useCookie: "readonly",
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "no-tabs": "error",
      "no-mixed-spaces-and-tabs": "error",
      "indent": ["error", 2],
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
      },
      parser: vue.parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        parser: tsParser,
        project: "./tsconfig.json",
        extraFileExtensions: [".vue"],
      },
    },
    plugins: {
      vue,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "vue/multi-word-component-names": "off",
      ...tsPlugin.configs.recommended.rules,
      "no-tabs": "error",
      "no-mixed-spaces-and-tabs": "error",
      "indent": ["error", 2],
      "vue/html-indent": ["error", 2],
      "vue/script-indent": ["error", 2]
    },
  },
  ...compat.config({
    extends: ["prettier"],
  }),
];
