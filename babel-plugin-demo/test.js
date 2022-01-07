const parser = require('@babel/parser')
const generate = require('@babel/generator').default
const traverse = require('@babel/traverse').default
const template = require('@babel/template').default

const code = `function mirror(something) {
    return something
}`

const ast = parser.parse(code, {
  sourceType: 'module',
})

const visitor = {
    FunctionDeclaration(path) {
        const temp = template(`
            if(something) {
                NORMAL_RETURN
            } else {
                return 'nothing'
            }
        `)

        const returnNode = path.node.body.body[0]
        const tempAst = temp({
            NORMAL_RETURN: returnNode
        })
        path.node.body.body[0] = tempAst
    }
}

traverse(ast, visitor)


const transformedCode = generate(ast).code
console.log(transformedCode)

