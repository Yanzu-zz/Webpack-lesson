const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  // entry: './src/index.js', // 入口文件，这样写是下面的简写
  entry: {
    main: './src/index.js',
    sub: './src/index.js', // 打包生成两个文件
  },
  output: { // 输出配置
    // 如果打包后的文件是要上传到服务器的，那就可以修改这个参数来让引入文件时自动帮你加上cdn前缀
    //publicPath: 'http://www.yourServerUrl.com.cn',

    //filename: 'bundle.js', // 打包后的文件名，但如果名字写死了，打包多个文件时就会报错，因为会覆盖掉先打包的文件
    // 我们配置了 HtmlWebpackPlugin 后，打包再多的 js 文件都能自动引入
    filename: '[name].js', // 这种动态打包文件（名）的方式就很推荐
    path: path.resolve(__dirname, 'dist') // 打包输出文件位置
  },
  // 引入解析其它文件的配置属性（输入输出位置/名字等）
  module: {
    rules: [{
      test: /\.(jpe?g|png|gif|webp)$/,
      use: {
        // 使用
        loader: 'url-loader',
        options: {
          // placeholder 占位符
          name: '[name]_[hash].[ext]', // 打包后输出的文件名字
          outputPath: 'images/', // 输出文件夹路径
          limit: 3048 // 图片小于 指定的k 才打包成 base64 格式
        }
      }
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    },
    {
      test: /\.s[ac]ss$/i,
      // 通过这个例子可以看出，每个使用的模块都有自己的任务
      // 一环接一环的解析下去，最终生成我们想要的代码样式
      use: [
        // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2, // 这个配置参数可以让在 scss 文件中import的文件也经过下面两个loader的打包
            // modules: true // 开启 css 的模块化打包，这样就可以像引入js一样引入css文件，但是设置这个之后你定义的css类名会变成一串hash值
          }
        },
        // Compiles Sass to CSS
        'sass-loader',
        // 自动添加浏览器兼容前后缀loader，非常方便
        'postcss-loader'
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'fonts/'
        }
      }
    }
    ]
  },
  // plugin 可以在 webpack 云新高某个时刻的时候，帮你做一些事情（类似中间件）
  plugins: [
    // HtmlWebpackPlugin 会在打包结束后，自动生成一个html5文件并帮你引入打包好的 js 文件
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
}