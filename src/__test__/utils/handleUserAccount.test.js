import { initialFirestore, initialAuth } from "../../firebase-config";

import {
	userLogout,
	checkUser,
	createUser,
} from "../../utils/handleUserAccount";

jest.mock("../../firebase-config.js");

it("Should successfully user logout", async () => {
	const mockResult = {
		message: "User logout success.",
		success: true,
	};

	const mockSignOut = jest.fn();

	const mockInitiallAuth = {
		signOut: mockSignOut,
	};

	initialAuth.mockReturnValueOnce(mockInitiallAuth);

	const actual = await userLogout();

	const expected = mockResult;

	expect(actual).toEqual(expected);
});

it("Should failed to user logout", async () => {
	const mockResult = {
		message: "Failed to user logout",
		success: false,
	};

	const mockSignOut = jest.fn(() => {
		throw mockResult.message;
	});

	const mockInitialAuth = {
		signOut: mockSignOut,
	};

	initialAuth.mockReturnValueOnce(mockInitialAuth);

	const actual = await userLogout();

	const expected = mockResult;

	expect(actual).toEqual(expected);
});

it("Should successfully fetch user data", async () => {
	const mockData = {
		exists: true,
	};

	const mockResult = {
		message: "Check user success.",
		success: true,
		data: {
			userExists: mockData.exists,
		},
	};

	const mockGet = jest.fn(() => mockData);

	const mockDOc = jest.fn(() => ({
		get: mockGet,
	}));

	const mockCollection = jest.fn(() => ({
		doc: mockDOc,
	}));

	const mockInitialFirestore = {
		collection: mockCollection,
	};

	initialFirestore.mockReturnValueOnce(mockInitialFirestore);

	const actual = await checkUser();

	const expected = mockResult;

	expect(actual).toEqual(expected);
});

it("Should failed to fetch user data", async () => {
	const mockResult = {
		message: "Failed to fetch",
		success: false,
	};

	const mockGet = jest.fn(() => {
		throw mockResult.message;
	});

	const mockDOc = jest.fn(() => ({
		get: mockGet,
	}));

	const mockCollection = jest.fn(() => ({
		doc: mockDOc,
	}));

	const mockInitialFirestore = {
		collection: mockCollection,
	};

	initialFirestore.mockReturnValueOnce(mockInitialFirestore);

	const actual = await checkUser();

	const expected = mockResult;

	expect(actual).toEqual(expected);
});

it("Should successfully create new user", async () => {
	const mockUserInfo = {
		name: "",
		email: "",
	};

	const mockResult = {
		message: "Create user success.",
		success: true,
	};

	const mockSet = jest.fn(() => mockResult);

	const mockDOc = jest.fn(() => ({
		set: mockSet,
	}));

	const mockCollection = jest.fn(() => ({
		doc: mockDOc,
	}));

	const mockInitialFirestore = {
		collection: mockCollection,
	};

	initialFirestore.mockReturnValueOnce(mockInitialFirestore);

	const actual = await createUser(mockUserInfo);

	const expected = mockResult;

	expect(actual).toEqual(expected);
});

it("Should  failed to create new user", async () => {
	const mockUserInfo = {
		name: "",
		email: "",
	};

	const mockResult = {
		message: "failed to fetch",
		success: false,
	};

	const mockSet = jest.fn(() => {
		throw mockResult.message;
	});

	const mockDOc = jest.fn(() => ({
		set: mockSet,
	}));

	const mockCollection = jest.fn(() => ({
		doc: mockDOc,
	}));

	const mockInitialFirestore = {
		collection: mockCollection,
	};

	initialFirestore.mockReturnValueOnce(mockInitialFirestore);

	const actual = await createUser(mockUserInfo);

	const expected = mockResult;

	expect(actual).toEqual(expected);
});
