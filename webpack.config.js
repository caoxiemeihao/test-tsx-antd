const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const resolve = dir => path.join(__dirname, dir);

module.exports = env => {
  const isDev = env === 'development';

  return {
    target: 'web',
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'eval-cheap-source-map' : 'cheap-module-source-map',
    entry: resolve('src/main.tsx'),
    output: {
      path: resolve('dist'),
      filename: isDev ? 'bundle.js' : 'bundle.[hash:9].js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader'],
        },
        {
          test: /\.less$/,
          use: [
            'style-loader', 'css-loader',
            // https://github.com/ant-design/ant-design/issues/7927
            {
              loader: 'less-loader',
              options: {
                lessOptions: { javascriptEnabled: true }
              },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        '@': resolve('src'),
      },
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve('public/index.html'),
      }),
      new CopyWebpackPlugin(),
      ...(isDev ? [
        // 管 jsx 更新
        // This is necessary to emit hot updates (currently CSS only):
        new webpack.HotModuleReplacementPlugin(),
      ] : [
          new CleanWebpackPlugin({ from: resolve('public'), to: resolve('dist') }),
        ]),
    ],
    devServer: {
      // 管 less 更新
      // 请注意，当前只有对CSS的更改是热重加载的。JS更改将刷新浏览器。
      hot: true,
      port: 3000,
      stats: 'minimal',
    },
  };
};
