// 如果直接引入 polyfill 的话，打包后的文件会很大，所以可以按需引入（babel 自动判断）
// 而且，如果你在开发一个组件库的话，直接引入 polyfill 会污染全局变量，所以开发不同的东东有不同的配置（这里用 @babel/plugin-transform-runtime）
import '@babel/polyfill'

const arr = [
  new Promise(() => { }),
  new Promise(() => { })
]

arr.map(item => {
  console.log(item)
})