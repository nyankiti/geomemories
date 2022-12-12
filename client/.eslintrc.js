module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    // useEffectの依存配列のルールはoffにする
    "react-hooks/exhaustive-deps": "off",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  ignorePatterns: [
    ".eslintrc.js",
    "next.config.js",
    "tailwind.config.js",
    "tsconfig.json",
  ],
};
