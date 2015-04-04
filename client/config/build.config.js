var pkg = require('../package.json');

module.exports = {
	banner: '/*!\n' +
	' * Shopping Cart \n' +
	' * v' + pkg.version + '\n' +
	' * Copyright 2015 David Nadeau \n' +
	' * See LICENSE in this repository for license information\n' +
	' */\n',
	closureStart: "(function(){'use strict';\n\n",
	closureEnd: '\n})();',
	shoppingCartFiles: [
		'js/app.js',
		'js/controllers/*.js',
		'js/services/*.js',
		'js/directives/*.js'
	],
	vendorFiles: [
		'bower_components/angular/angular.js',
		'bower_components/angular/angular.min.js',
		'bower_components/angular-animate/angular-animate.js',
		'bower_components/angular-animate/angular-animate.min.js',
		'bower_components/angular-aria/angular-aria.js',
		'bower_components/angular-aria/angular-aria.min.js',
		'bower_components/angular-material/angular-material.js',
		'bower_components/angular-material/angular-material.min.js',
		'bower_components/angular-material-icons/angular-material-icons.js',
		'bower_components/angular-material-icons/angular-material-icons.min.js',
		'bower_components/angular-resource/angular-resource.js',
		'bower_components/angular-resource/angular-resource.min.js',
		'bower_components/angular-ui-router/release/angular-ui-router.js',
		'bower_components/angular-ui-router/release/angular-ui-router.min.js',
		'bower_components/hammerjs/hammer.js',
		'bower_components/hammerjs/hammer.min.js',
		'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
		'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.min.js'
	],
	bundleFiles: [
		'dist/vendor/angular.js',
		'dist/vendor/angular-animate.js',
		'dist/vendor/angular-aria.js',
		'dist/vendor/angular-material.js',
		'dist/vendor/angular-material-icons.js',
		'dist/vendor/angular-resource.js',
		'dist/vendor/angular-ui-router.js',
		'dist/vendor/hammer.js',
		'dist/vendor/ng-infinite-scroll.js'
	]
};
