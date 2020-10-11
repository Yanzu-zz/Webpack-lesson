const path = require('path')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].chunk.js'
  },
  // resolveLoaders 作用是当你引入 loader 时帮你干一些事情
  resolveLoader: {
    modules: ['node_modules', './loaders'] // 引入 loader 时，在这几个目录下去找
  },
  module: {
    // 顺带说一句，loader 的执行顺序是 从下到上，从右到左
    rules: [{
      test: /\.js$/,
      use: [{
          // loader: path.resolve(__dirname, './loaders/replaceLoader.js')
          loader: 'replaceLoader.js' // 配置了 resolveLoaders 参数后，就可以简化我们引入 loader 的写法了
        },
        {
          // loader: path.resolve(__dirname, './loaders/replaceLoaderAsync.js'),
          loader: 'replaceLoaderAsync.js',
          options: {
            name: 'lee'
          }
        }
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}