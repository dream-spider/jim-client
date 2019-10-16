const path = require('path')
const utils = require('../utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
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
  return {
    context: utils.resolve('.'),
    mode: 'development',
    entry: {
      sdk: utils.resolve('./app/sdk/main.js'),
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      alias: {
        'isdk': utils.resolve('isdk'),
      }
    },
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
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] }
        }
      ]
    },
  }
})
