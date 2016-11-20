const gulp = require('gulp');
const uglify = require('gulp-uglify');
const path = require('path');
const webpack = require('webpack');
const easySauce = require('easy-sauce');
const process = require('process');

gulp.task('webpack', callback => {
  let config = require('./webpack.config');
  let index = 0;

  const output = err => {
    if (err) {
      throw new err;
    }

    index++;

    if (index < queue.length) {
      queue[index]();
    } else {
      callback();
    }
  };

  const queue = [
    () => {
      config.entry = './src/FuzzySearch.js';
      webpack(config, output);
    },
    () => {
      config.entry = './src/FuzzySearch.js';
      config.output.filename = 'FuzzySearch.min.js';
      webpack(config, output);
    },
    () => {
      config.entry = './tests/test.js';
      config.output = { path: './tests/compiled', filename: 'test.js' };
      webpack(config, output);
    },
  ];

  queue[0]();
});

gulp.task('test', ['webpack'], () => {
  easySauce({
    username: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_KEY,
    testPath: '/tests/index.html',
    platforms: [
      // Windows
      ['Windows 10', 'chrome', 'latest'],
      ['Windows 10', 'MicrosoftEdge', 'latest'],
      ['Windows 10', 'firefox', 'latest'],
      ['Windows 7', 'internet explorer', '11.0'],
      ['Windows 7', 'internet explorer', '10.0'],
      ['Windows 7', 'internet explorer', '9.0'],

      // Linux
      ['Linux', 'chrome', 'latest'],
      ['Linux', 'firefox', 'latest'],

      // OS X
      ['OS X 10.11', 'chrome', 'latest'],
      ['OS X 10.11', 'safari', '10.0'],
      ['OS X 10.11', 'firefox', 'latest'],
    ],
  }).on('message', message => console.log(message))
    .on('update', job => console.log(job.status))
    .on('done', (passed, jobs) => {
      if (passed) {
        console.log('All tests passed!');
      } else {
        console.log('Oops, there were failures');

        jobs.forEach(job => {
          if (job.result.failures > 0) {
            console.log(`- ${job.url}`);
          }
        });
      }
    }).on('error', err => console.error(err.message));
});

gulp.task('watch', () => {
  gulp.watch('src/*', ['webpack']);
});
