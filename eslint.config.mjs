import globals from "globals";
import pluginJs from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

import tseslint from "typescript-eslint";
//import jest from "eslint-plugin-jest";
// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});
export default tseslint.config(
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    files: ["**/*.ts"],
    rules: {
      //"no-unused-vars":"warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-unsafe-function-type": "warn",
    },
  },
  {
    ignores: ["coverage/*", "dist/*", "*config*"],
  },
  //{
  //  files: ["**/*.test.ts"],
  //  ...jest.configs["flat/recommended"],
  //   rules: {
  //    ...jest.configs["flat/recommended"].rules,
  //    "jest/prefer-expect-assertions": "off"
  //  },
  // },
);
