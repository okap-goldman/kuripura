module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-raw-text': 'off',
    'react-native/no-color-literals': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '*.config.js',
    '.eslintrc.js',
    'metro.config.js',
    'babel.config.js',
  ],
  env: {
    'react-native/react-native': true,
    'jest': true,
    'node': true,
  },
};
