const path = require('path');
const commonConfig = require('../../../build-common-config/.eslintrc');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
  parserOptions: {
    project: path.join(__dirname, '../tsconfig.eslint.json'),
  },
  extends: [
  ],
  rules: {
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
});
