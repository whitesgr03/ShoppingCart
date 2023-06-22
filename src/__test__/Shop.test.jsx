import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Shop, { Navbar, Products, ProductInfo } from "../components/Shop";

import { fetchResource } from "../utils/handleResource";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useLocation: jest
		.fn()
		.mockReturnValueOnce({})
		.mockReturnValue({
			state: {
				product: { id: 0, name: "fake", url: "../", price: 19.9 },
			},
		}),
	useOutletContext: jest
		.fn()
		.mockReturnValueOnce({
			products: [],
			filterText: "",
		})
		.mockReturnValueOnce({
			products: [
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
			],
			filterText: "Bag",
		})
		.mockReturnValue({
			products: [
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
			],
			filterText: "",
		}),
}));

jest.mock("../utils/handleResource", () => ({
	...jest.requireActual("../utils/handleResource"),
	fetchResource: jest.fn(),
}));

describe("Renders Navbar Component", () => {
	it("Should return Navbar DOM", () => {
		const routes = [
			{
				path: "/",
				element: <Navbar />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const actual = screen.getByTestId("navigation");

		expect(actual).toHaveClass("navigation");
	});
	it("Should return searchBar DOM", () => {
		const mockIsShopRoute = true;

		const routes = [
			{
				path: "/",
				element: <Navbar isShopRoute={mockIsShopRoute} />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const actual = screen.getByTestId("searchBar");

		expect(actual).toHaveClass("searchBar");
	});

	it("Should return filterText with click event", async () => {
		const user = userEvent.setup();

		const mockIsShopRoute = true;
		const mockFilterText = "Bag";
		const mockOnFilterTextChange = jest.fn();

		const routes = [
			{
				path: "/",
				element: (
					<Navbar
						isShopRoute={mockIsShopRoute}
						filterText={mockFilterText}
						onFilterTextChange={mockOnFilterTextChange}
					/>
				),
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const button = screen.getByRole("button");

		await user.pointer({ keys: "[MouseLeft]", target: button });

		expect(mockOnFilterTextChange.mock.calls[0][0]).toEqual(mockFilterText);
	});

	it("Should return filterText with change event", async () => {
		const user = userEvent.setup();

		const mockIsShopRoute = true;
		const mockOnFilterTextChange = jest.fn();

		const routes = [
			{
				path: "/",
				element: (
					<Navbar
						isShopRoute={mockIsShopRoute}
						onFilterTextChange={mockOnFilterTextChange}
					/>
				),
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const input = screen.getByTestId("search");

		const mockFilterText = "Bag";

		await user.type(input, mockFilterText);

		expect(mockOnFilterTextChange).toBeCalledTimes(3);

		expect(mockOnFilterTextChange.mock.lastCall[0]).toEqual(mockFilterText);
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
