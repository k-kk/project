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

// 开发
gulp.task('demo', ['server', 'watch'], function() {

});

// 编译
gulp.task('build', ['clean', 'compressHtml', 'compressViewHtml'], function() {

});
