function Content() {
  var dom = document.getElementById('main')
  var content = document.createElement('div')
  content.innerText = 'content'
  dom.append(content)
}

export default Content