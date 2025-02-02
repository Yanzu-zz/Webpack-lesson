const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  // 只要设置 devtool 的参数配置就能启用 sourceMap 了（精细和粗略提示需要自己加一些参数，详情参考官方文档的 configuration → Devtool）
  // 在日常业务开发过程中（开发环境 development），推荐使用 cheap-module-eval-source-map 这个配置参数
  // 生产环境（production）中，推荐使用 cheap-module-source-map，这个提示效果会更好一些
  devtool: 'cheap-module-eval-source-map',
  // entry: './src/index.js', // 入口文件，这样写是下面的简写
  entry: {
    // main: './src/js/index.js',
    // sub: './src/js/index.js', // 打包生成两个文件
    // second: './src/js/second.js',
    // HMR: './src/js/HMR.js',
    // babel: './src/js/babel.js',
    react: './src/js/react.js'
  },
  output: { // 输出配置
    // 如果打包后的文件是要上传到服务器的，那就可以修改这个参数来让引入文件时自动帮你加上cdn前缀
    //publicPath: 'http://www.yourServerUrl.com.cn',

    //filename: 'bundle.js', // 打包后的文件名，但如果名字写死了，打包多个文件时就会报错，因为会覆盖掉先打包的文件
    // 我们配置了 HtmlWebpackPlugin 后，打包再多的 js 文件都能自动引入
    filename: '[name].js', // 这种动态打包文件（名）的方式就很推荐
    path: path.resolve(__dirname, 'dist') // 打包输出文件位置
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
    proxy: {
      '/direct': 'http://localhost:3000' // 能自动转发指定的请求网址到别的域名或端口
    }
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
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          // babel-loader 可以将 ES6+ 代码转化为一颗 抽象语法树
          loader: "babel-loader",
          // babel 有太多的配置项了，如果在这里写很多的话，会显得很臃肿，所以可以去根目录下新建一个个 .babelrc 文件来写配置
          // 如果配置了 .babelrc 文件的话，下面的options选项就可以删除掉了
          // options: {
          //   // 再用 @babel/preset-env 可以翻译为低版本的 js 代码
          //   // 但单单用这两个东东是不够的，有些更新奇的方法或变量（如 Promise）就可能转化不了，这里就要依靠 @babel/polyfill
          //   // presets: ['@babel/preset-env']
          //   // 按需引入（babel 自动判断你加了哪些需要引入的转换代码）
          //   presets: [['@babel/preset-env', {
          //     targets: {
          //       chrome: '67'
          //     },
          //     useBuiltIns: 'usage'
          //   }]]

          //   // 如果只是正常的开发项目的话，用上面的配置参数就好了，下面的 plugins 是给哪些开发轮子组件的开发者用的
          //   // @babel/plugin-transform-runtime 会用闭包的形式注入，而不会像 polyfill 那样直接全局注入
          //   // "plugins": [[
          //   //   "@babel/plugin-transform-runtime",
          //   //   {
          //   //     "absoluteRuntime": false,
          //   //     "corejs": 3,
          //   //     "helpers": true,
          //   //     "regenerator": true,
          //   //     "useESModules": false,
          //   //     "version": "7.0.0-beta.0"
          //   //   }
          //   // ]]
          // }
        }
      }
    ]
  },
  // plugin 可以在 webpack 运行到某个时刻的时候，帮你做一些事情（类似中间件）
  plugins: [
    // HtmlWebpackPlugin 会在打包结束后，自动生成一个html5文件并帮你引入打包好的 js 文件
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
    // 添加这样一个插件配合上 webpack-dev-server 参数配置就能实现 HMR 功能了，很简单的
    // 嗯，开启完记得重启一下 webpack-dev-server，不然会按照之前的配置傻傻的刷新
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    // usedExports: 开启 Tree Shaking 功能
    // 在 development 环境下配置着一个参数加在 package.json 里配置上 sideEffects 就能开启 Tree Shaking 了
    usedExports: true
  }
}