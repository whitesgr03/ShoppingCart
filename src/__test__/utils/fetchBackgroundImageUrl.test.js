import fetchBackgroundImageUrl from "../../utils/fetchBackgroundImageUrl";

jest.mock("../../utils/fetchBackgroundImageUrl");

it("Should fetch Background Image Url", async () => {
	const mockImageUrl =
		"https://firebasestorage.googleapis.com/7c87-4d45-aa9d-5b41193d4a10";

	fetchBackgroundImageUrl.mockReturnValueOnce(mockImageUrl);

	const actual = await fetchBackgroundImageUrl();

	const expected = mockImageUrl;

	expect(actual).toEqual(expected);
});
