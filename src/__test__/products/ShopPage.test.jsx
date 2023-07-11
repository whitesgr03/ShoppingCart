import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Shop from "../../components/products/ShopPage";

import { fetchResource } from "../../utils/utils";

const mockFetchData = [
	{
		id: 0,
		name: "fakeBag",
		url: "../",
		price: 19.9,
	},
	{
		id: 1,
		name: "fakePants",
		url: "../",
		price: 19.9,
	},
];

jest.mock("../../utils/utils", () => ({
	...jest.requireActual("../../utils/utils"),
	fetchResource: jest.fn(() => mockFetchData),
}));

describe("Renders Shop Component", () => {
	it("Should return Shop DOM", async () => {
		const routes = [
			{
				path: "/",
				element: <Shop />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const loading = screen.getByTestId("loading");

		expect(loading).toHaveClass("loading");

		expect(fetchResource).toBeCalledTimes(1);

		await waitFor(() => {
			expect(loading).not.toBeInTheDocument();
		});
	});
});
