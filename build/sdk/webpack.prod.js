const utils = require('../utils')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  context: utils.resolve('.'),
  mode: 'production',
  entry: {
    sdk: utils.resolve('./app/sdk/index.ts'),
  },
  output: {
    path: utils.resolve(`./dist/sdk`),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      'isdk': utils.resolve('isdk'),
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}