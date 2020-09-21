// ES Module 模块引入方式
// webpack 模块打包工具（可以引入打包很多类型的文件）
import Header from './header'
import Sidebar from './sidebar'
import Content from './content'
import createAvatar from './createAvatar'

//import './css/index.css'
import './css/style.scss'
// 设置modules参数为true后，就能这样引入css文件了
//import style from './css/style.scss'


/** webpack 打包图片 */
createAvatar()

const avatar2 = require('./imgs/download.png')

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

new Header()
new Sidebar()
new Content()