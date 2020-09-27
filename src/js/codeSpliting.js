import _ from 'lodash' // 假设 loadsh 有 1mb

var element = document.createElement('div')
element.innerHTML = _.join(['Dell', 'Lee'], '-')
document.body.append(element)

// 假设自己的业务代码也有 1mb
console.log(_.join(['a', 'b', 'c']))
console.log(_.join(['a', 'b', 'c'], '***'))
// 此处省略 10w 行代码

// 当业务代码非常多时，又有工具库，又有自己的开发代码，这样再打包webpack会统一的生成到一个js文件中，会非常大
// 这样生成的代码就有 2mb 大（不压缩情况下），如果用户想要使用页面的任何功能，那就要先等这个 2mb 大的文件加载完成，同时 HTTP 传输一次本来就有限制，所以这样的方案对用户体验来说可不怎么好
// 而业务代码改动频率会很大，每次重新打包后用户的浏览器缓存就没有了效果，相当于每次打开网页都是要重新请求 2mb 的js代码
// 而且打包速度也会慢很多


// 解决方法看 loadsh.js
// 解决完后我们就能在这个文件里放心地写自己的业务代码了
// 而且浏览器是有缓存功能的，loadsh.js 就会被长时间的存在 disk 或 memory 上，加载速度起飞
// 也就是说，当页面业务逻辑发生变化时，只要加载 main.js 即可（1mb）
// 这就是所谓的 Code Spliting

// 而 webpack 4.x 直接就有内置的 Code Spliting 配置参数（Opitimizaiton -> splitChunks），这就非常方便了


// 上面是同步代码，如果我们有一些异步代码呢？
// function getComponent() {
//   // 用获取 jsonp 的方式来获取 loadsh，获取的 loadsh 会被放到 _ 变量里
//   // 但这种实验性质的引入方式还需要babel-plugin-dynamic-import-webpack 插件支持
//   return import(/* webpackChunkName:"lodash" */ 'lodash').then(({ default: _ }) => {
//     var element = document.createElement('div')
//     element.innerHTML = _.join(['Dell', 'Lee'], '-')
//     return element
//   })
// }

// getComponent().then(element => {
//   document.body.appendChild(element)
// })
