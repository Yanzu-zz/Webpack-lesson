// 写 ES6+ 代码时，就在入口文件顶部引入这个 polyfill 就好
// import '@babel/polyfill'

// ES Module 模块引入方式
// webpack 模块打包工具（可以引入打包很多类型的文件）
import Header from './header'
import Sidebar from './sidebar'
import Content from './content'
import createAvatar from './createAvatar'
import counter from './counter'
import number from './number'
import {
  // 这里虽然只引入了 add 方法，但是 webpack 自动地把 math.js 里全部导出函数都引入了，这样没有必要
  // 要想解决这个问题，webpack 2.0+ 版本就提供了个 Tree Shaking 配置，作用是把一个模块里没用的部分（如我们不想用到的导出的函数）给“摇晃掉”
  // 注意：Tree Shaking 只支持 ES 模块的引入（只支持 import）
  add,
  // minus
} from './math'

//import '../css/index.css'
import '../css/style.scss'
// 设置modules参数为true后，就能这样引入css文件了
//import style from '../css/style.scss'


/** webpack 打包图片 */
createAvatar()

const avatar2 = require('../imgs/download.png')

// webpack 也能识别 CommonJS 模块引入规范 的形式
// const Header = require('./header.js')
// const Sidebar = require('./sidebar.js')
// const Content = require('./content.js')
var dom = document.getElementById('main')

var img2 = new Image()
img2.src = avatar2.default
img2.classList.add('avatar2')
// 这样就能用对象的形式添加类名了
//img2.classList.add(style.avatar2)
dom.append(img2)

/** webpack 处理字体文件 */
var iconfont1 = document.createElement('i')
iconfont1.classList.add('iconfont')
iconfont1.classList.add('icon-music')
dom.append(iconfont1)

/** 热模块替换 */
counter()
number()

// 如果当前项目你开启了 HMR 功能，并且支持 HMR，那么就会执行下面 if 块代码
// 当然，像vue和react这些大框架，底层都帮你写好下面这一块代码了，所以不用你自己再写
// 而一些偏僻的文件类型可能就要自己写一段这样的代码了
if (module.hot) {
  module.hot.accept('./number', () => {
    document.body.removeChild(document.getElementById('number'))
    number()
  })
}


// Tree Shaking
add(1, 9)
// minus(3, 1)

new Header()
new Sidebar()
new Content()