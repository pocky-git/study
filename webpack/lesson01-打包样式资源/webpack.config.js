const { resolve } = require('path')

module.exports = {
    // 入口起点
    entry: './src/index.js',
    // 输出
    output: {
        // 输出文件名
        filename: 'build.js',
        // 输出路径
        path: resolve(__dirname,'build')
    },
    // loader配置
    module: {
        rules: [
            // 处理css文件
            {
                test: /\.css$/,
                // use中的loader是从下往上执行的
                use: [
                    // 在head中创建style标签，将js中的css插入
                    'style-loader',
                    // 将css变成commonjs模块加载到js中，里面的内容是样式字符串
                    'css-loader'
                ]
            },
            // 处理less文件
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 要下less-loader和less
                    'less-loader'
                ]
            }
        ]
    },
    // plugins配置
    plugins: [

    ],
    // 模式
    mode: 'development',
    // mode: 'production',
}