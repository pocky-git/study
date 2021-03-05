const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].[chunkhash:10].js',
        path: resolve(__dirname,'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    // 单入口是添加以下配置 会将node_module单独打包成一个chunk
    // 多入口时添加以下配置 会看有没有公用的包 如果有的话会单独打包成一个chunk
    // 通过在js中加入import('./test') 可以将引入的js单独打包成一个chunk并且按需加载
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    mode: 'production'
}