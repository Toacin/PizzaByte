import globals from "globals";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react"; // Import React plugin

export default [
  {
    files: ["**/*.js", "**/*.jsx"], // Include JS and JSX files
    languageOptions: {
      sourceType: "module", // Use ES modules
      ecmaVersion: 2021, // Use modern JavaScript syntax
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
    plugins: {
      prettier: prettier,
      react: react, // Add React plugin
    },
    rules: {
      "prettier/prettier": "error", // Enable Prettier integration
      "linebreak-style": "off", // Disable linebreak errors
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
  },
  {
    languageOptions: {
      globals: globals.browser, // Add browser globals (window, document, etc.)
    },
  },
];