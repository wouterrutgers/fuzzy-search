var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var mocha = require('gulp-spawn-mocha');

gulp.task('default', ['compile', 'minify', 'test']);

gulp.task('compile', function() {
  process.stdout.write('\033[2J');

  return gulp.src('src/Fuzzy-search.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('fuzzy-search.js'))
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
