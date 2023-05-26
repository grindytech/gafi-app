const shareConfig = {
  rules: {
    semi: 1,
    // camelcase: ['error', { ignoreImports: true }],
    'no-use-before-define': 0,
    'no-param-reassign': 1,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-noninteractive-tabindex': 1,
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.jsx'],
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'prettier/prettier': ['error'],
    // overide airbnb
    'consistent-return/prefer-default-export': 0,
    'max-classes-per-file': 0,
    'no-plusplus': 0,
    'consistent-return': 0,
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
    'import/prefer-default-export': 0,
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};

module.exports = {
  extends: [
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
  ],
  parser: '@babel/eslint-parser',
  plugins: ['jsx-a11y', 'prettier', 'only-warn', 'jest'],
  rules: shareConfig.rules,
  settings: shareConfig.settings,
  globals: {
    JSX: 'readonly',
    page: true,
    browser: true,
    jestPuppeteer: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'plugin:jsx-a11y/recommended',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'jsx-a11y', 'prettier'],
      rules: {
        ...shareConfig.rules,
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': [
          'error',
          { varsIgnorePattern: '_' },
        ],
        'no-shadow': 0,
        '@typescript-eslint/no-shadow': ['error'],
        'react/jsx-filename-extension': [
          1,
          {
            extensions: ['.tsx'],
          },
        ],
      },
      settings: {
        ...shareConfig.settings,
      },
      env: {
        browser: true,
        'jest/globals': true,
      },
    },
  ],
};
