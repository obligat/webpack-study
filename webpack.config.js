const path = require("path")
const HelloWorldPlugin = require('./webpack-plugin')

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HelloWorldPlugin()
    ]
}