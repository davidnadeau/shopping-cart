var BASE = "https://54.191.210.109/api/",
	VERSION = "v1/",
	S3_BUCKET = "https://s3-us-west-2.amazonaws.com/shopping-cart-images/";

angular.module('dnStore.shoppingCart', [
	'ui.router',
	'dnStore.shoppingCart.services',
	'dnStore.shoppingCart.directives',
	'dnStore.shoppingCart.controllers'
])
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		var mainState = {
				abstract: true,
				url: '/',
				templateUrl: 'partials/main.html',
				controller: 'MainController'
			},
		viewProductsState = {
				url: 'products',
				templateUrl: 'partials/products.html',
				controller: 'ProductsController'
			};
		$stateProvider
			.state('store', mainState)
			.state('store.products', viewProductsState);

		$urlRouterProvider.otherwise('/products');
	}]);
