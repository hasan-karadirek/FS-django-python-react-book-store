module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime", // Add this if you're using React 17+ for the new JSX transform
  ],
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    project: "./tsconfig.json", // Specify the TypeScript config file (optional but recommended for type-aware linting)
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Apply overrides to TypeScript files
    },
  ],
  plugins: [
    "react",
    "@typescript-eslint", // Use TypeScript plugin
  ],
  rules: {
    quotes: ["error", "double"],
    "no-console": "error",
    // You can add or override TypeScript-specific rules here
    "@typescript-eslint/no-unused-vars": "warn", // Example rule
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the React version
    },
  },
};
