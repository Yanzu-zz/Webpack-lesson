function Header() {
  var dom = document.getElementById('main')
  var header = document.createElement('div')
  header.innerText = 'header'
  dom.append(header)
}

export default Header
// 如果使用的是 require 引入规范的话，那么导出规范也要相对应
// module.exports = Header