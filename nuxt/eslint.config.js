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
    files: ["**/*.ts", "**/*.tsx", "**/*.d.ts"],
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
        definePageMeta: "readonly",
        PageMeta: "readonly",
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: ".",
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
      "@typescript-eslint/no-empty-interface": "off",
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
        ref: "readonly",
        computed: "readonly",
        watch: "readonly",
        watchEffect: "readonly",
        onMounted: "readonly",
        onUnmounted: "readonly",
        nextTick: "readonly",
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
        definePageMeta: "readonly",
        PageMeta: "readonly",
      },
      parser: vue.parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        parser: tsParser,
        project: "./tsconfig.json",
        tsconfigRootDir: ".",
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
      "vue/script-indent": ["error", 2],
      "@typescript-eslint/no-empty-interface": "off",
    },
  },
  ...compat.config({
    extends: ["prettier"],
  }),
];
