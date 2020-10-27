const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const port = process.env.PORT || 8001

module.exports = {
  ...webpackConfig,
  mode: 'development',
  watch: true,
  entry: {
    hot: 'webpack/hot/dev-server',
    checkin: __dirname + '/src/index.tsx'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, '/public'), // index.html的位置
    port: port,
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
        target:
          'https://statusconnect-dev.azurewebsites.net/StatusConnect/api/V1',
        // target: 'http://localhost:8080/StatusConnect/api/V1',
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
