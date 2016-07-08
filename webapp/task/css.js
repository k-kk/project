var gulp = require('gulp');
var size = require('gulp-size');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var path = require('./path.js');
var browser = require('browser-sync').create();
var reload = browser.reload;


gulp.task('sass', function() {
  gulp.src(path.css.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['Firefox < 20', '>1%'],
      cascade: false
    }))
    .pipe(reload({
      stream: true
    }))
    .pipe(gulp.dest('src/static/css/'));
});
