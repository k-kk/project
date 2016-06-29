var gulp = require('gulp');
var size = require('gulp-size');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');


gulp.task('sass', funcion() {
  gulp.src('../src/static/css/sass/*.a.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['Firefox < 20', '>1%'],
      cascade: false
    }))
    .pipe(gulp.dest(''));
});
