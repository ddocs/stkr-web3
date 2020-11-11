const resolveFrom = require('resolve-from');

const { resolve } = require('path');

/*

! WARNING !
Storybook need `babel-loader` to be available at the top level of node_modules
While CRA(react-scripts) has an own version, and would not start the application in
case of version miss match

Please check that `babel-loader` version in top `package.json` is fixed, and equal to
node_modules/react-scripts/node_modules/babel-loader
(if this path does not exists, then versions are equal)

 */

module.exports = {
  stories: ['../src/**/*.stories.tsx'],

  addons: [
    // '@storybook/addon-essentials',
  ],
  webpackFinal: config => ({
    ...config,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                customize: require.resolve(
                  'babel-preset-react-app/webpack-overrides',
                ),
                babelrc: false,
                configFile: false,
                presets: [require.resolve('babel-preset-react-app')],
              },
            },
          ],
        },
        ...config.module.rules,
      ],
    },
    resolve: {
      ...config.resolve,
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      modules: [resolve(__dirname, '../src'), 'node_modules'],
    },
  }),
};
