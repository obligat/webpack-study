module.exports = {
    plugins: [
        ['./babel-plugin-myplugin.js', {
            log: {
                kind: 'named',
                require: 'log4js'
            }
        }]
    ]
}