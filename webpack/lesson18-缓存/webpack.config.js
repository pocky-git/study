const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV = 'production'

const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: ['postcss-preset-env']
            }
        }
    }
]

/* 
    1.babel-loader配置中添加cacheDirectory
        不会重新构建没有变化的js文件，可以让第二次构建的速度变得更快
    2.给文件名添加hash值，由于文件资源缓存导致代码更新后浏览器不会去向服务器请求最新的代码
      所以需要改变构建后的静态资源文件名来强制浏览器去服务器请求最新的资源
        hash:        每次构建都会生成一个新的hash，这样的话所有文件名都会改变，都会去服务器重新请求资源
        chunkhash:   根据chunk生成一个新的hash，如果打包来源于同一个chunk，那么会生成同样的的hash值
                     而index.js中会引入其他资源，那么这些资源的has值都会改变
        contenthash: 会根据文件内容生成新的hash值，所以如果文件内容发生改变就会生成新的hash值，而其他
                     内容没有改变的文件hash值不会变化，就不会重新去服务器请求资源

*/

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/build.[chunkhash:10].js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                enforce: 'pre',
                options: {
                    fix: true
                }
            },
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        use: [...commonCssLoader, 'less-loader']
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: {
                                            version: 3
                                        },
                                        targets: {
                                            chrome: '60',
                                            firefox: '60',
                                            ie: '9',
                                            safari: '10',
                                            edge: '17'
                                        }
                                    }
                                ]
                            ],
                            cacheDirectory: true
                        }
                    },
                    {
                        test: /\.(jpg|png|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 3 * 1024,
                            name: '[hash:10].[ext]',
                            esModule: false,
                            outputPath: 'images'
                        }
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    {
                        exclude: /\.(html|js|css|less|jpg|png|gif)$/,
                        loader: 'file-loader',
                        options: {
                            name: '[hash:10].[ext]',
                            outputPath: 'media'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/build.[chunkhash:10].css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    mode: 'production'
}