angular.module('dnStore.shoppingCart.controllers.SuccessController', [])
	.controller('SuccessController', ['$scope', "Cart", "$state",
		function ($scope, Cart, $state) {
			function generateConfirmation(length) {
				return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
			}
			$scope.totalPrice = Cart.finalTotal();
			$scope.confirmation = generateConfirmation(24);

			var delay = 3000;
			setTimeout(function () {
				Cart.clear();
				$state.go('store.products');
			}, delay);
		}]);