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
             * eslint语法检查：
             * 1.下载 eslint eslint-loader
             * 2.下载 eslint-config-airbnb-base eslint-plugin-import 来使用airbnb的语法格式
             * 3.在package.json中添加
             *   "eslintConfig": {
             *      "extends": "airbnb-base"
             *   }
             */
            {
                test: /\.js$/,
                // node_modules不需要进行语法检查
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 添加该属性后会自动帮你格式化js代码
                    fix: true
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