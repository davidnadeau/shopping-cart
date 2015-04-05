angular.module('dnStore.shoppingCart.services.Cart', [])
	.factory('Cart', ['LocalStorage', function (LocalStorage) {
		/**
		 * Local storage key for the cart data
		 * @type {string}
		 */
		var KEY = 'CART',
			/**
			 * Random value for shipping cost
			 * @type {number}
			 */
			SHIPPING_COST = 0.2,
			/**
			 * Standard HST
			 * @type {number}
			 */
			TAX = 0.15,
			/**
			 * Array of products in the cart. Load cart from local storage for persistence
			 * @type {Array}
			 */
			items = LocalStorage.all(KEY);

		/**
		 * Price is determined by multiplying the price of each item by the quantity
		 * of said item, and then summing up all the items.
		 * @returns {*}
		 */
		function sumPrice (){
			return items.reduce(function (acc, item) {
				return acc + (item.price * item.qty)
			}, 0);
		}

		/**
		 * Return the index of the product searching by product name
		 * @param list - list of products to search
		 * @param name - name of product to find
		 * @returns {number} - index of product in the list, -1 if not found
		 */
		function indexOfByName(list, name) {
			for (var i = 0; i < list.length; i++) {
				if (name === list[i].name) return i;
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
				list.splice(index, 1);
			return name;
		}

		return {
			/**
			 * Add an item to the cart. If the item is already in the cart,
			 * just update the quantity.
			 * @param item - item to add to the cart
			 */
			add: function (item) {
				var index = indexOfByName(items, item.name);

				// if already in the list
				if (index > -1) items[index].qty += item.qty;
				else items.push(item);
				LocalStorage.update(KEY, items);
			},
			/**
			 * Remove an item from the cart.
			 * @param item - to remove from the cart
			 * @returns {*} - name of item removed
			 */
			remove: function (item) {
				arrayRemove(items, item.name);
				LocalStorage.update(KEY, items);
				return item;
			},
			/**
			 * Remove every item from the cart.
			 */
			clear: function () {
				LocalStorage.clear(KEY);
				items = [];
			},
			/**
			 * Update the quantity of an item.
			 * @param item
			 */
			update: function (item) {
				var index = indexOfByName(items, item.name);
				items[index].qty = item.qty;
				LocalStorage.update(KEY, items);
			},
			/**
			 * Return the entire cart array.
			 * @returns {Array}
			 */
			all: function () {
				return items;
			},
			/**
			 * Return the entire cart in json format.
			 * @returns {Array}
			 */
			toJson: function () {
				return JSON.stringify(items);
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
			 * Return the total price of all the items in the cart before taxes and shipping.
			 * @returns {*}
			 */
			totalPrice: function () {
				return sumPrice();
			},
			/**
			 * Spoof shipping cost of 20%
			 * @returns {number}
			 */
			shippingAndHandling: function () {
				return sumPrice() * SHIPPING_COST;
			},
			/**
			 * Standard HST tax, would make sense to calculate this by province.
			 * @returns {number}
			 */
			tax: function () {
				return sumPrice() * TAX;
			},
			/**
			 * Final price with tax and shipping included.
			 * @returns {*}
			 */
			finalTotal: function () {
				var cost = sumPrice();
				return cost + (cost * SHIPPING_COST) + (cost * TAX);
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

