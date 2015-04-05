angular.module('dnStore.shoppingCart.services.Orders', ['ngResource'])
	.service('Orders', ["$resource", function ($resource) {
		return $resource(BASE + VERSION + 'orders',
			{},
			{
				place: {
					method: 'POST'
				}
			}
		);
	}]);

