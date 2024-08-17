// @ts-check
import globals from "globals";
import pluginJs from "@eslint/js";
import jest from "eslint-plugin-jest";
import tseslint from "typescript-eslint";

export default tseslint.config(
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    files: ["**/*.ts"],
  },
  {
    ignores: ["coverage/*", "dist/*", "*config*"],
  },
  {
    files: ["**/*.test.ts"],
    ...jest.configs["flat/recommended"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
      "jest/prefer-expect-assertions": "off",
      "jest/no-deprecated-functions":"warn"
    },
  },
);
