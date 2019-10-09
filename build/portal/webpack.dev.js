const path = require('path')
const utils = require('./utils')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const DotEnvWebpackPlugin = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

// 使用dotenv读取.env文件，植入process.env
const envPath = path.resolve(__dirname, './env/.env.development')
utils.loadEnv(envPath)

const port = process.env.PORT || 3000
const serviceRequestCtx = process.env.SERVICE_REQUEST_CTX
const serviceRequestUrl = process.env.SERVICE_REQUEST_URL

console.log(process.env.PORT, serviceRequestCtx, serviceRequestUrl, process.env.NODE_ENV)

const makeDevProxy = function () {
  let proxy = {}
  proxy[path.join(serviceRequestCtx)] = {
    target: serviceRequestUrl,
    changeOrigin: true,
    pathRewrite: {}
  }
  proxy[path.join(serviceRequestCtx)].pathRewrite[path.join('^/', serviceRequestCtx)] = ''
  return proxy
}

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    compress: true,
    port: port,
    publicPath: '/',
    clientLogLevel: 'warning',
    quiet: true,
    proxy: makeDevProxy()
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
          serviceRequestUrl ? `Requesting from ${serviceRequestUrl}` : `"SERVICE_REQUEST_URL" is not loaded from env file`
        ],
      }
    }),
  ]
})

module.exports = devWebpackConfig