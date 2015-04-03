angular.module('dnStore.shoppingCart.services.Products', ['ngResource'])
	.service('Products', ["$resource", function ($resource) {
		return $resource(BASE + VERSION + 'products',
			{
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

