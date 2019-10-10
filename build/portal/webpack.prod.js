const path = require('path')
const utils = require('./utils')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const DotEnvWebpackPlugin = require('dotenv-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 使用dotenv读取.env文件，植入process.env

const envPath = path.resolve(__dirname, `./env/.env.${process.env.NODE_ENV}`)
utils.loadEnv(envPath)

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    publicPath: process.env.BUILD_PUBLIC_PATH || './',
    path: utils.resolve(`./dist/portal-${process.env.NODE_ENV}`),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].chunk.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new UglifyJsPlugin({
      parallel: true,
      sourceMap: process.env.NODE_ENV === 'test',
      uglifyOptions: {
        warnings: false
      }
    })],
  },
  plugins: [
    new CleanWebpackPlugin(),
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
    })
  ]
})


if (process.env.NODE_ENV === 'test') {
  prodWebpackConfig.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-analyze.html',
      openAnalyzer: true,
    })
  )
}


module.exports = prodWebpackConfig