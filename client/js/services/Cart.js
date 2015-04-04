angular.module('dnStore.shoppingCart.services.Cart', [])
	.factory('Cart', [function () {
		var items = [];
		return {
			add: function (item) {
				items.push(item);
			},
			remove: function (item) {

			},
			clear: function () {
				items = [];
			},
			all: function () {
				return items;
			},
			count: function () {
				return items.reduce(function (acc, item) {
					return acc + item.qty
				}, 0);
			},
			totalPrice: function () {
				return items.reduce(function (acc, item) {
					return acc + (item.price*item.qty)
				}, 0);
			}

		}
	}]);

