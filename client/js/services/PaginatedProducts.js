angular.module('dnStore.shoppingCart.services.PaginatedProducts', [])
	.service('PaginatedProducts', ["Products", function (Products) {
		/**
		 * Paging starts a 1 in Laravel.
		 * @type {number}
		 */
		var currentPage = 1,
			/**
			 * Holds current page of objects returned from the server.
			 * @type {Array}
			 */
			objects = [],
			/**
			 * True while waiting for the server to return.
			 * @type {boolean}
			 */
			isLoading = false;

		/**
		 * Load the next page of products, and return the products to the caller.
		 * @param callback - function requesting the page (caller).
		 */
		function loadNewPage(callback) {
			Products.query({page:currentPage}, function (res) {
				currentPage += 1;
				isLoading = false;
				callback(res.products);
			}, function (err) {
				// TODO: better error checking. Under high load, the server may
				// return errors here.
				console.log(err);
			});
		}

		return {
			/**
			 * Reset the paginator.
			 */
			init: function () {
				objects = [];
				currentPage = 1;
			},
			/**
			 * Load the next page of products.
			 * @param callback - function requesting the page (caller).
			 */
			loadMore: function (callback) {
				objects = [];
				if (isLoading) return;
				isLoading = true;
				loadNewPage(callback);
			}
		}
	}]);

