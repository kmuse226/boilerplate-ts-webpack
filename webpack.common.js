/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });
console.log(process.env.ENV_VAR1);
console.log(process.env.ENV_VAR2);
console.log(process.env.ENV_VAR3);

// dotenv.config({path:path.join(__dirname,'.env.production')});
// console.log(process.env.PRODUCT_VAR1)
// console.log(process.env.PRODUCT_VAR2)
// console.log(process.env.PRODUCT_VAR3)

console.log(process.env.NODE_ENV, 'webpack node key');
console.log(
  process.env.NODE_ENV == 'production' ? 'progress build' : 'progress dev',
);

module.exports = {
  entry: ['core-js/stable', './src/index.ts'],
  output: {
    path: __dirname + '/dist',
    filename: 'js/main.js',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(tsx|ts)?$/i,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ],
  },
};
