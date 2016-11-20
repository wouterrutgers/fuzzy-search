const webpack = require('webpack');

module.exports = {
  default: {
    entry: './src/FuzzySearch.js',
    devtool: 'source-map',
    output: {
      path: './dist',
      filename: 'FuzzySearch.js',
      library: 'FuzzySearch',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    module: {
      preLoaders: [
        {
          enforce: 'pre',
          test: /src[\/\\][^.]+\.js/,
          loader: 'eslint-loader',
        },
      ],
      loaders: [
        {
          loader: 'babel-loader',
          query: { presets: ['es2015'] },
        },
      ],
    },
  },
  production: {
    entry: './src/FuzzySearch.js',
    devtool: 'source-map',
    output: {
      path: './dist',
      filename: 'FuzzySearch.min.js',
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
  },
  test: {
    entry: './tests/test.js',
    output: {
      path: './tests/compiled',
      filename: 'test.js'
    },
    module: {
      loaders: [
        {
          loader: 'babel-loader',
          query: { presets: ['es2015'] },
        },
      ],
    },
  },
};
