// webpack 不建议这么写 async 代码，因为在我们没有点击页面之前，下面函数里的代码是没有用的
// 解决方法看 click.js
//   getComponent().then(element => {
//     document.body.appendChild(element)
//   })

document.addEventListener('click', () => {
  // 这样写才是 webpack 推荐的写法，这样代码初始使用率会提高，且网页加载速度也会提高
  // 也就是说，现在好的前段工程师关注的重点不是缓存这类的东西，而是代码使用率
  // 所以要学好异步加载代码
  // import(/* webpackPreload: true */ './click') // Preload 和页面大体一起加载
  import(/* webpackPrefetch: true */ './click') // 加这一段魔法字符串，就可以在页面大体加载完成，在空闲时间帮你偷偷加载 click.js
    .then(({ default: func }) => {
      func()
    })
})
