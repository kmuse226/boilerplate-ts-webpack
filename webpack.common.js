module.exports = {
    entry: ["core-js/stable",'./src/index.ts'],
    output: {
        path: __dirname + '/dist',
        filename: 'js/main.js',
        assetModuleFilename: 'images/[hash][ext][query]'
      },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|webp)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.m?ts$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(tsx|ts)?$/i,
          exclude: /node_modules/,
          use: ['ts-loader']
        }
      ],
    }
  };