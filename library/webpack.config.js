const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  // 遇到数组里的包就忽略掉，不要打包到生成的代码中去；这样可以防止用户打包多分相同的库代码
  externals: {
    lodash: {
      commonJs: 'lodash' // 指定用户引入我们库的同时，lodash 引入时必须要起名为：lodash
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    library: 'library', // 会在全局变量中增加一个 library 名字的变量，通过 <script> 标签引入
    libraryTarget: 'umd' // 加了这个方式之后，不管你用什么方式来引用我写的这个库，都能正确的引入到
  }
}