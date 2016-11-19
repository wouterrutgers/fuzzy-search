const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  output: {
    path: './dist',
    filename: 'FuzzySearch.js',
    library: 'FuzzySearch',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: { presets: ['es2015'] },
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      comments: false,
    }),
  ],
};
