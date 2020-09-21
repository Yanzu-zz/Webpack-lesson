function Sidebar() {
  var dom = document.getElementById('main')
  var sidebar = document.createElement('div')
  sidebar.innerText = 'sidebar'
  dom.append(sidebar)
}

export default Sidebar