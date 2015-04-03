var BASE = "http://54.191.210.109/api/",
	VERSION = "v1/";

angular.module('dnStore.shoppingCart', [
	'ui.router',
	'dnStore.shoppingCart.controllers',
	'dnStore.shoppingCart.services',
	'dnStore.shoppingCart.directives'
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
