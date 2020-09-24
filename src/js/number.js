function number() {
    var div = document.createElement('div')
    div.setAttribute('id', 'number')
    // 可以看到设置了HMR之后修改数字页面就不会自动刷新了
    div.innerHTML = 220
    document.body.appendChild(div)
}

export default number