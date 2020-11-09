const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin') // https://algobank.oecd.org:4430/SDG_tracker/SDG_website/tree/d97d0706229da0f0a44c55ee0f75786a95a9fa73/node_modules/fork-ts-checker-webpack-plugin
const Dotenv = require('dotenv-webpack')

module.exports = {
  devtool: 'source-map',
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
      'jsx',
      '.json',
      '.css',
      '.csv',
      '.jpg',
      '.png',
      '.jpeg',
      'bmp',
      'gif',
      'svg'
    ],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }]
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              // modules: true // Enables/Disables CSS Modules
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048
              // fallback: require.resolve('responsive-loader') // default fallback is file-loader
            }
          }
        ]
      },
      {
        test: /\.(bmp|jpeg|svg)$/i,
        loader: 'file-loader',
        options: {
          name() {
            if (process.env.NODE_ENV === 'development') {
              return '[path][name].[ext]?[hash:8]'
            }
            return '[contenthash].[ext]'
          },
          outputPath: 'images',
          publicPath: 'assets'
        }
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
    }),
    new ForkTsCheckerWebpackPlugin({
      // Speeds up TypeScript type checking and ESLint linting (by moving each to a separate process)
      workers: 2, // if you have 4cpus, give at least 2 for build and system
      checkSyntacticErrors: false, // default setting, with ts-loader, only check semantic errors, because ts-loader will check syntactic errors
      useTypescriptIncrementalAPI: true, // Defaults to true when working with typescript 3+ and false when below 3
      async: true, // reports issues after webpack's compilation is done. it doesn't block the compilation. Used only in the watch mode
      watch: ['src/']
    })
  ]
}
