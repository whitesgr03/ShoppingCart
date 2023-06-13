import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import Shop, { Navbar, Products } from "../components/Shop";

import { fetchResource } from "../utils/handleResource";

jest.mock("../utils/handleResource", () => ({
	...jest.requireActual("../utils/handleResource"),
	fetchResource: jest.fn(async () => [
		{
			id: 0,
			name: "fake",
			url: "../",
			price: "19.90",
		},
	]),
}));

describe("Renders Shop Component", () => {
	it("Should return Shop DOM", () => {
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

		const actual = screen.getByTestId("shop");

		expect(actual).toHaveClass("products");
	});

	it("Should return Navbar Component", () => {
		const { container } = render(<Navbar />);

		const actual = container;

		expect(actual).toMatchSnapshot();
	});

	describe("Renders Products Component", () => {
		it("Should show loading before fetch", async () => {
			const routes = [
				{
					path: "/",
					element: <Products />,
				},
			];

			const router = createMemoryRouter(routes, {
				initialEntries: ["/"],
			});

			render(<RouterProvider router={router} />);

			expect(screen.getByTestId("items")).toHaveClass("loading");

			expect(fetchResource).toHaveBeenCalledTimes(1);

			await waitFor(() => [
				expect(screen.getByTestId("items")).not.toHaveClass("loading"),
			]);
		});

		it("Should show products after fetch", async () => {
			const routes = [
				{
					path: "/",
					element: <Products />,
				},
			];

			const router = createMemoryRouter(routes, {
				initialEntries: ["/"],
			});

			render(<RouterProvider router={router} />);

			const actual = await screen.findByRole("img");

			expect(actual).toHaveAttribute("src", "../");

			expect(screen.getByText("fake")).toBeInTheDocument();
			expect(screen.getByText("$19.90")).toBeInTheDocument();
		});
	});
});
