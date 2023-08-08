import cartReducer from "../../components/modals/modalCartReducer";

it("Should pass type initialize_cart and return cart data", () => {
	const mockState = [];

	const mockAction = {
		type: "initialize_cart",
		cart: {
			id: 0,
			name: "fake",
			url: "../",
			price: 19.9,
			quantity: 1,
		},
	};

	const actual = cartReducer(mockState, mockAction);

	const expected = mockAction.cart;

	expect(actual).toEqual(expected);
});

it("Should pass type 'added' and product to add new item", () => {
	const mockState = [
		{
			id: 0,
			name: "fake",
			url: "../",
			price: 19.9,
			quantity: 1,
		},
	];

	const mockAction = {
		type: "added",
		product: {
			id: 1,
			name: "fakeItem",
			url: "../",
			price: 29.9,
			quantity: 1,
		},
	};

	const actual = cartReducer(mockState, mockAction);

	const expected = [...mockState, mockAction.product];

	expect(actual).toEqual(expected);
});

it("Should pass type changed and product to update item", () => {
	const mockState = [
		{
			id: 0,
			name: "fake",
			url: "../",
			price: 19.9,
			quantity: 1,
		},
	];

	const mockAction = {
		type: "changed",
		product: {
			id: 0,
			name: "fakeItem",
			url: "../",
			price: 29.9,
			quantity: 1,
		},
	};

	const actual = cartReducer(mockState, mockAction);

	const expected = [mockAction.product];

	expect(actual).toEqual(expected);
});

it("Should pass type deleted and id to remove item", () => {
	const mockState = [
		{
			id: 0,
			name: "fake",
			url: "../",
			price: 19.9,
			quantity: 1,
		},
		{
			id: 1,
			name: "fakeItem",
			url: "../",
			price: 29.9,
			quantity: 1,
		},
	];

	const mockAction = {
		type: "deleted",
		id: 1,
	};

	const actual = cartReducer(mockState, mockAction);

	const expected = [mockState[0]];

	expect(actual).toEqual(expected);
});
