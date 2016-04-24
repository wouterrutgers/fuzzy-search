var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var mocha = require('gulp-spawn-mocha');
var umd = require('gulp-umd');
var path = require('path');
var runSequence = require('run-sequence');

var umdOptions = {
  exports: function() {
    return 'FuzzySearch';
  },
  namespace: function() {
    return 'FuzzySearch';
  },
  template: path.join(__dirname, 'umd-template.js'),
};

gulp.task('default', function(callback) {
  runSequence('compile', 'minify', 'test', callback);
});

gulp.task('compile', function() {
  return gulp.src('src/Fuzzy-search.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('fuzzy-search.js'))
    .pipe(umd(umdOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('minify', function() {
  return gulp.src('src/Fuzzy-search.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('fuzzy-search.min.js'))
    .pipe(umd(umdOptions))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('test', function() {
  return gulp.src(['test/*.js'], {read: false})
    .pipe(mocha({
      debugBrk: true,
      R: 'spec',
      istanbul: true
    }));
});

gulp.task('watch', function() {
  gulp.watch('{src,test}/*', ['compile', 'test']);
});
