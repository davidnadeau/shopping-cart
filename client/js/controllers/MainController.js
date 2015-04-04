angular.module('dnStore.shoppingCart.controllers.MainController', [])
	.controller('MainController', ['$scope', function ($scope) {
		$scope.itemCount = 0;
		$scope.totalPrice = 0;
	}]);