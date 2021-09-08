const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode: mode,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "[name].[hash].js",
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  devServer: {
    hot: true,
  },
  resolve: {
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
        use: 'file-loader'
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
    new HtmlWebPackPlugin({
      template: "./public/index.html"
    }),
    new CleanWebpackPlugin()
  ]
};