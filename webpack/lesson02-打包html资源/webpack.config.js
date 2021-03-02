// loader: 1.下载 2.使用
// plugin: 1.下载 2.引入 3.使用

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: []
    },
    plugins: [
        // 打包html资源 默认是一个空的html 只引入了css和js资源
        new HtmlWebpackPlugin({
            // 复制 './src/index.html' 并自动引入css和js资源
            template: './src/index.html'
        })
    ],
    mode: 'development'
}