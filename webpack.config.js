const webpack = require('webpack');
module.exports = {
  entry: './lib/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      isBundleForBrowser: true,
    })
  ],
  output: {
    libraryTarget: 'umd',
    filename: './dist/vika.umd.js',
    path: __dirname,
  },
};
