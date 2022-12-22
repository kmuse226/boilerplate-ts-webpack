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
          test: /\.(png|jpg|webp)$/i,
          type: 'asset/resource'
        }
      ],
    }
  };