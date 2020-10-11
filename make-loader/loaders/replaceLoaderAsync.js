const loaderUtils = require('loader-utils')

// 异步 looader 返回值的方法
module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  const callback = this.async()

  setTimeout(() => {
    const result = source.replace('dell', options.name)
    callback(null, result)
  }, 1000)
}