angular.module('dnStore.shoppingCart.services.Products', ['ngResource'])
	.service('Products', ["$resource", function ($resource) {
		return $resource(BASE + VERSION + 'products',
			{
				// server expects a page number ?page={page_number}
				page: "@page"
			},
			{
				query: {
					method: 'GET',
					isArray: false
				}
			}
		);
	}]);

