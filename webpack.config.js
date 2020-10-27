const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.css'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@checkin': path.resolve(__dirname, './src/sites/checkin'),
      '@obd': path.resolve(__dirname, './src/sites/onboarding')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }]
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              localsConvention: 'camelCaseOnly',
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.(svg)$/,
        loader: 'react-svg-loader',
        include: [
          path.resolve(__dirname, './src/assets/icons'),
          path.resolve(
            __dirname,
            './src/sites/onboarding/views/components/HsEditor/icons'
          )
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'css/',
          publicPath: url => '../css/' + url
        }
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        loader: 'url-loader?limit=100000',
        exclude: [
          path.resolve(__dirname, './src/assets/icons'),
          path.resolve(
            __dirname,
            './src/sites/onboarding/views/components/HsEditor/icons'
          )
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: `./.env.${process.env.NODE_ENV}`
    }),
    new ForkTsCheckerWebpackPlugin({
      workers: 4,
      checkSyntacticErrors: true,
      useTypescriptIncrementalAPI: true,
      async: false,
      watch: ['src/']
    })
  ]
}
