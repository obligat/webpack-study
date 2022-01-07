const fs = require('fs')
const path = require('path')

const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const generate = require('@babel/generator').default
const config = require('../webpack.config')

const ejs = require('ejs')

const EXPORT_FUN = (variables) => {
  let temp = ''

  for (const key in variables) {
    if (key === 'default') {
      temp += `'${key}': () => (__WEBPACK_DEFAULT_EXPORT__)`
    } else {
      temp += `'${key}': () => (${variables[key]}),`
    }
  }

  return `
        __webpack_require__.d(__webpack_exports__, {${temp}});\n
    `
}

const ESMODULE_TAG_FUN = `
__webpack_require__.r(__webpack_exports__);\n`

// 获取导出的变量声明
// eg: export const abc = '123'
const getVariableDeclarationName = (declarations) => {
  return declarations.reduce((prev, cur) => {
    return cur.type === 'VariableDeclarator'
      ? {
          ...prev,
          [cur.id.name]: {
            name: cur.id.name,
            value: cur.init.value,
          },
        }
      : prev
  }, {})
}

// 解析单个文件
function parseFile(file) {
  // 读取入口文件
  const fileContent = fs.readFileSync(file, 'utf-8')
  // 使用babel parser解析AST
  const ast = parser.parse(fileContent, { sourceType: 'module' })

  let importFilePath = ''
  let importVarName = []
  let importConvertVarName = ''
  let exportNameMap = {}

  // 使用babel traverse来遍历ast上的节点
  traverse(ast, {
    ImportDeclaration(p) {
      // 获取被import的文件
      const importFile = p.node.source.value

      // import进来的变量名字 比如 import defaultVal, {abc} from './hello.js'
      importVarName = p.node.specifiers.map((item) => ({
        type: item.type,
        name: item.local.name,
      }))

      // 获取文件路径
      importFilePath = path.join(path.dirname(config.entry), importFile)
      importFilePath = `./${importFilePath}.js`

      // 替换后的变量名字
      importConvertVarName = `__${path.basename(
        importFile,
      )}__WEBPACK_IMPORTED_MODULE_0__`

      // 构建一个目标变量定义的AST节点
      const variableDeclaration = t.variableDeclaration('var', [
        t.variableDeclarator(
          t.identifier(importConvertVarName),
          t.callExpression(t.identifier('__webpack_require__'), [
            t.stringLiteral(importFilePath),
          ]),
        ),
      ])

      // 将当前节点替换为变量定义节点
      p.replaceWith(variableDeclaration)
    },

    CallExpression(p) {
      // 如果调用的是import进来的函数
      const node = importVarName.find((item) => item.name === p.node.name)
      if (node) {
        const name =
          node.type === 'ImportDefaultSpecifier' ? 'default' : node.name
        // 就将它替换为转换后的函数名字
        p.node.callee.name = `${importConvertVarName}.${name}`
      }
    },

    Identifier(p) {
      // 如果调用的是import进来的变量
      const node = importVarName.find((item) => item.name === p.node.name)
      if (node) {
        const name =
          node.type === 'ImportDefaultSpecifier' ? 'default' : node.name
        // 就将它替换为转换后的变量名字
        p.node.name = `${importConvertVarName}.${name}`
      }
    },

    ExportDefaultDeclaration(p) {
      // 跟前面import类似的，创建一个变量定义节点 替换默认导出
      const variableDeclaration = t.variableDeclaration('const', [
        t.variableDeclarator(
          t.identifier('__WEBPACK_DEFAULT_EXPORT__'),
          t.identifier(p.node.declaration.name),
        ),
      ])
      p.replaceWith(variableDeclaration)

      exportNameMap.default = '__WEBPACK_DEFAULT_EXPORT__'
    },

    ExportNamedDeclaration(p) {
      // 替换变量导出  将 export const abc = 123 变为 const abc = 123
      if (t.isVariableDeclaration(p.node.declaration)) {
        const nameMap = getVariableDeclarationName(
          p.node.declaration.declarations,
        )

        Object.keys(nameMap).forEach((item) => {
          const variableDeclaration = t.variableDeclaration('const', [
            t.variableDeclarator(
              t.identifier(item),
              t.stringLiteral(nameMap[item].value),
            ),
          ])

          p.replaceWith(variableDeclaration)
        })

        exportNameMap = {
          ...exportNameMap,
          ...nameMap,
        }
      }
    },
  })

  let newCode = generate(ast).code

  const generateExportMap = (exportNameMap) => {
    const temp = {}
    Object.keys(exportNameMap).forEach((item) => {
      temp[item] = item
    })

    return temp
  }

  if (Object.keys(exportNameMap).length) {
    newCode = `${EXPORT_FUN(generateExportMap(exportNameMap))} ${newCode}`
  }

  // 下面添加模块标记代码
  newCode = `${ESMODULE_TAG_FUN} ${newCode}`

  return {
    file,
    dependencies: [importFilePath],
    code: newCode,
  }
}

// 递归解析多个文件
function parseFiles(entryFile) {
  // 解析入口文件
  const entryRes = parseFile(entryFile)
  // 将解析结果放入一个数组
  const results = [entryRes]

  // 循环结果数组，将它的依赖全部拿出来解析
  for (const res of results) {
    const dependencies = res.dependencies
    dependencies.map((dep) => {
      if (dep) {
        const ast = parseFile(dep)
        results.push(ast)
      }
    })
  }

  return results
}

// 使用ejs将上面解析好的ast传递给模板
// 返回最终生成的代码
function generateCode(allAst, entry) {
  const templateFile = fs.readFileSync(
    path.join(__dirname, './template.js'),
    'utf-8',
  )

  const codes = ejs.render(templateFile, {
    __TO_REPLACE_WEBPACK_MODULES__: allAst,
    __TO_REPLACE_WEBPACK_ENTRY__: entry,
  })

  return codes
}

const allAst = parseFiles(config.entry)

const codes = generateCode(allAst, config.entry)

fs.writeFileSync(path.join(config.output.path, 'main2.js'), codes)
