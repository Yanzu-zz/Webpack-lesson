// 自己写一个类似于 webpack 功能的 bundler 文件
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

// 对传入的文件进行 AST抽象语法树 分析（基于 @babel 提供的功能）
const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, 'utf-8')
  const ast = parser.parse(content, {
    sourceType: 'module'
  })

  const dependencies = {}
  traverse(ast, {
    ImportDeclaration({
      node
    }) {
      const dirname = path.dirname(filename)
      const newFile = './' + path.join(dirname, node.source.value)

      dependencies[node.source.value] = newFile
    }
  })

  const {
    code
  } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })

  // console.log(code)
  // console.log(dependencies)
  return {
    filename,
    dependencies,
    code
  }
}

// 根据模块的引入关系，遍历整个依赖关系，并返回对象信息
const makeDependenciesGraph = (entry) => {
  const entryModule = moduleAnalyser(entry)
  const graphArray = [entryModule]
  for (let item of graphArray) {
    const {
      dependencies
    } = item

    // 开始类似 BFS 方式来查看依赖
    if (dependencies) {
      for (let j in dependencies) {
        graphArray.push(moduleAnalyser(dependencies[j]))
      }
    }
  }

  // 自定义一个更好的存储数据结构并返回
  const graph = {}
  for (let item of graphArray) {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  }

  return graph
}

// 生成最终需要的代码
const generateCode = (entry) => {
  // 如果直接就这样在浏览器里执行，是会报错的，因为浏览器和大概率不识别 require()和export 函数和变量
  const graph = JSON.stringify(makeDependenciesGraph(entry))

  // 所以需要经过一些业务逻辑处理（自己看代码理解吧，功能就是让上面的代码能够正确执行）
  return `
    (function(graph){
      function require(module) {
        function localRequire(relativePath) {
          return require(graph[module].dependencies[relativePath]);
        }

        var exports = {};
        (function(require, exports, code){
          eval(code);
        })(localRequire, exports, graph[module].code);

        return exports;
      };
      require('${entry}')
    })(${graph});
  `
}

const code = generateCode('./src/index.js')
console.log(code)