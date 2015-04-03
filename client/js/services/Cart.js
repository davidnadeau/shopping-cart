angular.module('dnStore.shoppingCart.services.Cart', [])
	.factory('Cart', ["", function () {
		var items = [];
		return {
			add: function(item) {
				items.push(item);
			},
			remove: function(item) {

			},
			clear: function() {
				items = [];
			},
			all: function(){
				return items;
			}
		}
	}]);

