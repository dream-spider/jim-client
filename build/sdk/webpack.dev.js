const utils = require('../utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

module.exports = portfinder.getPortPromise({
  port: process.env.PORT || 3000,
}).then((port) => {
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
      proxy: {
        '/api': {
          target: 'http://60.173.195.121:9906/jim-router',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/'
          }
        }
      }
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