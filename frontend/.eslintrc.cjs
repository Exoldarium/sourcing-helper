module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', "vite.config.ts", "tailwind.config.js"],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "@typescript-eslint"],
  parserOptions: {
    "project": "**/tsconfig.json"
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        "checksVoidReturn": {
          "arguments": false
        }
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_"
      }
    ],
    "no-case-declarations": "off"
  },
}
