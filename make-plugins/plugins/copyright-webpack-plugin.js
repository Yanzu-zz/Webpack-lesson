// 这个简单插件实现的方法就是在打包的时候往 dist 目录添加个版权文件

class CopyrightWebpackPlugin {
  // 用户插件传入的 options 可以通过在 constructor 参数 options 获取到
  constructor(options) {
    // console.log('The plugin has been used.')
    // console.log(options)
  }

  // 参数 compiler 是一个 webpack的实例，这个实例存储了 webpack相关的各种配置文件、打包的过程等等一系列的内容
  apply(compiler) {
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
      console.log('compiler')
    })

    // compiler.hooks 里面有很多的钩子（即某个生命周期时刻会自动执行的方法），详见https://webpack.js.org/api/compiler-hooks
    // emit 是个异步的钩子函数
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
      debugger // 利用 node 提供的调试工具来查看 hooks下面的参数的详情（如compilation）
      // console.log(compilation.assets) // comiliation.assets 存放的就是最终生成的资源列表，我们往里面添加东西即可实现本插件的目标
      compilation.assets['copyright.txt'] = {
        source: function () {
          return 'Copyright © by Dell Lee'
        },
        size: function () {
          return 23
        }
      }
      cb()
    })
  }
}

module.exports = CopyrightWebpackPlugin