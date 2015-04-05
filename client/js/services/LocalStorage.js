angular.module('dnStore.shoppingCart.services.LocalStorage', [])
	.factory('LocalStorage', [function () {
		/**
		 * Get a variable from localstorage and parse it
		 * @param key - variable to get from local storage
		 * @returns {*|number}
		 */
		function retrieve(key) {
			var val = localStorage[key];
			return JSON.parse(val ? val : '[]');
		}

		/**
		 * Replace a variable with a new value.
		 *
		 * @param key
		 * @param val
		 */
		function save(key, val) {
			localStorage[key] = JSON.stringify(val);
		}

		return {
			/**
			 * Update local storage for a specified key
			 * @param key - key to update
			 * @param val - new value to store at key
			 */
			update: function (key, val) {
				save(key, val);
			},
			/**
			 * Retrieve the contents of the specified key
			 * @param key
			 * @returns {*|number}
			 */
			all: function (key) {
				return retrieve(key);
			},
			/**
			 * Clear a single key from local storage
			 * @param key
			 */
			clear: function (key) {
				localStorage.removeItem(key);
			}
		}
	}]);

