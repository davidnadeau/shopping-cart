angular.module('dnStore.shoppingCart.controllers.ProductsController', [])
	.controller('ProductsController', ['$scope', 'PaginatedProducts', 'Cart', function ($scope, PaginatedProducts, Cart) {
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
				productList.forEach(function (product) {
					$scope.products.push(product);
				})
			})
		};
		$scope.removeFromCart = function (product, event) {
			event.stopPropagation();
			Cart.remove(product);
		};
		$scope.addToCart = function (product, event) {
			event.stopPropagation();
			Cart.add(product);
		};
		$scope.viewCart = function (event) {
			console.log(Cart.all())
		};
	}]);