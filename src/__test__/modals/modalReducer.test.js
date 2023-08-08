import modalReducer from "../../components/modals/modalReducer";

it("Should pass type cart and return modal showCart and data", () => {
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
		type: "cart",
	};

	const actual = modalReducer(mockState, mockAction);

	const expected = { modal: "showCart", ...mockState };

	expect(actual).toEqual(expected);
});

it("Should pass type alert and return modal showAlert and alertProduct", () => {
	const mockState = [];

	const mockAction = {
		type: "alert",
		item: {
			id: 0,
			name: "fake",
			url: "../",
			price: 19.9,
			quantity: 1,
		},
	};

	const actual = modalReducer(mockState, mockAction);

	const expected = { modal: "showAlert", alertProduct: mockAction.item };

	expect(actual).toEqual(expected);
});

it("Should pass type close and return modal empty and date", () => {
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
		type: "close",
	};

	const actual = modalReducer(mockState, mockAction);

	const expected = { modal: "", ...mockState };

	expect(actual).toEqual(expected);
});

it("Should pass error type and return error message", () => {
	const mockState = [];

	const mockAction = {
		type: "active",
	};

	const actual = modalReducer(mockState, mockAction);

	const expected = "Unknown action: " + mockAction.type;

	expect(actual).toEqual(expected);
});
