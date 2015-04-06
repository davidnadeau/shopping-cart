describe("Main Controller", function() {
	var $rootScope, $scope, $controller;

	beforeEach(module('dnStore.shoppingCart'));
	beforeEach(inject(function (Cart) {Cart.clear()}));

	beforeEach(inject(function(_$rootScope_, _$controller_){
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$controller = _$controller_;

		$controller('MainController', {'$rootScope' : $rootScope, '$scope': $scope});
	}));

	describe("When initializing", function() {
		it("should set current item count to 0", function () {
			expect($scope.itemCount).toEqual( 0 );
		});
		it("should set current cart price to 0", function () {
			expect($scope.totalPrice).toEqual( 0 );
		});
	});
});