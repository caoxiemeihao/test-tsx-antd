/**
 * webpack 构建脚本
 */
process.env.NODE_ENV = 'production';
const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const configFactory = require('../webpack.config');

const TAG = '[build.js]';
const config = configFactory(process.env.NODE_ENV);
const compiler = webpack(config);

compiler.hooks.beforeCompile.tap(TAG, () =>  console.log(chalk.yellow('开始构建...')))

compiler.run((err, stats) => {
  if (err) {
    console.log('webpack 配置报错\n', err);
  } else if (stats.hasErrors()) {
    console.log(stats.toJson('errors-only'));
  } else {
    console.log(chalk.green('构建完成'));
  }
});
