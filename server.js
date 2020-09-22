// 自己写一个类似于 webpack-dev-server 功能的dev
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpac-dev-middleware')
const config = require('./webpack.config')
const complier = webpack(config)

const app = express()

const port = 3001
app.listen(port, () => {
  console.log('Server is running...')
})