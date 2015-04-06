describe("Cart Controller", function() {
	var $rootScope, $scope, $controller;

	beforeEach(module('dnStore.shoppingCart'));

	beforeEach(inject(function(_$rootScope_, _$controller_){
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$controller = _$controller_;

		$controller('CartController', {'$rootScope' : $rootScope, '$scope': $scope});
	}));

	describe("When initializing", function() {
		it("should only allow valid orders to be submitted", function () {
			expect($scope.isValidOrder(-1)).toEqual( false );
			expect($scope.isValidOrder("sksksk")).toEqual( false );
			expect($scope.isValidOrder(100212.12)).toEqual( true );
		});
		it("should show the back button", function () {
			expect($scope.$parent.backButtonVisible).toEqual( true );
		});
	});
});