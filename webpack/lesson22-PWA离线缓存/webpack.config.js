const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].[chunkhash:10].js',
        path: resolve(__dirname,'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    mode: 'production',
    devtool: 'source-map'
}