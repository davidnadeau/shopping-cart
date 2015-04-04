angular.module('dnStore.shoppingCart.services.Cart', [])
	.factory('Cart', [function () {
		/**
		 * Array of products in the cart
		 * @type {Array}
		 */
		var items = [];

		/**
		 * Return the index of the product searching by product name
		 * @param list - list of products to search
		 * @param name - name of product to find
		 * @returns {number} - index of product in the list, -1 if not found
		 */
		function indexOfByName(list, name) {
			for (var i = 0; i < items.length; i++) {
				if (name === items[i].name) return i;
			}
			return -1;
		}

		/**
		 * Remove an item from the items list
		 * @param list - list of items to remove item from
		 * @param name - name of item to remove
		 * @returns {*} - name of item that was removed
		 */
		function arrayRemove(list, name) {
			var index = indexOfByName(list, name);
			if (index > -1)
				items.splice(index, 1);
			return name;
		}

		return {
			/**
			 * Add an item to the cart. If the item is already in the cart,
			 * just update the quantity.
			 * @param item - item to add to the cart
			 */
			add: function (item) {
				var index =  indexOfByName(items, item.name);
				// if already in the list
				if (index > -1) items[index].qty += item.qty;
				else items.push(item);
			},
			/**
			 * Remove an item from the cart.
			 * @param item - to remove from the cart
			 * @returns {*} - name of item removed
			 */
			remove: function (item) {
				return arrayRemove(items, item.name);
			},
			/**
			 * Remove every item from the cart.
			 */
			clear: function () {
				items = [];
			},
			/**
			 * Return the entire cart array.
			 * @returns {Array}
			 */
			all: function () {
				return items;
			},
			/**
			 * Count of items in the cart. Since a single item can have any quantity,
			 * this method sums up all the quantities of each item.
			 * @returns {*}
			 */
			count: function () {
				return items.reduce(function (acc, item) {
					return acc + item.qty
				}, 0);
			},
			/**
			 * Return the total price of all the items in the cart. Price is determined
			 * by multiplying the price of each item by the quantity of said item, and then
			 * summing up all the items.
			 * @returns {*}
			 */
			totalPrice: function () {
				return items.reduce(function (acc, item) {
					return acc + (item.price*item.qty)
				}, 0);
			},
			/**
			 * Returns whether or not an item is already in the cart.
			 * @param item
			 * @returns {boolean}
			 */
			contains: function (item) {
				return indexOfByName(items, item.name) > -1;
			}

		}
	}]);

