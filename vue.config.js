/* eslint-disable */
const config = require('./src/config')
const path = require('path')
const getAssetPath = require('@vue/cli-service/lib/util/getAssetPath')
module.exports = {
  devServer: {
    open: false,
    port: 8000,
    proxy: {
      '/user': {
        target: `${config.deploy.requestBaseUrl}/user`,
        changeOrigin: true,
        pathRewrite: {
          '^/user': ''
        }
      },
      '/msg': {
        target: `${config.deploy.requestBaseUrl}/msg`,
        changeOrigin: true,
        pathRewrite: {
          '^/msg': ''
        }
      },

      '/router': {
        target: `${config.deploy.requestBaseUrl}/router`,
        changeOrigin: true,
        pathRewrite: {
          '^/router': ''
        }
      },
      '/': {
        ws: false,
        target: `${config.deploy.requestBaseUrl}/`,
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  },
  configureWebpack: config => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@common': path.resolve(__dirname, './src/common'),
      '@components': path.resolve(__dirname, './src/components'),
      '@store': path.resolve(__dirname, './src/store'),
      '@router': path.resolve(__dirname, './src/router'),
      '@business': path.resolve(__dirname, './src/business')
    }
  },
  publicPath: process.env.VUE_APP__PUBLIC_PATH
  // chainWebpack: config => {
  //   var fontsRule = config.module.rule('fonts');
  //   fontsRule.use('url-loader')
  //   .tap(options => {
  //     console.dir(options)
  //     options.name = `../ css / fonts / [name].[hash: 8].[ext]`;
  //   })
  // }
}
