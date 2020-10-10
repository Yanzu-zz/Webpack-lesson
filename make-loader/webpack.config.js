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
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
        options: {
          name: 'lee'
        }
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}