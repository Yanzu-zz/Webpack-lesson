// sourceMap
// 现在我们知道 dist/second.js 第xx行出错，但这不是扯蛋呢么，告诉打包后文件的错误行数有🔨用
// 这时候我们就可以打开 sourceMap 来帮助我们查看打包后的文件错误对应的源代码位置
// sourceMap 实际上是一个映射关系
console.log('second!!!') // 这里我们故意写错
console.log('yeeeeas')