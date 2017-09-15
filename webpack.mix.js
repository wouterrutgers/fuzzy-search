const mix = require('laravel-mix');

if (process.env.TESTING) {
  mix.js('./tests/test.js', './tests/compiled/');
} else {
  mix.webpackConfig({
      output: {
        library: 'FuzzySearch',
        libraryTarget: 'umd',
      },
    })
    .js('src/FuzzySearch.js', 'dist/');
}
