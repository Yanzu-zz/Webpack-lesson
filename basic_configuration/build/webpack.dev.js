const webpack = require('webpack')

const devConfig = {
  mode: 'development',
  // 只要设置 devtool 的参数配置就能启用 sourceMap 了（精细和粗略提示需要自己加一些参数，详情参考官方文档的 configuration → Devtool）
  // 在日常业务开发过程中（开发环境 development），推荐使用 cheap-module-eval-source-map 这个配置参数
  // 生产环境（production）中，推荐使用 cheap-module-source-map，这个提示效果会更好一些
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  // 使用 devServer 开发能大大的提升效率
  // 开启一个 web 服务器能使用 ajax 请求并很大程度上模拟线上环境
  // 早期的 devServer 不太成熟，容易出错，所以很多程序员都会自己写一个类似它的中间件来监听代码改动，我们这里就学一学，详见 server.js
  // webpack-dev-server 打包的时候不会生成 dist/ 到硬盘目录，而是存到内存中，有效的提高我们的开发效率
  devServer: {
    port: '8080',
    contentBase: './dist', // 需要展示的根目录
    open: true, // 启动时自动使用浏览器打开页面
    hot: true, // 开启 Hot Module Replacement 这个功能
    hotOnly: true, // 这个配置参数的意义是：即使 HMR 功能没有生效，我们也不要让浏览器自动刷新
    historyApiFallback: true,
    proxy: {
      '/direct22': 'http://localhost:3001', // 能自动转发指定的请求网址到别的域名或端口
      // '/react/api': 'http://www.dell-lee.com',
      '/react/api': {
        target: 'http://www.dell-lee.com',
        secure: false, // 设置成 false 才能对 https 网址的转发
        bypass: function (req, res, proxyOptions) {
          // 只要请求的是 html 类型的地址，一律返回 /index.html
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }
        },
        pathRewrite: {
          // 不仅可以接口转发，还可以接口下面的资源转发
          'header.json': 'demo.json'
        },
        changeOrigin: true
      }
    }
  },
  plugins: [
    // 添加这样一个插件配合上 webpack-dev-server 参数配置就能实现 HMR 功能了，很简单的
    // 嗯，开启完记得重启一下 webpack-dev-server，不然会按照之前的配置傻傻的刷新
    new webpack.HotModuleReplacementPlugin()
  ]
}

// 利用 merge 就能很简单和把 common 和 其它配置文件做结合
module.exports = devConfig