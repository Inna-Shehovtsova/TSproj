import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


//import { FlatCompat } from "@eslint/eslintrc";
//import path from "path";
//import { fileURLToPath } from "url";

export default [
  
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {files: ["**/*.{js,mjs,cjs,ts}"],
    rules: {
      "no-unused-vars":"warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-unsafe-function-type": "warn",
    },
  },
  {files:["webpack.config.js", "jest.config.js"], 
    rules:{
      "@typescript-eslint/no-require-imports":"off",
      "no-undef":"off"
    }
  }
];