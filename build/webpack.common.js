// 配置 webpack.common.js 可以大大简化重复代码
// 配置好后可以借助 webpack-merge 工具和 dev, prod 配置文件合并
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
  // entry: './src/index.js', // 入口文件，这样写是下面的简写
  entry: {
    // main: './src/js/index.js',
    // loadsh: './src/js/loadsh.js', // 使用 code splitng 方式引入 loadsh 之类的文件的话，必须再其它文件前引入，但这个方法不推荐使用，只需要下面配置好 splitChunks 参数就好
    codeSpliting: './src/js/codeSpliting.js',
  },
  output: { // 输出配置
    // 如果打包后的文件是要上传到服务器的，那就可以修改这个参数来让引入文件时自动帮你加上cdn前缀
    //publicPath: 'http://www.yourServerUrl.com.cn',

    //filename: 'bundle.js', // 打包后的文件名，但如果名字写死了，打包多个文件时就会报错，因为会覆盖掉先打包的文件
    // 我们配置了 HtmlWebpackPlugin 后，打包再多的 js 文件都能自动引入
    filename: '[name].js', // 这种动态打包文件（名）的方式就很推荐
    path: path.resolve(__dirname, '../dist') // 打包输出文件位置
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
  ],
  optimization: {
    // 加这样一个配置参数，就能轻松地实现 Code Spliting 功能
    // 而且是自动智能的帮我们做好 Code Spliting 工作，真的非常推荐
    // 它有默认配置，我们可以按项目需求来改，这里就用默认配置就好了
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}