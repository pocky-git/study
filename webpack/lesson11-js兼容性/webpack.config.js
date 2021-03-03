const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/build.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            /**
             * js兼容性处理 需要下载babel-loader @babel/core @babel/preset-env core-js
             * 1. @babel/preset-env: 只做基本的兼容性处理，promise等无法做兼容性处理
             * 2. core-js: 需要做兼容性处理的就会去做
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // 预设：指示babel要做怎样的兼容性处理
                    presets: [
                        [
                            '@babel/preset-env', 
                            {
                                // 按需加载
                                useBuiltIns: 'usage',
                                // 指定corejs的版本
                                corejs: {
                                    version: 3
                                },
                                // 指定需要兼容的浏览器版本
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}