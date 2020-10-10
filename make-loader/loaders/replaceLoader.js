const loaderUtils = require('loader-utils')

// loader 的暴露方法不能用箭头函数，因为这样会改变它的 this上下文
// source 就是需要被 loader 处理的文件传入的源代码，我们所需要做的就是对这个源代码进行你提供的功能的实现
module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  const result = source.replace('dell', options.name)

  // return source.replace('dell', 'dellLee')
  // this.query 就存储着用户在 webpack 配置文件中传入的 options 参数
  // 这样就可以更加智能的执行 loader 任务了
  // return source.replace('dell', options.name)

  // 使用 callback 方法可以返回多个结果
  this.callback(null, result) // 这里这样写就相当于上面的 return 语句
}

// this.callback(
//   err: Error | null,
//   content: string | Buffer,
//   sourceMap ? : SourceMap,
//   meta ? : any
// )