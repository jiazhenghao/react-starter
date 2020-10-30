const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackConfig = require('./webpack.config')

const port = process.env.PORT || 8001

// for dev environment, use inline-source-map instead to better debug
const myDevConfig = webpackConfig
myDevConfig.devtool = 'inline-source-map'

module.exports = {
  ...myDevConfig,
  mode: 'development',
  watch: true,
  entry: {
    hot: 'webpack/hot/dev-server',
    checkin: path.join(__dirname, '/src/index.tsx')
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, '/public'), // index.html的位置
    port,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    },
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  plugins: [
    ...webpackConfig.plugins,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
