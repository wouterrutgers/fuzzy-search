const mix = require('laravel-mix');

mix.setPublicPath('./');

if (process.env.TESTING) {
  mix.js('./tests/test.js', './tests/compiled/');
} else {
  mix.webpackConfig({
    output: {
      library: 'FuzzySearch',
      libraryTarget: 'umd',
    },
  }).js('src/FuzzySearch.js', 'dist/');
}
