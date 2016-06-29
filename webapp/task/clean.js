var gulp = require('gulp');
var size = require('gulp-size');
var clean = require('gulp-clean');

gulp.task('clean', function() {
  return gulp.src('./build')
    .pipe(clean());
});
