"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");

// Load package.json for banner
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*!\n',
	' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
	' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
	' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
	' */\n',
	'\n'
].join('');

// BrowserSync
function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: "./dist"
		},
		port: 3000
	});
	done();
}

// BrowserSync reload
function browserSyncReload(done) {
	browsersync.reload();
	done();
}

// Clean vendor
function clean() {
	return del(["./dist/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
	// Bootstrap
	var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
		.pipe(gulp.dest('./dist/vendor/bootstrap'));
	// Remixicon
	var remixicon = gulp.src('./node_modules/remixicon/fonts/*')
		.pipe(gulp.dest('./dist/vendor/remixicon'))
	// // Font Awesome CSS
	// var fontAwesomeCSS = gulp.src('./node_modules/@fortawesome/fontawesome-free/css/**/*')
	// 	.pipe(gulp.dest('./dist/vendor/fontawesome-free/css'));
	// // Font Awesome Webfonts
	// var fontAwesomeWebfonts = gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
	// 	.pipe(gulp.dest('./dist/vendor/fontawesome-free/webfonts'));
	// jQuery Easing
	var jqueryEasing = gulp.src('./node_modules/jquery.easing/*.js')
		.pipe(gulp.dest('./dist/vendor/jquery-easing'));
	// jQuery
	var jquery = gulp.src([
		'./node_modules/jquery/dist/*',
		'!./node_modules/jquery/dist/core.js'
	])
		.pipe(gulp.dest('./dist/vendor/jquery'));
	return merge(bootstrap, remixicon, jquery, jqueryEasing);
}

// PUG task
function pugToHtml() {
	return gulp
		.src("./templates/*.pug")
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./dist'));
}

// Image minify
function imageminify(){
	return gulp
		.src('./img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
}

// CSS task
function css() {
	return gulp
		.src("./scss/**/*.scss")
		.pipe(plumber())
		.pipe(sass({
			outputStyle: "expanded",
			includePaths: "./node_modules",
		}))
		.on("error", sass.logError)
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(header(banner, {
			pkg: pkg
		}))
		.pipe(gulp.dest("./dist/css"))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(cleanCSS())
		.pipe(gulp.dest("./dist/css"))
		.pipe(browsersync.stream());
}

// JS task
function js() {
	return gulp
		.src([
			'./js/*.js',
			'!./js/*.min.js',
			'!./js/contact_me.js',
			'!./js/jqBootstrapValidation.js'
		])
		.pipe(uglify())
		.pipe(header(banner, {
			pkg: pkg
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist/js'))
		.pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
	gulp.watch("./scss/**/*", css);
	gulp.watch("./img/*", imageminify);
	gulp.watch(["./templates/*", './templates/*/*'], pugToHtml);
	gulp.watch(["./js/**/*", "!./js/**/*.min.js"], js);
	gulp.watch("./**/*.html", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, gulp.parallel(pugToHtml, css, js, imageminify));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.pugToHtml = pugToHtml;
exports.css = css;
exports.js = js;
exports.imageminify = imageminify;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
