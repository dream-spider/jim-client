const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve (dir) {
  return path.join(__dirname, '../..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../../'),
  entry: {
    app: './app/portal/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: {
      '@isdk': resolve('isdk'),
      '@': resolve('./app/portal/src'),
      '@modules': resolve('./app/portal/src/modules')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: 'vue-style-loader!css-loader',
            scss: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "vue-style-loader" // 将 JS 字符串生成为 style 节点
        }, {
            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
        }, {
            loader: "sass-loader" // 将 Sass 编译成 CSS
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}