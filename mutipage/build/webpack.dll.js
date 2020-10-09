const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    // 可以做拆分，不同类型的文件可以生成不同的文件
    // 但有多个文件后，需要在 webapck.common.js 里的 DllReferencePlugin 里解析更多的文件
    vendors: ['lodash'],
    react: ['react', 'react-dom']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'),
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json')
    })
  ]
}