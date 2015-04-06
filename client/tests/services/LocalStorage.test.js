describe("LocalStorage Factory", function () {
	var KEY = 'TestCart';

	beforeEach(module('dnStore.shoppingCart'));
	beforeEach(inject(function (LocalStorage) {LocalStorage.clear(KEY)}));

	describe("When loaded", function () {
		it("should update a value in local storage given a key", inject(function (LocalStorage) {
			var testData = [{name: "test", qty: 4, price: 10},
				{name: "test", qty: 1, price: 12}];
			expect(LocalStorage.all(KEY)).toEqual([]);
			LocalStorage.update(KEY, testData);
			expect(LocalStorage.all(KEY)).toEqual(testData);
		}));
	});
});