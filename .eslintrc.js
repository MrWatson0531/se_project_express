module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": ["warn", { allow: ["error"] }],
    "no-underscore-dangle": ["warn", { allow: ["_id", "_statusCode"] }],
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
  },
};
