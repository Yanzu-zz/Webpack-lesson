const path = require('path')
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new CopyrightWebpackPlugin({
      name: 'dell'
    })
  ]
}