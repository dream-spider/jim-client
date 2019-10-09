const path = require('path')
const utils = require('./utils')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const DotEnvWebpackPlugin = require('dotenv-webpack')

// 使用dotenv读取.env文件，植入process.env

const envPath = path.resolve(__dirname, `./env/.env.${process.env.NODE_ENV}`)
utils.loadEnv(envPath)

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    publicPath: process.env.BUILD_PUBLIC_PATH || './',
    path: utils.resolve('./dist/portal'),
    filename: '[name].[hash].js'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      parallel: true,
      sourceMap: false,
      uglifyOptions: {
        warnings: false
      }
    })],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/portal/index.html',
      inject: true,
    }),
    new DotEnvWebpackPlugin({
      path: envPath,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ]
})

module.exports = prodWebpackConfig