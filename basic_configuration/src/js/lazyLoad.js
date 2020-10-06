import _ from 'lodash'

// var element = document.createElement('div')
// element.innerHTML = _.join(['Dell', 'Lee'], '-')
// document.body.append(element)


// 上面和下面的代码实现的是相同的功能，但下面的异步加载可以实现懒加载的功能
// function getComponent() {
//   // 用获取 jsonp 的方式来获取 loadsh，获取的 loadsh 会被放到 _ 变量里
//   // 但这种实验性质的引入方式还需要babel-plugin-dynamic-import-webpack 插件支持
//   return import(/* webpackChunkName:"lodash" */ 'lodash')
//     .then(({ default: _ }) => {
//       var element = document.createElement('div')
//       element.innerHTML = _.join(['Dell', 'Lee'], '-')
//       return element
//     })
// }

// 当然，用 ES7 的 async 异步函数方法写就更加方便
async function getComponent() {
  const { default: _ } = await import(/* webpackChunkName:"loadsh" */ 'lodash')
  const element = document.createElement('div')
  element.innerHTML = _.join(['Dell', 'Lee'], '-')
  return element
}

document.addEventListener('click', () => {
  getComponent().then(element => {
    document.body.appendChild(element)
  })
})
