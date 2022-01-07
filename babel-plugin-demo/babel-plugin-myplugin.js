module.exports = (api, options, dirname) => {
  return {
    visitor: {
      FunctionDeclaration(path, state) {
        const pathBody = path.get('body')
        if (path.node.leadingComments) {
          const leadingComments = path.node.leadingComments.filter((comment) =>
            /\@inject:(\w+)/.test(comment.value),
          )
          leadingComments.forEach((comment) => {
            const injectTypeMatchRes = comment.value.match(/\@inject:(\w+)/)

            if (injectTypeMatchRes) {
              const injectType = injectTypeMatchRes[1]

              const sourceModuleList = Object.keys(options)

              if (sourceModuleList.includes(injectType)) {
                const codeIndex = pathBody.node.body.findIndex(
                  (block) =>
                    block.leadingComments &&
                    block.leadingComments.some((comment) =>
                      new RegExp(`@code:\s?${injectType}`).test(comment.value),
                    ),
                )
                if (codeIndex === -1) {
                  pathBody.node.body.unshift(
                    api.template.statement(
                      `${state.options[injectType].identifierName}()`,
                    )(),
                  )
                } else {
                  pathBody.node.body.splice(
                    codeIndex,
                    0,
                    api.template.statement(
                      `${state.options[injectType].identifierName}()`,
                    )(),
                  )
                }
              }
            }
          })
        }
      },
    },
  }
}
