const utils = require('../utils')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    publicPath: process.env.BUILD_PUBLIC_PATH || './',
    path: utils.resolve(`./dist/portal-${process.env.NODE_ENV}`),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].chunk.js',
  },
  optimization: {
    moduleIds: 'hashed', // 如果module引入顺序变化，不会引起vendor hash变化
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            const regexp = new RegExp(/[@]/g)
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace(regexp, '')}`;
          },
        },
      },
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
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-analyze.html',
      openAnalyzer: false,
    })
  ]
})


module.exports = prodWebpackConfig