// 配置 webpack.common.js 可以大大简化重复代码
// 配置好后可以借助 webpack-merge 工具和 dev, prod 配置文件合并
const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')
const {
  merge
} = require('webpack-merge')
const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')
const {
  config
} = require('process')

// 这个函数就是可以自动的分析我们需要打包，打包后需要引入的 chunk 文件的函数，大大地提升了智能化
const makePlugins = (configs) => {
  const plugins = [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      // 如果一个模块中使用了 $ 这个字符串，那就会在该模块下自动帮你引入 jquery，引入名为 $
      $: 'jquery'
    })
  ]

  // 对应页面分别生成和引入js文件
  Object.keys(configs.entry).forEach(item => {
    plugins.push(
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: `${item}.html`,
        chunks: ['runtime', 'vendors', item]
      })
    )
  })

  const manifestFiles = fs.readdirSync(path.resolve(__dirname, '../dll'))
  manifestFiles.forEach(file => {
    if (/.*\.dll.js/.test(file)) {
      plugins.push(new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, '../dll', file)
      }))
    }

    if (/.*\.manifest.json/.test(file)) {
      plugins.push(new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, '../dll', file)
      }))
    }
  })

  return plugins
}

const commonConfig = {
  // entry: './src/index.js', // 入口文件，这样写是下面的简写
  entry: {
    // main: '../src/js/index.js',
    // codeSpliting: './src/js/codeSpliting.js',
    // lazyLoad: './src/js/lazyLoad.js'
    // PP: './src/js/Prefetching_Preloading.js'
    // cssExtract: './src/js/MiniCssExtract.js'
    // shimming: './src/js/shimming.js',
    // PWA: './src/js/PWA.js',
    react: './src/js/react.js',
    list: './src/js/list.js',
    home: './src/js/home.js'
  },
  // output: { // 输出配置
  //     // 如果打包后的文件是要上传到服务器的，那就可以修改这个参数来让引入文件时自动帮你加上cdn前缀
  //     //publicPath: 'http://www.yourServerUrl.com.cn',

  //     // filename: 'bundle.js', // 打包后的文件名，但如果名字写死了，打包多个文件时就会报错，因为会覆盖掉先打包的文件
  //     // 我们配置了 HtmlWebpackPlugin 后，打包再多的 js 文件都能自动引入
  //     filename: '[name].js', // 这种动态打包文件（名）的方式就很推荐
  //     chunkFilename: '[name].chunk.js', // 源代码依赖引入的包的输出名字就是这个
  //     path: path.resolve(__dirname, '../dist') // 打包输出文件位置
  // },
  // 引入解析其它文件的配置属性（输入输出位置/名字等）
  resolve: {
    extensions: ['.js', '.jsx'], // 引入其他模块时，会优先找数组里面后缀的文件（当你手动引入省略后缀的情况）
    alias: { // 还可以给想要引入的文件起个别名
      delllee: path.resolve(__dirname, '../src/js/child')
    }
  },
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
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: [{
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
        }]
      }
    ]
  },
  // plugin 可以在 webpack 运行到某个时刻的时候，帮你做一些事情（类似中间件）
  optimization: {
    // 配置了这个参数会把 manifest 逻辑代码单独抽出来 runtime.[hash].js
    // 这样你不改变自己的业务逻辑代码它的 contenthash 就永远不会变
    runtimeChunk: {
      name: 'runtime'
    },
    // 在 development 环境下配置着一个参数加在 package.json 里配置上 sideEffects 就能开启 Tree Shaking 了
    usedExports: true,
    // 加这样一个配置参数，就能轻松地实现 Code Spliting 功能
    // 而且是自动智能的帮我们做好 Code Spliting 工作，真的非常推荐
    // 它有默认配置，我们可以按项目需求来改，这里就用默认配置就好了
    splitChunks: {
      // 打包后 /dist 目录有几个文件那就是有几个 chunk
      chunks: 'all', // 和下面的 cacheGroups 是配合着用的
      minSize: 20000, // 如果引入的包大小 >20kb 的话，才会做代码分割
      minChunks: 1, // 如果有 1 个以上的源代码文件引入了 [name].js，那就就对它进行分割
      maxAsyncRequests: 5, // 最多分割几个代码文件
      maxInitialRequests: 3,
      automaticNameDelimiter: '~', // 连接符
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          filename: '[name].vendors.js', // 分割的同步文件，最终打包出来的文件名
          test: /[\\/]node_modules[\\/]/, // 如果识别到引入的文件是在 node_modules 目录下的话，就打包到 vendors.js 中，与源代码隔开
          priority: -10,
        },
        default: { // 如果打包规则没有过 defaultVendors，就走 default 规则
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true, // 如果一个模块已经打包过了，那么后面遇到引入打包过的模块就不再二次打包
          filename: '[name].common.js'
        },
        // CSS 文件的 Code Spliting 风格
        styles: { // 这里的配置风格是全部引入的css文件都打包到一个文件去
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        }
      }
    }
  }
}

commonConfig.plugins = makePlugins(commonConfig)

module.exports = (env) => {
  if (env && env.production) { // 线上环境打包
    return merge(commonConfig, prodConfig)
  } else { // 开发环境
    // 如果不传环境变量，那么默认就是开发环境
    return merge(commonConfig, devConfig)
  }
}