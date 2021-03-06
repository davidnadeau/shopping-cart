angular.module('dnStore.shoppingCart.controllers.CartController', [])
	.controller('CartController', ['$scope', "Cart", "Orders", "$state", "$mdToast",
		function ($scope, Cart, Orders, $state, $mdToast) {
			$scope.$parent.backButtonVisible = true;
			$scope.$parent.cartSummaryVisible = false;
			refreshCartTotals();


			function refreshCartTotals() {
				$scope.products = Cart.all();
				$scope.subtotal = Cart.totalPrice();
				$scope.shippingAndHandling = Cart.shippingAndHandling();
				$scope.tax = Cart.tax();
				$scope.totalPrice = Cart.finalTotal();
				// refresh summary
				$scope.$parent.itemCount = Cart.count();
				$scope.$parent.totalPrice = Cart.totalPrice();
			}
			$scope.isValidOrder = function (price) {
				return angular.isNumber(price) && price > 0;
			};

			$scope.getImage = function (fileName) {
				return S3_BUCKET + fileName;
			};
			$scope.placeOrder = function () {
				if ($scope.isValidOrder($scope.totalPrice)) {
					Orders.place({order:Cart.toJson()});
					$state.go('store.success');
				}
				else $mdToast.show($mdToast.simple().content('Invalid Order'));
			};

			$scope.updateCart = function (product) {
				Cart.update(product);
				refreshCartTotals();
			};

			$scope.removeProduct = function (product) {
				Cart.remove(product);
				refreshCartTotals();
			};
		}]);