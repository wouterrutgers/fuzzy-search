const mix = require('laravel-mix');

mix.webpackConfig({
  output: {
    library: 'FuzzySearch',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: "(typeof window !== 'undefined' ? window : this)",
  },
}).js('src/FuzzySearch.js', 'dist/');
