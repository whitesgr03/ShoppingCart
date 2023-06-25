import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import userEvent from "@testing-library/user-event";

import Shop, { Navbar, Products, ProductInfo } from "../components/Shop";

import { fetchResource } from "../utils/utils";


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
	it("Should show loading with empty products", () => {
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

		const actual = screen.getByTestId("products");

		expect(actual).toHaveClass("loading");
	});

	it("Should show products matching the search text", () => {
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

		const products = screen.getByTestId("products");

		expect(products).not.toHaveClass("loading");

		expect(screen.queryByText("fakePants")).not.toBeInTheDocument();

		const actual = screen.getByRole("img");

		expect(actual).toHaveAttribute("src", "../");

		expect(screen.getByText("fakeBag")).toBeInTheDocument();
		expect(screen.getByText("$19.90")).toBeInTheDocument();
	});

	it("Should show all products without searchText", () => {
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

		const products = screen.getByTestId("products");

		expect(products).not.toHaveClass("loading");

		expect(screen.getByText("fakePants")).toBeInTheDocument();
		expect(screen.getByText("fakeBag")).toBeInTheDocument();
	});
});

describe("Renders ProductInfo Component", () => {
	it("Should return ProductInfo DOM without state", () => {
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

	it("Should return ProductInfo DOM with state", () => {
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
});

describe("Renders Shop Component", () => {
	it("Should return Shop DOM with fetch", async () => {
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

		await waitFor(() => {
			expect(fetchResource).toBeCalledTimes(1);
		});
	});
});
