import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BrowserRouter } from "react-router-dom";

import ProductsNavbar from "../../components/products/ProductsNavbar";

describe("ProductsNavbar Component", () => {
	it("Should add class if input element gets focus", async () => {
		render(<ProductsNavbar />, { wrapper: BrowserRouter });

		const input = screen.getByRole("searchbox");
		const searchBar = screen.getByTestId("searchBar");

		await waitFor(() => {
			input.focus();
		});

		expect(searchBar).toHaveClass("active-border");
	});
	it("Should not class if input element become blur", async () => {
		render(<ProductsNavbar />, { wrapper: BrowserRouter });

		const input = screen.getByRole("searchbox");
		const searchBar = screen.getByTestId("searchBar");

		await waitFor(() => {
			input.blur();
		});

		expect(searchBar).not.toHaveClass("active-border");
	});
	it("Should set value if input element is typed", async () => {
		const user = userEvent.setup();

		render(<ProductsNavbar />, { wrapper: BrowserRouter });

		const input = screen.getByRole("searchbox");

		await user.type(input, "hello");

		expect(input).toHaveValue("hello");
	});
	it("Should search item if submitted", async () => {
		const mockSearchParams = jest.fn();

		const user = userEvent.setup();

		render(<ProductsNavbar onSearchParams={mockSearchParams} />, {
			wrapper: BrowserRouter,
		});

		const searchButton = screen.getByRole("button");

		await user.click(searchButton);

		expect(mockSearchParams).toBeCalledTimes(1);
	});
});
