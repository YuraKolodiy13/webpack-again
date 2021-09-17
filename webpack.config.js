const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminPlugin = require("imagemin-webpack");

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

const filename = ext => isDev ? `./${ext}/[name].${ext}` : `./${ext}/[name].[hash].${ext}`;

const getPlugins = () => {
  const plugins = [
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
      template: "./public/index.html",
      minify: {
        collapseWhitespace: !isDev,
      },
    }),
    new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    // new CleanWebpackPlugin()
  ];

  if(!isDev){
    plugins.push(new ImageminPlugin({
      bail: false, // Ignore errors on corrupted images
      cache: true,
      imageminOptions: {
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 5 }],
          [
            "svgo",
            {
              plugins: [
                {
                  removeViewBox: false
                }
              ]
            }
          ]
        ]
      }
    }))
  }

  return plugins
};

module.exports = {
  mode: mode,
  target: "web",
  entry: "./src/index.js",
  output: {
    assetModuleFilename: "media/[hash][ext][query]",
    path: path.resolve(__dirname, 'build'),
    filename: filename('js'),
    chunkFilename: '[id].[chunkhash].js',
    clean: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: isDev ? [] : [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    headers: {
      'header-webpack': 'webpack', // Adds headers to all responses:
    },
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true
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
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
  plugins: getPlugins()
};