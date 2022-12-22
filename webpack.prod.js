const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader"
          ]
        }
      ],
  },
  plugins: [new HtmlWebpackPlugin({template: './public/index.html'}), new MiniCssExtractPlugin({
    filename: "css/[name][contenthash].css"
  })]
});