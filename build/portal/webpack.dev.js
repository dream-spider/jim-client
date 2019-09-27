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
const serviceRequestUrl = process.env.SERVICE_REQUEST_URL

console.log(process.env.PORT, serviceRequestUrl, process.env.NODE_ENV)

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
    proxy: {
      '/api/user': {
        target: `${serviceRequestUrl}/user`,
        changeOrigin: true,
        pathRewrite: {
          '^/api/user': ''
        }
      },
      '/api/msg': {
        target: `${serviceRequestUrl}/msg`,
        changeOrigin: true,
        pathRewrite: {
          '^/api/msg': ''
        }
      },

      '/api/router': {
        target: `${serviceRequestUrl}/router`,
        changeOrigin: true,
        pathRewrite: {
          '^/api/router': ''
        }
      },
      '/api/': {
        ws: false,
        target: `${serviceRequestUrl}/`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
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