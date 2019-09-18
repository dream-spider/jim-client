const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')


const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devServer: {
    hot: true,
    compress: true,
    port: 3000,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/portal/index.html',
      inject: true,
    })
  ]
})


module.exports = devWebpackConfig