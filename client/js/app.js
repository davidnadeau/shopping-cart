/**
 * Location of the server.
 * @type {string}
 */
var BASE = "https://54.191.210.109/api/",
	/**
	 * Current api version this application is using.
	 * @type {string}
	 */
	VERSION = "v1/",
	/**
	 * All media is stored in amazon S3 to reduce strain on actual server.
	 * @type {string}
	 */
	S3_BUCKET = "https://s3-us-west-2.amazonaws.com/shopping-cart-images/";

angular.module('dnStore.shoppingCart', [
	'ui.router',
	'dnStore.shoppingCart.services',
	'dnStore.shoppingCart.directives',
	'dnStore.shoppingCart.controllers'
])
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		/**
		 * All states inherit their layouts from the main. Useful place to put things that
		 * every state will need to display.
		 * @type {{abstract: boolean, url: string, templateUrl: string, controller: string}}
		 */
		var mainState = {
				abstract: true,
				url: '/',
				templateUrl: 'partials/main.html',
				controller: 'MainController'
			},
			/**
			 * State in which the user views products and adds them to their cart.
			 * @type {{url: string, templateUrl: string, controller: string}}
			 */
			viewProductsState = {
				url: 'products',
				templateUrl: 'partials/products.html',
				controller: 'ProductController'
			},
			/**
			 * State in which the user reviews the items they'd like to purchase.
			 * @type {{url: string, templateUrl: string, controller: string}}
			 */
			viewCartState = {
				url: 'cart',
				templateUrl: 'partials/cart.html',
				controller: 'CartController'
			};
		$stateProvider
			.state('store', mainState)
			.state('store.products', viewProductsState)
			.state('store.cart', viewCartState);

		/**
		 * Malformed urls should just redirect to the viewing state.
		 */
		$urlRouterProvider.otherwise('/products');
	}]);
