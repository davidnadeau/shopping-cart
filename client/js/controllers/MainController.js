angular.module('dnStore.shoppingCart.controllers.MainController', [])
	.controller('MainController', ['$scope', 'Cart', '$window',
		function ($scope, Cart, $window) {
			$scope.itemCount = Cart.count();
			$scope.totalPrice = Cart.totalPrice();
			$scope.backButtonVisible = false;

			$scope.backHistory = function () {
				$window.history.back();
			};
		}]);