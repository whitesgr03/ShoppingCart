import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Shop, { Navbar, Products, ProductInfo } from "../components/Shop";

import { fetchResource } from "../utils/handleResource";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useLocation: jest
		.fn()
		.mockReturnValueOnce({
			state: {
				product: { id: 0, name: "fake", url: "../", price: "19.90" },
			},
		})
		.mockReturnValue({}),
}));

jest.mock("../utils/handleResource", () => ({
	...jest.requireActual("../utils/handleResource"),
	fetchResource: jest.fn(),
}));
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

		expect(actual).toHaveClass("shop");
	});
});

describe("Renders Navbar Component", () => {
	it("Should return Navbar Component", () => {
		const { container } = render(<Navbar />);

		const actual = container;

		expect(actual).toMatchSnapshot();
	});
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

describe("Renders ProductInfo Component", () => {
	it("Should return Navbar Component with state", () => {
		const routes = [
			{
				path: "/",
				element: <ProductInfo />,
			},
		];
		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});
		render(<RouterProvider router={router} />);

		expect(screen.getByRole("img")).toHaveAttribute("src", "../");

		expect(screen.getByText("fake")).toHaveClass("title");

		expect(screen.getByText("$19.90")).toHaveClass("price");
	});

	it("Should return Navbar Component without state", () => {
		const routes = [
			{
				path: "/",
				element: <ProductInfo />,
			},
		];
		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});
		render(<RouterProvider router={router} />);

		const actual = screen.getByTestId("productError");

		expect(actual).toHaveClass("productError");
	});
});
