const path = require('path');
const { createConfig } = require('@openedx/frontend-build');
const CopyPlugin = require('copy-webpack-plugin');

const config = createConfig('webpack-dev');

config.resolve.modules = [
  path.resolve(__dirname, './src'),
  'node_modules',
];

config.resolve.alias = {
  ...(config.resolve.alias || {}),
  'react': path.dirname(require.resolve('react/package.json')),
  'react-dom': path.dirname(require.resolve('react-dom/package.json')),
  'react/jsx-runtime': require.resolve('react/jsx-runtime'),
  'react/jsx-dev-runtime': require.resolve('react/jsx-dev-runtime'),
};

config.module.rules[0].exclude = /node_modules\/(?!(split-on-first|strict-uri-encode|@edx))/;

config.plugins.push(
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, './public/robots.txt'),
        to: path.resolve(__dirname, './dist/robots.txt'),
      },
    ],
  }),
);

module.exports = config;
