const babel = require('@babel/core')

const code = `function mirror(something) {
  return something
}`

const res = babel.transformSync(code, {
    plugins: [
        [require('./babel-plugin-test.js'), {
            whenFalsy: 'Nothing really.'
        }]
    ]
})

console.log(res.code)