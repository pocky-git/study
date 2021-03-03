const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 提取css成单独的文件而不是直接把css放在js中 这样能提高js的加载速度 同时避免闪屏现象
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/build.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 由于style-loader会将js中的css放在style标签里
                    // 所以使用MiniCssExtractPlugin的loader代替style-loader
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/build.css'
        })
    ],
    mode: 'development'
}