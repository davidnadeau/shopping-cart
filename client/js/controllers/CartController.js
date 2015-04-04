angular.module('dnStore.shoppingCart.controllers.CartController', [])
	.controller('CartController', ['$scope', "Cart",
		function ($scope, Cart) {
			$scope.products = Cart.all();
		}]);