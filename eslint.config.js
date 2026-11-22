import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["playwright-report/**", "test-results/**", "coverage/**"] },
  js.configs.recommended,
  {
    files: ["dist/**/*.js", "demo.js"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["*.config.js", "scripts/**/*.js", "tests/**/*.{js,cjs}"],
    languageOptions: { globals: globals.node },
  },
];
