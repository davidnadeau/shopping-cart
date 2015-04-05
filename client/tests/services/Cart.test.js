describe("Cart Factory", function() {
	beforeEach(module('dnStore.shoppingCart'));
	beforeEach(inject(function (Cart) {Cart.clear()}));

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
			var testProduct0 = {name:"test", qty:4},
				testProduct1 = {name:"test", qty:2},
				testProduct2 = {name:"test", qty:3};
			Cart.add(testProduct0);
			Cart.add(testProduct1);
			Cart.add(testProduct2);
			expect(Cart.count()).toEqual( 9 );
		}));
		it("should clear itself", inject(function (Cart) {
			var testProduct0 = {name:"test", qty:4},
				testProduct1 = {name:"test", qty:2},
				testProduct2 = {name:"test", qty:3};
			Cart.add(testProduct0);
			Cart.add(testProduct1);
			Cart.add(testProduct2);
			expect(Cart.count()).toEqual( 9 );
			Cart.clear();
			expect(Cart.count()).toEqual( 0 );
		}));
		it("should return total price", inject(function (Cart) {
			var testProduct0 = {name:"test", qty:4, price:10},
				testProduct1 = {name:"test", qty:2, price:10},
				testProduct2 = {name:"test", qty:3, price:10};
			Cart.add(testProduct0);
			Cart.add(testProduct1);
			Cart.add(testProduct2);
			expect(Cart.count()).toEqual( 9 );
			expect(Cart.totalPrice()).toEqual( 90 );
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