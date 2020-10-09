// 在 .babelrc 或 webpck.config.js 中配置了 "useBuiltIns": "usage" 的话这里就不用再 import polyfill 了，它会自动帮你按需引入
// import '@babel/polyfill'
import React, {
  Component
} from 'react'
import {
  BrowserRouter,
  Route,
  Router
} from 'react-router-dom'
import ReactDom from 'react-dom'
// import axios from 'axios'

import Home from './home.js'
import List from './list.js'

class App extends Component {
  // componentDidMount() {
  //   axios.get('/react/api/header.json')
  //     .then((res) => {
  //       console.log(res)
  //     })
  // }

  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>Hello, React!</h1>
          <Router path='/' exact component={Home}/>
          <Router path='/list' component={List}/>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDom.render( < App / > , document.getElementById('main'))