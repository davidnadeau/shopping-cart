/**
 * Link all the controllers in the shoppingCart app.
 */
angular.module('dnStore.shoppingCart.controllers', [
	'ngAnimate',
	'ngMaterial',
	'ngMdIcons',
	'infinite-scroll',
	'dnStore.shoppingCart.controllers.MainController',
	'dnStore.shoppingCart.controllers.ProductsController'
]);