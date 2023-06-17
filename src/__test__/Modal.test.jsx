import { screen, render } from "@testing-library/react";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Modal, { Cart } from "../components/Modal";

describe("Renders Modal Component", () => {
	it("Should return Modal DOM without Cart Component", () => {
		const { container } = render(<Modal />);

		expect(container).toMatchSnapshot();
	});
});

describe("Renders Cart Component", () => {
	it("Should return empty class without data", () => {
		const mockCartList = [];

		render(<Cart cartList={mockCartList} />);

		const actual = screen.getByTestId("empty");

		expect(actual).toBeInTheDocument();
	});
	it("Should return cart list with data", () => {
		const mockCartList = [
			{
				id: 0,
				name: "fake",
				url: "../",
				price: "19.90",
				quantity: 1,
			},
		];

		const routes = [
			{
				path: "/",
				element: <Cart cartList={mockCartList} />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		expect(screen.getByRole("img")).toHaveAttribute("src", "../");

		expect(screen.getByTestId("quantity")).toHaveValue("1");

		expect(screen.getByText("fake")).toHaveClass("name");

		expect(screen.getByText("Total:")).toHaveClass("price");
	});
});
