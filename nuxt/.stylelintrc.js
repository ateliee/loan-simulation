export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-vue",
  ],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "layer",
        ],
      },
    ],
    "no-descending-specificity": null,
  },
};
