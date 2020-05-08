module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-undef': 'off',
    'max-len': [2, 180],
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
    }],
    'linebreak-style': [2, 'unix'],
    'vue/singleline-html-element-content-newline': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': [2, { allowAfterThis: true }],
    'vue/max-attributes-per-line': [2,
      {
        singleline: 3,
        multiline: {
          max: 2,
          allowFirstLine: true,
        },
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: [
        'public/**/*.{j,t}s?(x)',
        'dist/**/*.{j,t}s?(x)',
        '**/__tests__/*.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
