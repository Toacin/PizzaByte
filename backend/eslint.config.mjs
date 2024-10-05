import globals from "globals";
import prettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
    plugins: {
      prettier: prettier,
    },
    rules: {
      // Add Prettier rules
      "prettier/prettier": "error",
      "linebreak-style": "off",
    },
  },
  {
    // Set global variables for browser environment (useful for front-end)
    languageOptions: {
      globals: globals.browser,
    },
  },
];
