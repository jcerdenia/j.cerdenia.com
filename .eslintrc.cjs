module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["prettier", "simple-import-sort", "sort-keys-fix"],
  rules: {
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0,
    "lines-between-class-members": 0,
    "no-console": 0,
    "prettier/prettier": "error",
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
    "sort-keys-fix/sort-keys-fix": "error",
  },
};
