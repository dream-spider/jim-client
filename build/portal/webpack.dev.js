const path = require('path')
const utils = require('./utils')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const DotEnvWebpackPlugin = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

// 使用dotenv读取.env文件，植入process.env
const envPath = path.resolve(__dirname, './env/.env.development')
utils.loadEnv(envPath)

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
        template: './app/portal/index.html',
        inject: true,
      }),
      new DotEnvWebpackPlugin({
        path: envPath
      }),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [
            `You application is running here http://localhost:${port}`,
            serviceRequestUrl ? `Requesting from ${serviceRequestUrl}` : `"SERVICE_REQUEST_URL" is not loaded from env file`,
          ],
        }
      }),
    ]
  })
})