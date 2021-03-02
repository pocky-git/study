const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            // 处理less资源
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            // 处理css中的图片资源
            // 需要下载 file-loader url-loader (url-loader依赖file-loader)
            {
                test: /\.(jpg|png|gif)$/,
                //只需要一个loader是可以使用 loader: xxx 否则使用 use: []
                loader: 'url-loader',
                options: {
                    // 将小于8kb的图片转换为base64格式
                    // 优点：减少服务器请求次数，减轻服务器的压力
                    // 缺点：图片大小变大，请求时间变长
                    limit: 3 * 1024,
                    name: '[hash:10].[ext]',
                    // url-loader使用的是es6模块化解析 而html-loader使用的是commonjs 所以要把url-loader默认的es6模块化解析关闭
                    esModule: false
                }
            },
            // 处理html中的图片资源
            // 负责引入img 从而能够被url-loader处理
            {
                test: /\.html$/i,
                // 使用0.5.5版本可以正常引入图片
                loader: 'html-loader'
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