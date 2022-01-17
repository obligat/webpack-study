const path = require("path")
const Style9Plugin = require('style9/webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts|js|jsx)$/,
                use: Style9Plugin.loader
            }, 
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new Style9Plugin(),
        new MiniCssExtractPlugin({
            filename: 'index.css'
        })
    ]
}