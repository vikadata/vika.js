const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: './lib/index.ts',
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
      isBrowserEnv: true,
    })
  ],
  output: {
    filename: 'vika.browser.js',
    path: __dirname,
  },
};
