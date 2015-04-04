var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	header = require('gulp-header'),
	footer = require('gulp-footer'),
	rename = require('gulp-rename'),
	karma = require('karma').server,
	buildConfig = require('./config/build.config.js');

gulp.task('default', ['build']);

gulp.task('build', [
	'tests',
	'scripts',
	'vendor'
], function () {
	gulp.src(buildConfig.bundleFiles.map(function (src) {
		return src.replace(/.js$/, '.min.js');
	}))
		.pipe(concat('vendor.min.js'))
		.pipe(gulp.dest('dist'))

	return gulp.src(buildConfig.bundleFiles)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('dist'))

});

gulp.task('scripts', function () {
	return gulp.src(buildConfig.shoppingCartFiles)
		.pipe(concat('shopping-cart.js'))
		.pipe(header(buildConfig.closureStart))
		.pipe(footer(buildConfig.closureEnd))
		.pipe(header(buildConfig.banner))
		.pipe(gulp.dest('dist'))
		.pipe(uglify())
		.pipe(header(buildConfig.banner))
		.pipe(rename({extname: '.min.js'}))
		.pipe(gulp.dest('dist'))

});

gulp.task('vendor', function () {
	return gulp.src(buildConfig.vendorFiles)
		.pipe(gulp.dest('dist/vendor'))

});

gulp.task('tests', function(done) {
	karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, function() {
		done();
	});
});

gulp.task('watch', ['build'], function () {
	gulp.watch('src/**/*.js', ['build']);

});

