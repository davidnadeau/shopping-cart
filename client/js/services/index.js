/**
 * Link all the services in the shoppingCart app.
 */
angular.module('dnStore.shoppingCart.services', [
	'dnStore.shoppingCart.services.Products',
	'dnStore.shoppingCart.services.Orders',
	'dnStore.shoppingCart.services.LocalStorage',
	'dnStore.shoppingCart.services.Cart',
	'dnStore.shoppingCart.services.PaginatedProducts'
]);