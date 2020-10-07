// PWA Progressive Web Application
// 功能是可以缓存一个你访问过的网站到本地，这样即使这个网站服务关闭了，或者断网的情况下，下次你访问的时候 PWA 也能让它展示出来
// prodcution 环境下配置就好了
console.log('Hello, this is dell.')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service-worker registed.')
      }).catch(error => {
        console.log('service-worker register error.')
      })
  })
}