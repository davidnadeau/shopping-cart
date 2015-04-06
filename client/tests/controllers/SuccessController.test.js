describe("Success Controller", function() {
	var $rootScope, $scope, $controller;

	beforeEach(module('dnStore.shoppingCart'));

	beforeEach(inject(function(_$rootScope_, _$controller_){
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$controller = _$controller_;

		$controller('SuccessController', {'$rootScope' : $rootScope, '$scope': $scope});
	}));

	describe("When initializing", function() {
		it("should create a confirmation code", function () {
			expect($scope.confirmation.length === $scope.confirmationLength).toEqual( true ) ;
		});
		it("should hide the back button", function () {
			expect($scope.$parent.backButtonVisible).toEqual( false );
		});
	});
});