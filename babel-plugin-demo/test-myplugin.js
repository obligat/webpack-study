const fs = require('fs')
const path = require('path')
const babel = require('@babel/core')

// 读取入口文件
const fileContent = fs.readFileSync('./trans.js', 'utf-8')

const res = babel.transformSync(fileContent, {
  plugins: [
    [
      require('./babel-plugin-myplugin.js'),
      {
        log: {
          kind: 'named',
          require: 'log4js',
        },
      },
    ],
  ],
})

console.log(res.code)
