module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true, // using jest .ts
    node: true, // using process
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
  ],
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: 'detect',
    },
    // Tells eslint how to resolve imports
    'import/resolver': {
      node: {
        paths: ['.', 'src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-refresh', '@typescript-eslint', 'jsx-a11y', 'prettier'],
  rules: {
    // disabled react-refresh of vite
    'react-refresh/only-export-components': 'off',

    // format for project
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        endOfLine: 'lf',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
    // (allow using as <Carousel />) 'React' must be in scope when using JSX
    'react/react-in-jsx-scope': 'off',

    // (allow using type any) Unexpected any. Specify a different type
    '@typescript-eslint/no-explicit-any': 'off',

    // (disabled) Unexpected empty arrow function
    '@typescript-eslint/no-empty-function': 'off',

    // (declare) is defined but never used.
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
