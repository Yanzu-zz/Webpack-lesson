const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// 我们可以发现，prod 和 dev 配置文件中，有大量相同的重复代码出现，这里我们可以创建一个 webpack.common.js 来解决复用问题
const prodConfig = {
  mode: 'production',
  // 只要设置 devtool 的参数配置就能启用 sourceMap 了（精细和粗略提示需要自己加一些参数，详情参考官方文档的 configuration → Devtool）
  // 生产环境（production）中，推荐使用 cheap-module-source-map，这个提示效果会更好一些
  // devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  }
}

module.exports = prodConfig