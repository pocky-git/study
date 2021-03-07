const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname,'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname,'dll/manifest.json')
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname,'dll/jquery.js'),
            outputPath: 'dll',
            publicPath: 'dll'
        })
    ],
    mode: 'production'
}