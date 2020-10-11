// loader 的作用是很明显的，如以前想要对项目的前端代码做异常预警，你需要在项目使用的框架源代码上做修改
// 而有了 webpack loader 后，得到了传入的 源代码source 参数，就可以通过大学时学过的 编译原理里面的抽象语法树相关的知识
// 根据业务需求，给源代码里面的（例如）函数、http请求之类的逻辑加上 catch{[source]} catch(e){xxxx}，可以说是非常方便了

// 又如你们的项目需要做国际化，那么就可以在源代码中的文字部分全部用 约定好的标记符来圈上
// 再加上 loader 里面可以获取一些 node 的全局变量，通过全局变量就可以获取打包时的语言
// 然后利用得到的源代码编写一个 loader 来根据语言进行对应的语言替换（自己写业务逻辑代码）
/** 如：
 * if(全局变量) {
 *  source.replace('{{title}}','中文标题')
 * } else {
 *  source.relace('{{title}}','English title')
 * }
 */


// loader 的暴露方法不能用箭头函数，因为这样会改变它的 this上下文
// source 就是需要被 loader 处理的文件传入的源代码，我们所需要做的就是对这个源代码进行你提供的功能的实现
module.exports = function (source) {
  const result = source.replace('lee', 'world')

  // this.query 就存储着用户在 webpack 配置文件中传入的 options 参数，这样就可以更加智能的执行 loader 任务了
  //   // return source.replace('dell', options.name)

  // 使用 callback 方法可以返回多个结果
  this.callback(null, result) // 这里这样写就相当于上面的 return 语句
}

// this.callback(
//   err: Error | null,
//   content: string | Buffer,
//   sourceMap ? : SourceMap,
//   meta ? : any
// )