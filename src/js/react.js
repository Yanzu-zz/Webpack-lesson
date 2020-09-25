// 在 .babelrc 或 webpck.config.js 中配置了 "useBuiltIns": "usage" 的话这里就不用再 import polyfill 了，它会自动帮你按需引入
// import '@babel/polyfill'
import React, { Component } from 'react'
import ReactDom from 'react-dom'

class App extends Component {
    render() {
        return <div>Hello React!</div>
    }
}

ReactDom.render(<App />, document.getElementById('main'))