const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const config = require('./app.config')
const Dotenv = require('dotenv-webpack')

const port = process.env.PORT || 3000

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
        target: `${config.deploy.requestBaseUrl}/user`,
        changeOrigin: true,
        pathRewrite: {
          '^/api/user': ''
        }
      },
      '/api/msg': {
        target: `${config.deploy.requestBaseUrl}/msg`,
        changeOrigin: true,
        pathRewrite: {
          '^/api/msg': ''
        }
      },

      '/api/router': {
        target: `${config.deploy.requestBaseUrl}/router`,
        changeOrigin: true,
        pathRewrite: {
          '^/api/router': ''
        }
      },
      '/api/': {
        ws: false,
        target: `${config.deploy.requestBaseUrl}/`,
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
    new Dotenv({
      path: path.resolve(__dirname, './env/.env.development')
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here http://localhost:${port}`],
      }
    }),
  ]
})

module.exports = devWebpackConfig