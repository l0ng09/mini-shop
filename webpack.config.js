const path = require('path');
const CopyPlugin = require('copy-webpack-plugin')
const loadpath = require('./plugin/loadpath')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const srcdir = path.resolve(__dirname, 'src')
const putdir = path.resolve(__dirname, 'dist')
module.exports = {
  // entry: {
  //   'app': './src/miniprogram/app.js',
  //   'pages/cart/cart': './src/miniprogram/pages/cart/cart.js',
  //   'pages/detail/detail': './src/miniprogram/pages/detail/detail.js',
  //   'pages/index/index': './src/miniprogram/pages/index/index.js',
  //   'pages/order/order': './src/miniprogram/pages/order/order.js',
  //   'pages/submit/submit': './src/miniprogram/pages/submit/submit.js',
  // },
  // 利用插件实现自动化引入
  entry: (new loadpath()).init({
    src: path.resolve(srcdir, 'miniprogram/app.js')
  }),
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(putdir, 'miniprogram')
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader'
    }]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(srcdir, 'cloudfunctions'),
        to: path.resolve(putdir, 'cloudfunctions')
      }, {
        from: path.resolve(srcdir, 'miniprogram'),
        to: path.resolve(putdir, 'miniprogram'),
        globOptions: {
          ignore: ['**/*.js'],
        }
      }]
    })
  ]
};