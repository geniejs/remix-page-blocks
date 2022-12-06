module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  rules: {
    "no-console": "warn",
    "import/first": "off",
    "@typescript-eslint/consistent-type-imports": "off",
  },
};
