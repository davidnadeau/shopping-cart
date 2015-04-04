/**
 * Link all the controllers in the shoppingCart app.
 */
angular.module('dnStore.shoppingCart.controllers', [
	'ngAnimate',
	'ngMaterial',
	'infinite-scroll',
	'dnStore.shoppingCart.controllers.MainController',
	'dnStore.shoppingCart.controllers.ProductController'
]);