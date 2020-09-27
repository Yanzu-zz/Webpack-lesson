// import _ from 'lodash'

// 这是我们手动 Code Spliting 的实验文件，webpack有自带的插件，所以这个文件过后就没用了

// 这个文件的作用就是加载 loadsh，然后把它挂载到 全局window 上
// 这样我们就能在其它文件上全局使用 _ 这个变量了
// 记住如果要 code spliting，就不要在其它文件里引入 loadsh 包，而是要像这样全局挂载
// window._ = _