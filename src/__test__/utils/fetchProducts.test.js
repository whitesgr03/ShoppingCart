import fetchProducts from "../../utils/fetchProducts";

jest.mock("../../utils/fetchProducts");

it("Should fetch Products", async () => {
	const mockProducts = [
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

	fetchProducts.mockReturnValueOnce(mockProducts);

	const actual = await fetchProducts();

	const expected = mockProducts;

	expect(actual).toEqual(expected);
});
