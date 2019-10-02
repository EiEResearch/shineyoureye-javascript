module.exports = {
  presets: [
    '@babel/env',
  ],
  ignore: [/node_modules/],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['module-resolver', {
      root: ['./api'],
      alias: {
        test: './test',
        underscore: 'lodash',
        '@': '../src',
        api: '../api',
        home: '../',
      },
    }],
  ],
};
