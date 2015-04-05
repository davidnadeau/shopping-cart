angular.module('dnStore.shoppingCart.controllers.MainController', [])
	.controller('MainController', ['$scope', 'Cart',
		function ($scope, Cart) {
			$scope.itemCount = Cart.count();
			$scope.totalPrice = Cart.totalPrice();
		}]);