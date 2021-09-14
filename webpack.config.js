const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

module.exports = {
  mode: mode,
  entry: "./src/index.js",
  output: {
    assetModuleFilename: "media/[hash][ext][query]",
    path: path.resolve(__dirname, 'build'),
    filename: "[name].[hash].js",
    chunkFilename: '[id].[chunkhash].js'
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    headers: {
      'header-webpack': 'webpack', // Adds headers to all responses:
    },
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
            }]],
            plugins: isDev ? ["react-refresh/babel"] : []
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
        type: "asset/resource"
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
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    new CleanWebpackPlugin()
  ]
};