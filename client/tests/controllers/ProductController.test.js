describe("Product Controller", function() {
	var $rootScope, $scope, $controller;

	beforeEach(module('dnStore.shoppingCart'));

	beforeEach(inject(function(_$rootScope_, _$controller_){
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$controller = _$controller_;

		$controller('ProductController', {'$rootScope' : $rootScope, '$scope': $scope});
	}));

	describe("When initializing", function() {
		it("should have no items", function () {
			expect($scope.products).toEqual( [] );
		});
	});

	describe("When loaded", function() {
		it("should only allow valid quantities", function () {
			expect($scope.isValidQuantity("aaa")).toEqual( false );
			expect($scope.isValidQuantity(0)).toEqual( false );
			expect($scope.isValidQuantity(1)).toEqual( true );
		});
	});
});