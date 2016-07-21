var gulp = require('gulp');
var sass = require('gulp-sass');
var size = require('gulp-size');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var browser = require('browser-sync').create();
var reload = browser.reload;

var jade = require('jade');
var gulpJade = require('gulp-jade');

var config = require('./config');
var jadePath =  config.path.jade;
var htmlPath =  config.path.html;
var sassPath =  config.path.sass;
var cssPath =  config.path.css;

gulp.task('server', function() {
	browser.init({
		server: {
			baseDir: "./20160618/"
		}
	});
});

gulp.task('compileJade', function() {
	gulp.src(jadePath)
		.pipe(gulpJade({
			jade: jade,
			pretty: false
		}))
		.pipe(reload({
			stream: true
		}))
		.pipe(gulp.dest(htmlPath));
});



gulp.task('sass', function() {
	return gulp.src(sassPath)
		.pipe(sass())
		.pipe(gulp.dest(cssPath))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('watch', function() {
	gulp.watch(jadePath, ['compileJade']);
	gulp.watch(sassPath, ['sass']);
});





// gulp.task('elseHtml', function() {
// 	return gulp.src(elseHtml)
// 		.pipe(reload({
// 			stream: true
// 		}));
// });

// 默认启动服务
gulp.task('default', ['server','watch'], function() {
	console.log('服务启动成功');
});
