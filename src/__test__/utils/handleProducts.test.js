import { initialFirestore } from "../../firebase-config";

import getAllProducts from "../../utils/handleProducts";

jest.mock("../../firebase-config.js");

it("Should successfully fetch Products data", async () => {
	const mockData = [
		{
			id: 1,

			name: "bag",
			price: 19.9,
			url: "https://fake1.com",
		},
		{
			id: 2,

			name: "top",
			price: 29.9,
			url: "https://fake2.com",
		},
	];

	const mockFetchDate = {
		docs: [
			{
				id: 1,
				data: jest.fn(() => ({
					name: "bag",
					price: 19.9,
					url: "https://fake1.com",
				})),
			},
			{
				id: 2,

				data: jest.fn(() => ({
					name: "top",
					price: 29.9,
					url: "https://fake2.com",
				})),
			},
		],
	};

	const mockResult = {
		message: "Get products success.",
		success: true,
		data: mockData,
	};

	const mockGet = jest.fn(() => mockFetchDate);

	const mockCollection = jest.fn(() => ({
		get: mockGet,
	}));

	const mockInitialFirestore = {
		collection: mockCollection,
	};

	initialFirestore.mockReturnValueOnce(mockInitialFirestore);

	const actual = await getAllProducts();

	const expected = mockResult;

	expect(actual).toEqual(expected);
});

it("Should failed to fetch Products data", async () => {
	const mockResult = {
		message: "Failed to fetch products",
		success: false,
	};

	const mockGet = jest.fn(() => {
		throw mockResult.message;
	});

	const mockCollection = jest.fn(() => ({
		get: mockGet,
	}));

	const mockInitialFirestore = {
		collection: mockCollection,
	};

	initialFirestore.mockReturnValueOnce(mockInitialFirestore);

	const actual = await getAllProducts();

	const expected = mockResult;

	expect(actual).toEqual(expected);
});
