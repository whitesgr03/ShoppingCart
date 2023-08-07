import { initialFirestore, initialAuth } from "../../firebase-config";

import {
	getUserCart,
	addUserCartItem,
	updateUserCartItem,
	deleteUserCartItem,
} from "../../utils/handleUserCarts";

jest.mock("../../firebase-config.js");

it("Should successfully fetch user cart", async () => {
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
		message: "Get cart success.",
		success: true,
		data: mockData,
	};

	const mockGet = jest.fn(() => mockFetchDate);

	const mockDocCollection = jest.fn(() => ({
		get: mockGet,
	}));

	const mockDoc = jest.fn(() => ({
		collection: mockDocCollection,
	}));

	const mockCollection = jest.fn(() => ({
		doc: mockDoc,
	}));

	const mockInitialFirestore = {
		collection: mockCollection,
	};

	initialFirestore.mockReturnValueOnce(mockInitialFirestore);

	const mockInitialAuth = {
		currentUser: {
			uid: "",
		},
	};

	initialAuth.mockReturnValueOnce(mockInitialAuth);

	const actual = await getUserCart();

	const expected = mockResult;

	expect(actual).toEqual(expected);
});
it("Should failed to fetch user cart", async () => {
	const mockResult = {
		message: "failed to fetch",
		success: false,
	};

	const mockGet = jest.fn(() => {
		throw mockResult.message;
	});

	const mockDocCollection = jest.fn(() => ({
		get: mockGet,
	}));

	const mockDoc = jest.fn(() => ({
		collection: mockDocCollection,
	}));

	const mockCollection = jest.fn(() => ({
		doc: mockDoc,
	}));

	const mockInitialFirestore = {
		collection: mockCollection,
	};

	initialFirestore.mockReturnValueOnce(mockInitialFirestore);

	const mockInitialAuth = {
		currentUser: {
			uid: "",
		},
	};

	initialAuth.mockReturnValueOnce(mockInitialAuth);

	const actual = await getUserCart();

	const expected = mockResult;

	expect(actual).toEqual(expected);
});

it("Should successfully add user cart item", async () => {
	const mockData = [
		{
			id: 1,
			name: "bag",
			price: 19.9,
			url: "https://fake1.com",
		},
	];

	const mockResult = {
		message: "Add to cart success.",
		success: true,
	};

	const mockSet = jest.fn();

	const mockDocCollectionDOc = jest.fn(() => ({
		set: mockSet,
	}));

	const mockDocCollection = jest.fn(() => ({
		doc: mockDocCollectionDOc,
	}));

	const mockDoc = jest.fn(() => ({
		collection: mockDocCollection,
	}));

	const mockCollection = jest.fn(() => ({
		doc: mockDoc,
	}));

	const mockInitialFirestore = {
		collection: mockCollection,
	};

	initialFirestore.mockReturnValueOnce(mockInitialFirestore);

	const mockInitialAuth = {
		currentUser: {
			uid: "",
		},
	};

	initialAuth.mockReturnValueOnce(mockInitialAuth);

	const actual = await addUserCartItem(mockData);

	const expected = mockResult;

	expect(actual).toEqual(expected);
});
it("Should failed to add user cart item", async () => {
	const mockResult = {
		message: "Failed to fetch",
		success: false,
	};

	const mockSet = jest.fn(() => {
		throw mockResult.message;
	});

	const mockDocCollectionDOc = jest.fn(() => ({
		set: mockSet,
	}));

	const mockDocCollection = jest.fn(() => ({
		doc: mockDocCollectionDOc,
	}));

	const mockDoc = jest.fn(() => ({
		collection: mockDocCollection,
	}));

	const mockCollection = jest.fn(() => ({
		doc: mockDoc,
	}));

	const mockInitialFirestore = {
		collection: mockCollection,
	};

	initialFirestore.mockReturnValueOnce(mockInitialFirestore);

	const mockInitialAuth = {
		currentUser: {
			uid: "",
		},
	};

	initialAuth.mockReturnValueOnce(mockInitialAuth);

	const actual = await addUserCartItem(mockResult);

	const expected = mockResult;

	expect(actual).toEqual(expected);
});

it("Should successfully update user cart item", async () => {
	const mockData = {
		id: 1,
	};

	const mockResult = {
		message: "Update cart item success.",
		success: true,
	};

	const mockUpdate = jest.fn();

	const mockDocCollectionDOc = jest.fn(() => ({
		update: mockUpdate,
	}));

	const mockDocCollection = jest.fn(() => ({
		doc: mockDocCollectionDOc,
	}));

	const mockDoc = jest.fn(() => ({
		collection: mockDocCollection,
	}));

	const mockCollection = jest.fn(() => ({
		doc: mockDoc,
	}));

	const mockInitialFirestore = {
		collection: mockCollection,
	};

	initialFirestore.mockReturnValueOnce(mockInitialFirestore);

	const mockInitialAuth = {
		currentUser: {
			uid: "",
		},
	};

	initialAuth.mockReturnValueOnce(mockInitialAuth);

	const actual = await updateUserCartItem(mockData);

	const expected = mockResult;

	expect(actual).toEqual(expected);
});
it("Should failed to update user cart item", async () => {
	const mockData = {
		id: 1,
	};

	const mockResult = {
		message: "failed to update",
		success: false,
	};

	const mockUpdate = jest.fn(() => {
		throw mockResult.message;
	});

	const mockDocCollectionDOc = jest.fn(() => ({
		update: mockUpdate,
	}));

	const mockDocCollection = jest.fn(() => ({
		doc: mockDocCollectionDOc,
	}));

	const mockDoc = jest.fn(() => ({
		collection: mockDocCollection,
	}));

	const mockCollection = jest.fn(() => ({
		doc: mockDoc,
	}));

	const mockInitialFirestore = {
		collection: mockCollection,
	};

	initialFirestore.mockReturnValueOnce(mockInitialFirestore);

	const mockInitialAuth = {
		currentUser: {
			uid: "",
		},
	};

	initialAuth.mockReturnValueOnce(mockInitialAuth);

	const actual = await updateUserCartItem(mockData);

	const expected = mockResult;

	expect(actual).toEqual(expected);
});

it("Should successfully delete user cart item", async () => {
	const mockId = 1;

	const mockResult = {
		message: "Delete cart item success.",
		success: true,
	};

	const mockDelete = jest.fn();

	const mockDocCollectionDOc = jest.fn(() => ({
		delete: mockDelete,
	}));

	const mockDocCollection = jest.fn(() => ({
		doc: mockDocCollectionDOc,
	}));

	const mockDoc = jest.fn(() => ({
		collection: mockDocCollection,
	}));

	const mockCollection = jest.fn(() => ({
		doc: mockDoc,
	}));

	const mockInitialFirestore = {
		collection: mockCollection,
	};

	initialFirestore.mockReturnValueOnce(mockInitialFirestore);

	const mockInitialAuth = {
		currentUser: {
			uid: "",
		},
	};

	initialAuth.mockReturnValueOnce(mockInitialAuth);

	const actual = await deleteUserCartItem(mockId);

	const expected = mockResult;

	expect(actual).toEqual(expected);
});
it("Should failed to delete user cart item", async () => {
	const mockId = 1;

	const mockResult = {
		message: "failed to delete",
		success: false,
	};

	const mockDelete = jest.fn(() => {
		throw mockResult.message;
	});

	const mockDocCollectionDOc = jest.fn(() => ({
		delete: mockDelete,
	}));

	const mockDocCollection = jest.fn(() => ({
		doc: mockDocCollectionDOc,
	}));

	const mockDoc = jest.fn(() => ({
		collection: mockDocCollection,
	}));

	const mockCollection = jest.fn(() => ({
		doc: mockDoc,
	}));

	const mockInitialFirestore = {
		collection: mockCollection,
	};

	initialFirestore.mockReturnValueOnce(mockInitialFirestore);

	const mockInitialAuth = {
		currentUser: {
			uid: "",
		},
	};

	initialAuth.mockReturnValueOnce(mockInitialAuth);

	const actual = await deleteUserCartItem(mockId);

	const expected = mockResult;

	expect(actual).toEqual(expected);
});
