const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
 module: {
    rules: [
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            "css-loader"
          ],
        }
      ],
 },
  plugins: [new HtmlWebpackPlugin()],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    compress: true,
    port: 5000,
    headers: {
      "X-Frame-Options": "SAMEORIGIN"
    },
  },
});