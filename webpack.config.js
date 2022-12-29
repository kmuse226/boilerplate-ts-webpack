/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
// const devMode = process.env.NODE_ENV !== "production";
// process.env.NODE_ENV = 'production'

module.exports = {
    entry: '/src/index.ts',
    output: {
        path: __dirname + '/dist',
        filename: 'js/main.js',
        assetModuleFilename: 'images/[hash][ext][query]'
      },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            // "style-loader",
            "css-loader"
          ],
        },
        {
          test: /\.(png|jpg|webp)$/i,
          type: 'asset/resource'
        }
      ],
    },
    plugins: [].concat([new MiniCssExtractPlugin({
      filename: "css/[name][contenthash].css",
    }), new HtmlWebpackPlugin()]),
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 5000,
    },
  };