// import _ from 'lodash'
import * as _ from 'lodash' // TS 要求是这样引入，而不是上面那样简单引入

class Greeter {
  greeting: string

  constructor(message: string) {
    this.greeting = message
  }

  greet() {
    // return 'Hello, ' + this.greeting
    // return _.join() // 如果引用外部 js 文件，并且不配置任何其它参数，ts 是不会提示报错的，需要安装 lodash 对应的 ts 的类型文件j
    return _.join(['Hello, ', '', 'TypeScript'], '') // 安装好 @types/lodash 后，ts 就能像提示原生ts代码那样提示引入的外部 js 文件了
  }
}

let greeter = new Greeter("TypeScript")

// let button = document.createElement('button')
// button.textContent = 'Say Hello'
// button.onclick = function () {
//   alert(greeter.greet())
// }
// document.body.appendChild(button)

alert(greeter.greet())