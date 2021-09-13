const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode: mode,
  entry: "./src/index.js",
  output: {
    assetModuleFilename: "images/[hash][ext][query]",
    path: path.resolve(__dirname, 'build'),
    filename: "[name].[hash].js",
    chunkFilename: '[id].[chunkhash].js'
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  devServer: {
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", ["@babel/preset-react", {
              runtime: "automatic"
            }]]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        type: "asset/resource",  //"asset", "asset/inline"
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.xml$/,
        use: 'xml-loader'
      },
      {
        test: /\.csv$/,
        use: 'csv-loader'
      },
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          globOptions: {
            ignore: ["**/index.html"],
          },
          to: path.resolve(__dirname, 'build')
        }
      ]
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html"
    }),

    new CleanWebpackPlugin()
  ]
};