const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'production',
  //devtool: 'cheap-module-eval-source-map',
  entry: {
    main : [
      './src/index.js'
    ]
  },
  resolve: {
    // extensions: ['.js', '.jsx'],
    // alias: {
    //   components: path.resolve(__dirname, 'src/components/')
    // },
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'bundle'),
    publicPath: '/',
    filename: 'js/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.json?$/,
        exclude: /node_modules/,
        use: ['json-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
        // test: /\.css$/,
        // exclude: /node_modules/,
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: 'css-loader',
        // }),
      },
      {
        // test: /\.scss?$/,
        // exclude: /node_modules/,
        // use: ['style-loader', 'css-loader', 'sass-loader'],
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true, //Update this to true or false
  },
  plugins: [
    new ExtractTextPlugin('css/main.css'),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify('prod'),
    })
  ]
};
