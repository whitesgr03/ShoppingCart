import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import userEvent from "@testing-library/user-event";

import ProductsSearchBar from "../../components/products/ProductsSearchBar";

describe("Renders ProductsNavbar Component", () => {
	it("Should return ProductsNavbar DOM", () => {
		const mockFilterText = "";
		const mockOnFilterTextChange = jest.fn();

		const routes = [
			{
				path: "/",
				element: (
					<ProductsSearchBar
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

		const actual = screen.getByTestId("searchBar");

		expect(actual).toHaveClass("searchBar");
	});

	it("Should toggle active-border class with Event focus and blur in input DOM", async () => {
		const mockFilterText = "";
		const mockOnFilterTextChange = jest.fn();

		const routes = [
			{
				path: "/",
				element: (
					<ProductsSearchBar
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

		const input = screen.getByTestId("search");

		await waitFor(() => {
			input.focus();
		});

		const actual = screen.getByTestId("searchBar");
		expect(actual).toHaveClass("active-border");

		await waitFor(() => {
			input.blur();
		});

		expect(actual).not.toHaveClass("active-border");
	});

	it("Should return filterText with Submit event", async () => {
		const user = userEvent.setup();

		const mockFilterText = "Bag";
		const mockOnFilterTextChange = jest.fn();

		const routes = [
			{
				path: "/",
				element: (
					<ProductsSearchBar
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

		expect(mockOnFilterTextChange).toBeCalledTimes(1);
		expect(mockOnFilterTextChange.mock.calls[0][0]).toEqual(mockFilterText);
	});

	it("Should return filterText with Change event", async () => {
		const user = userEvent.setup();

		const mockOnFilterTextChange = jest.fn();

		const routes = [
			{
				path: "/",
				element: (
					<ProductsSearchBar
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
