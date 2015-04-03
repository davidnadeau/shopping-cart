angular.module('dnStore.shoppingCart.controllers.ProductsController', [])
	.controller('ProductsController', ['$scope', 'PaginatedProducts', function ($scope, PaginatedProducts) {
		PaginatedProducts.init();
		$scope.loading = false;
		$scope.products = [];
		$scope.noMoreItems = false;

		$scope.loadProducts = function () {
			if ($scope.loading) return;
			$scope.loading = true;

			if ($scope.noMoreItems) {
				$scope.loading = false;
				return;
			}
			PaginatedProducts.loadMore(function (productList) {
				$scope.loading = false;
				if ($scope.noMoreItems) return;
				if (productList.length === 0) $scope.noMoreItems = true;
				$scope.products.concat(productList);
			})
		};

		$scope.addToCart = function (product, event) {
			event.stopPropagation();
		}
	}]);