var gulp = require('gulp');

var browser = require('browser-sync').create();
var reload = browser.reload;

var requireDir = require('require-dir');
requireDir('./task');

gulp.task('server', function() {
  browser.init({
    server: {
      baseDir: "./src/"
    }
  });
});


gulp.task('demo', ['server'], function() {

});

gulp.task('build', ['clean', 'compressHtml', 'compressViewHtml'], function() {
  console.log('ok');
});
