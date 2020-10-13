// Vue Cli 和 create-react-app 不同，所有的 webpack 配置都是在这个文件下配置的
// 详情看 https://cli.vuejs.org/config
const path = require('path')

module.exports = {
  outputDir: 'dell',
  configureWebpack: {
    devServer: {
      contentBase: [path.resolve(__dirname, 'static')]
    }
  }
}