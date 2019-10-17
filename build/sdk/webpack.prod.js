const utils = require('../utils')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseWebpackConfig, {
  context: utils.resolve('.'),
  mode: 'production',
  entry: {
    sdk: utils.resolve('./app/sdk/index.ts'),
  },
  output: {
    path: utils.resolve(`./dist/sdk`),
    filename: '[name].bundle.js',
    library: 'JimSDK',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-analyze.html',
      openAnalyzer: true,
    })
  ]
})