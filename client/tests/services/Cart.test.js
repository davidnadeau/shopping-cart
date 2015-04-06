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
			var testProduct0 = {name:"test", qty:4, price:10};
			expect(Cart.contains(testProduct0)).toEqual( false );
			Cart.add(testProduct0);
			expect(Cart.contains(testProduct0)).toEqual( true );
		}));
		it("should count its length", inject(function (Cart) {
			var testProduct0 = {name:"test", qty:4, price:10},
				testProduct1 = {name:"test", qty:2, price:10},
				testProduct2 = {name:"test", qty:3, price:10};
			Cart.add(testProduct0);
			Cart.add(testProduct1);
			Cart.add(testProduct2);
			expect(Cart.count()).toEqual( 9 );
		}));
		it("should clear itself", inject(function (Cart) {
			var testProduct0 = {name:"test", qty:4, price:10},
				testProduct1 = {name:"test", qty:2, price:10},
				testProduct2 = {name:"test", qty:3, price:10};
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
			var testProduct0 = {name:"test", qty:4, price:10};
			expect(Cart.contains(testProduct0)).toEqual( false );
			Cart.add(testProduct0);
			expect(Cart.contains(testProduct0)).toEqual( true );
		}));
		it("should remove an item", inject(function (Cart) {
			var testProduct0 = {name:"test", qty:4, price:10};
			Cart.add(testProduct0);
			expect(Cart.contains(testProduct0)).toEqual( true );
			Cart.remove(testProduct0);
			expect(Cart.contains(testProduct0)).toEqual( false );
		}));
		it("should update an items quantity", inject(function (Cart) {
			var testProduct0 = {name:"test", qty:4, price:10},
				testProduct1 = {name:"test", qty:2, price:10};
			Cart.add(testProduct0);
			expect(Cart.count()).toEqual( 4 );
			// update the item with name 'test' to have qty of 2
			Cart.update(testProduct1);
			expect(Cart.count()).toEqual( 2 );
		}));
		it("should return the total with shipping and tax", inject(function (Cart) {
			var testProduct0 = {name:"test", qty:4, price:10},
				price = testProduct0.qty*testProduct0.price,
				tax = price * 0.15,
				shipping = price * 0.2;
			Cart.add(testProduct0);
			expect(Cart.tax()).toEqual( tax );
			expect(Cart.shippingAndHandling()).toEqual( shipping );
			expect(Cart.finalTotal()).toEqual( price + tax + shipping );
		}));
	});
});