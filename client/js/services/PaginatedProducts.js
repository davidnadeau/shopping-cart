angular.module('dnStore.shoppingCart.services.PaginatedProducts', [])
	.service('PaginatedProducts', ["Products", function (Products) {
		var currentPage = 1,
			objects = [],
			isLoading = false;

		function loadNewPage(callback) {
			Products.query({page:currentPage}, function (res) {
				currentPage += 1;
				isLoading = false;
				callback(res.products);
			}, function (err) {
				console.log(err);
			});
		}

		return {
			init: function () {
				objects = [];
				currentPage = 1;
			},
			loadMore: function (callback) {
				objects = [];
				if (isLoading) return;
				isLoading = true;
				loadNewPage(callback);
			}
		}
	}]);

