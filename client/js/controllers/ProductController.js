angular.module('dnStore.shoppingCart.controllers.ProductController', [])
	.controller('ProductController', ['$scope', 'PaginatedProducts', 'Cart', '$mdToast', '$state',
		function ($scope, PaginatedProducts, Cart, $mdToast, $state) {
			// Update the cart summary on load
			$scope.$parent.itemCount = Cart.count();
			$scope.$parent.totalPrice = Cart.totalPrice();
			$scope.$parent.backButtonVisible = false;
			$scope.$parent.cartSummaryVisible = $scope.$parent.itemCount > 0;

			PaginatedProducts.init();

			$scope.loading = false;
			$scope.products = [];
			$scope.noMoreItems = false;

			function isValidOrder() {
				return angular.isNumber(Cart.totalPrice()) &&  Cart.totalPrice() > 0;
			};

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
					$scope.$parent.cartSummaryVisible = true;
					Cart.add(angular.copy(product));
					var pluralCheck = product.qty === 1 ? 'copy' : 'copies';
					$mdToast.show($mdToast.simple()
							.content(product.qty + ' ' + pluralCheck + ' of ' + product.name + ' added to cart')
					);
					$scope.$parent.itemCount = Cart.count();
					$scope.$parent.totalPrice = Cart.totalPrice();
					product.qty = 1;
				} else {
					$mdToast.show($mdToast.simple().content('Invalid Quantity'));
				}
			};

			$scope.isValidQuantity = function (qty) {
				return angular.isNumber(qty) && qty > 0;
			};

			$scope.viewCart = function (event) {
				if (isValidOrder()) $state.go('store.cart');
				else $mdToast.show($mdToast.simple().content('Add some movies to your cart'));
			};
			$scope.getImage = function (fileName) {
				return S3_BUCKET + fileName;
			}
		}]);