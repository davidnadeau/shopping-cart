describe("Cart Factory", function() {
	beforeEach(module('dnStore.shoppingCart'));

	describe("When initializing", function() {
		it("start with an empty list", inject(function (Cart) {
			expect(Cart.count()).toEqual( 0 );
		}));
	});

	describe("When loaded", function() {
		it("should check if it contains an item", inject(function (Cart) {
			var testProduct = {name:"test"};
			expect(Cart.contains(testProduct)).toEqual( false );
			Cart.add(testProduct);
			expect(Cart.contains(testProduct)).toEqual( true );
		}));
		it("should count its length", inject(function (Cart) {
			var testProduct = {name:"test", qty:4};
			Cart.add(testProduct);
			Cart.add(testProduct);
			Cart.add(testProduct);
			expect(Cart.count()).toEqual( 12 );
		}));
		it("should clear itself", inject(function (Cart) {
			var testProduct = {name:"test", qty:4};
			Cart.add(testProduct);
			Cart.add(testProduct);
			Cart.add(testProduct);
			expect(Cart.count()).toEqual( 12 );
			Cart.clear();
			expect(Cart.count()).toEqual( 0 );
		}));
		it("should return total price", inject(function (Cart) {
			var testProduct = {name:"test", qty:4, price:10};
			Cart.add(testProduct);
			Cart.add(testProduct);
			Cart.add(testProduct);
			expect(Cart.totalPrice()).toEqual( 120 );
		}));
		it("should add an item", inject(function (Cart) {
			var testProduct = {name:"test"};
			expect(Cart.contains(testProduct)).toEqual( false );
			Cart.add(testProduct);
			expect(Cart.contains(testProduct)).toEqual( true );
		}));
		it("should remove an item", inject(function (Cart) {
			var testProduct = {name:"test"};
			Cart.add(testProduct);
			expect(Cart.contains(testProduct)).toEqual( true );
			Cart.remove(testProduct);
			expect(Cart.contains(testProduct)).toEqual( false );
		}));
	});
});