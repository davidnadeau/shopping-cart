angular.module('dnStore.shoppingCart.services.Cart', [])
	.factory('Cart', [function () {
		var items = [];


		function indexOfByName(name) {
			for (var i = 0; i < items.length; i++) {
				if (name === items[i].name) return i;
			}
			return -1;
		}

		function arrayRemove(name) {
			var index = indexOfByName(name);
			if (index >= 0)
				items.splice(index, 1);
			return name;
		}

		return {
			add: function (item) {
				items.push(item);
			},
			remove: function (item) {
				arrayRemove(item.name);
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
			},
			contains: function (item) {
				return indexOfByName(item.name) > -1;
			}

		}
	}]);

