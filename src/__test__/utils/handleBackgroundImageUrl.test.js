import { initialStorage } from "../../firebase-config";

import getBackgroundImageUrl from "../../utils/handleBackgroundImageUrl";

jest.mock("../../firebase-config.js");

it("Should successfully fetch Background Image data", async () => {
	const mockResult = {
		message: "Get background-image url success.",
		success: true,
		data: "https://firebasestorage.googleapis.com/7c87-4d45-aa9d-5b41193d4a10",
	};

	const mockGetDownloadURL = jest.fn(() => mockResult.data);

	const mockRef = jest.fn(() => ({
		getDownloadURL: mockGetDownloadURL,
	}));
	const mockInitialStorage = {
		ref: mockRef,
	};

	initialStorage.mockReturnValueOnce(mockInitialStorage);

	const actual = await getBackgroundImageUrl("home");

	const expected = mockResult;

	expect(actual).toEqual(expected);
});

it("Should failed to fetch Background Image data", async () => {
	const mockResult = {
		message: "failed fetch",
		success: false,
	};

	const mockGetDownloadURL = jest.fn(() => {
		throw mockResult.message;
	});

	const mockRef = jest.fn(() => ({
		getDownloadURL: mockGetDownloadURL,
	}));

	const mockInitialStorage = {
		ref: mockRef,
	};

	initialStorage.mockReturnValueOnce(mockInitialStorage);

	const actual = await getBackgroundImageUrl("home");

	const expected = mockResult;

	expect(actual).toEqual(expected);
});
