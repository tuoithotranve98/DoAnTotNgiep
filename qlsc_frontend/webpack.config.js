const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const ROOT_DIRECTORY = path.join(__dirname, '..')
const SRC_DIRECTORY = path.join(ROOT_DIRECTORY, 'src')
const DIST_DIRECTORY = path.join(ROOT_DIRECTORY, 'dist')

const config = {
  entry: [path.resolve(__dirname, './src/index.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    compress: false,
    open: true,
    stats: 'errors-only',
    port: 8686,
  },
  mode: 'development',
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    // new CopyWebpackPlugin(
    //   {
    //     patterns: [
    //       { from: path.join(SRC_DIRECTORY, '/src'), to: path.join(ROOT_DIRECTORY, 'build'), noErrorOnMissing: true }
    //     ]
    //   }
    // )
  ],
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
    ]
  }
}

module.exports = config
