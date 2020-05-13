/**
 * webpack 开发脚本
 */
process.env.NODE_ENV = 'development';
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const argv = require('optimist').argv;
const chalk = require('chalk');
const configFactory = require('../webpack.config.js');

const config = configFactory(process.env.NODE_ENV);
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, config.devServer);
const port = argv.prot || config.devServer.port || 8000;

server.listen(port, { host: '0.0.0.0' }, err => {
    if (err) {
      console.log(chalk.red(err));
    } else {
      console.log(chalk.green(`服务运行在 http://localhost:${port}`));
    }
  });

// ctrl+c、kill 命令
['SIGINT', 'SIGTERM'].forEach(sig => {
  process.on(sig, () => {
    server.close();
    process.exit(0);
  })
});
