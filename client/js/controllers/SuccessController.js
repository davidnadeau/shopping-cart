angular.module('dnStore.shoppingCart.controllers.SuccessController', [])
	.controller('SuccessController', ['$scope', "Cart", "$state",
		function ($scope, Cart, $state) {
			$scope.$parent.backButtonVisible = false;
			/**
			 * Amount of time to show success state for in milliseconds.
			 * @type {number}
			 */
			var delay = 3000;

			// only on the scope since it is used in a test
			$scope.confirmationLength = 24;
			$scope.totalPrice = Cart.finalTotal();
			$scope.confirmation = generateConfirmation($scope.confirmationLength);

			/**
			 * Generate a string of any length to be used as the confirmation number.
			 * @param length - length of the string to generate
			 * @returns {string}
			 */
			function generateConfirmation(length) {
				return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
			}

			/**
			 * Redirect to the view products state of 'delay' amount of time.
			 */
			setTimeout(function () {
				Cart.clear();
				$state.go('store.products');
			}, delay);
		}]);