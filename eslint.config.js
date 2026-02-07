const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        globalThis: "readonly",
      },
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2025,
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
  },
  {
    ignores: [
      "linter.js",
      "linter.cjs",
      "linter.min.js",
      "linter.mjs",
      "example/bundle.js",
    ],
  },
];
