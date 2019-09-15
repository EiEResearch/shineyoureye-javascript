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
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-undef': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': [2, 180],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': [4,
      {
        singleline: 4,
        multiline: {
          max: 1,
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
        '**/__tests__/*.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
