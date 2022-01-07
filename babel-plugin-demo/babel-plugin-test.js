module.exports = function (babel) {
  const { types: t, template } = babel

  const visitor = {
    FunctionDeclaration(path, state) {
      const temp = template(`
            if(something) {
                NORMAL_RETURN
            } else {
                return '${state.opts.whenFalsy}'
            }
        `)

      const returnNode = path.node.body.body[0]
      const tempAst = temp({
        NORMAL_RETURN: returnNode,
      })
      path.node.body.body[0] = tempAst
    },
  }

  return {
      name: 'test',
      visitor
  }
}
