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
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                exclude: /\.(html|css|js|less)/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
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
    // 开发服务器（自动编译，自动打开浏览器，自动刷新浏览器）
    // 只会在内存中编译打包，不会有任何输出
    // 使用webpack-dev-server要将webpack-cli的版本降到3.x.x的版本 否则报错 参考：https://www.cnblogs.com/jeacy/p/13864454.html
    devServer: {
        // 项目构建路径
        contentBase: resolve(__dirname,'build'),
        // 启动在哪个端口
        port: 3000,
        // 开启gzip压缩 使代码体积更小 速度更快
        compress: true,
        // 自动打开浏览器
        open: true
    }
}