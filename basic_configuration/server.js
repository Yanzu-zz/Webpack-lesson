// 自己写一个类似于 webpack-dev-server 功能的dev
// 但自己写一个 webpack-dev-server 是非常耗费精力的...，了解一下可以这么写就好了
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config')
// 使用 webpack 结合我们自己定义的 webpack config 文件我们可以随时的进行代码编译
// 这叫在 node 中使用 webpack
const complier = webpack(config)

const app = express()

// 只要文件内容发生改变了，那么 complier 就会重新运行，且生成的打包内容就会对应到 publicPath 上
app.use(webpackDevMiddleware(complier, {}))

const port = 3001
app.listen(port, () => {
  console.log(`Server is running at port ${port}...`)
})