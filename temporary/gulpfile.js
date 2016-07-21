var gulp = require('gulp');
var size = require('gulp-size');

var browser = require('browser-sync').create();
var reload = browser.reload;

var htmlmin = require('gulp-htmlmin');
var jade = require('jade');
var gulpJade = require('gulp-jade');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var complexity = require('gulp-complexity');

var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

var concat = require('gulp-concat');
var md5 = require('gulp-md5');
var rename = require('gulp-rename');
var inject = require('gulp-inject'); // 更改页面引入名
var replace = require('gulp-replace');
// var config = require('./config');
// var jadePath = config.path.jade;
// var htmlPath = config.path.html;
// var sassPath = config.path.sass;
// var cssPath = config.path.css;

// node自带模块
var http = require('http');
var path = require('path');
var fs = require('fs');

gulp.task('images', function() {
	return gulp.src('login/images/*')
		.pipe(imagemin({
			progressive: true,
			use: [pngquant()]
		}))
		.pipe(size())
		.pipe(gulp.dest('login/build/images/'));
});



gulp.task('style', function() {
	return gulp.src(['login/css/reset.css', 'login/css/login.css'])
		.pipe(autoprefixer())
		.pipe(concat('style.css'))
		.pipe(cleanCSS({
			compatibility: 'ie8'
		}))
		.pipe(replace('bar', 'foo'))
		.pipe(md5())
		.pipe(size())
		.pipe(gulp.dest('login/build/css/'));

});


gulp.task('script', function() {
	return gulp.src(['login/js/jquery.min.js', 'login/js/method.js', 'login/js/login.js', 'login/js/reg.js', 'login/js/token.js', 'login/js/init.js'])
		.pipe(jshint())
		.pipe(uglify())
		.pipe(concat('script.js'))
		.pipe(md5())
		.pipe(size())
		.pipe(gulp.dest('login/build/js/'));
});


gulp.task('html', function() {
	return gulp.src(['login/*.html'])
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(size())
		.pipe(gulp.dest('login/build/'));
});


gulp.task('build', ['html','style', 'script','images'], function() {
	console.log('打包成功');
});


// gulp.task('server', function() {
// 	browser.init({
// 		server: {
// 			baseDir: "./20160618/"
// 		}
// 	});
// });

// gulp.task('compileJade', function() {
// 	gulp.src(jadePath)
// 		.pipe(gulpJade({
// 			jade: jade,
// 			pretty: false
// 		}))
// 		.pipe(reload({
// 			stream: true
// 		}))
// 		.pipe(gulp.dest(htmlPath));
// });



// gulp.task('sass', function() {
// 	return gulp.src(sassPath)
// 		.pipe(sass())
// 		.pipe(gulp.dest(cssPath))
// 		.pipe(reload({
// 			stream: true
// 		}));
// });

// gulp.task('watch', function() {
// 	gulp.watch(jadePath, ['compileJade']);
// 	gulp.watch(sassPath, ['sass']);
// });



// gulp.task('elseHtml', function() {
// 	return gulp.src(elseHtml)
// 		.pipe(reload({
// 			stream: true
// 		}));
// });

// 默认启动服务
// gulp.task('default', ['server','watch'], function() {
// 	console.log('服务启动成功');
// });
