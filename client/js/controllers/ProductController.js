angular.module('dnStore.shoppingCart.controllers.ProductController', [])
	.controller('ProductController', ['$scope', 'PaginatedProducts', 'Cart', '$mdToast', '$animate', function ($scope, PaginatedProducts, Cart, $mdToast, $animate) {
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
					product.qty = 1;
					$scope.products.push(product);
				})
			})
		};
		$scope.removeFromCart = function (product, event) {
			Cart.remove(product);
		};
		$scope.addToCart = function (product, event) {
			if ($scope.isValidQuantity(product.qty)) {
				Cart.add(product);
				var pluralCheck = product.qty === 1 ? 'copy' : 'copies';
				$mdToast.show($mdToast.simple()
						.content('Purchased ' + product.qty + ' ' + pluralCheck + ' of ' + product.name)
						.position("bottom right")
				);
				$scope.$parent.itemCount = Cart.count();
				$scope.$parent.totalPrice = Cart.totalPrice();
				product.qty = 1;
			} else {
				$mdToast.show($mdToast.simple()
						.content('Invalid Quantity')
						.position("top right")
				);
			}
		};

		$scope.isValidQuantity = function (qty) {
			return angular.isNumber(qty) && qty > 0;
		};

		$scope.viewCart = function (event) {
			console.log(Cart.all())
		};
		$scope.getImage = function (fileName) {
			return S3_BUCKET + fileName;
		}
	}]);