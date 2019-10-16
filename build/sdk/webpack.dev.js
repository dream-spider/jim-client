const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const utils = require('../utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const serviceRequestCtx = process.env.SERVICE_REQUEST_CTX
const serviceRequestUrl = process.env.SERVICE_REQUEST_URL

module.exports = portfinder.getPortPromise({
  port: process.env.PORT || 3000,
}).then((port) => {
  let proxy = {}
  proxy[serviceRequestCtx] = {
    target: serviceRequestUrl,
    changeOrigin: true,
    pathRewrite: {}
  }
  proxy[serviceRequestCtx].pathRewrite[`^${serviceRequestCtx}`] = ''

  return merge(baseWebpackConfig, {
    context: utils.resolve('.'),
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      hot: true,
      compress: true,
      port: port,
      publicPath: '/',
      clientLogLevel: 'warning',
      quiet: true,
      proxy: proxy
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './app/sdk/index.html',
        inject: true,
      }),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [
            `You application is running here http://localhost:${port}`
          ],
        }
      }),
    ],
  })
})
