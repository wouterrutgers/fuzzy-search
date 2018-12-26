const mix = require('laravel-mix');

mix.webpackConfig({
  output: {
    library: 'FuzzySearch',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
}).js('src/FuzzySearch.js', 'dist/');
