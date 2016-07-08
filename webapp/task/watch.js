var gulp = require('gulp');
var path = require('./path.js');

gulp.task('watch', function() {
 gulp.watch(path.css.sass, ['sass']);
});
