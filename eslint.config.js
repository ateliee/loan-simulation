import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier/flat";

export default [
  js.configs.recommended,
  vue.configs["vue3-recommended"],
  prettier,
  {
    ignores: ["node_modules", ".output", ".nuxt"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
      },
    },
    plugins: { vue },
    rules: {},
  },
]; 