/* 
    HMR: 模块热替换，只会更新做了修改的模块，加快了构建的速度
    1.css开启HMR: style-loader已经实现了
    2.js开启HMR: 需要修改index.js代码
    3.html在开启HMR后不刷新，需要在entry中加入'./src/index.html'
*/

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['./src/js/index.js', './src/index.html'],
    output: {
        filename: 'js/build.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            // 处理less资源
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            // 处理css资源
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            // 处理css中的图片资源
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 3 * 1024,
                    name: '[hash:10].[ext]',
                    outputPath: 'images',
                    esModule: false
                }
            },
            // 处理html中的图片资源
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // 处理其他资源
            {
                exclude: /\.(html|css|less|js|jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname,'build'),
        port: 3000,
        compress: true,
        open: true,
        hot: true
    }
}