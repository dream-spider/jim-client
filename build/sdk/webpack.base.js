const path = require('path')
const utils = require('../utils')
const DotEnvWebpackPlugin = require('dotenv-webpack')

const { envPath } = utils.loadEnv(path.resolve(__dirname))

module.exports = {
  context: utils.resolve('.'),
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
  plugins: [
    new DotEnvWebpackPlugin({
      path: envPath,
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