var gulp = require('gulp');
var size = require('gulp-size');
var htmlmin = require('gulp-htmlmin');

gulp.task('compressHtml', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(size({
      title: 'html',
      pretty: true
    }))
    .pipe(gulp.dest('./build/'));
});

gulp.task('compressViewHtml', function() {
  return gulp.src('src/views/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(size({
      title: 'views > html',
      pretty: true
    }))
    .pipe(gulp.dest('./build/views/'));
});
