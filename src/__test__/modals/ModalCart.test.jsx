import { screen, render } from "@testing-library/react";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

import ModalCart from "../../components/modals/ModalCart";

let mockCartData = [];

jest.mock("../../App/RootContext", () => ({
	...jest.requireActual("../../App/RootContext"),
	useCart: () => mockCartData,
}));

describe("Renders ModalCart Component", () => {
	it("Should return empty class without data", () => {
		const routes = [
			{
				path: "/",
				element: <ModalCart />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const actual = screen.getByTestId("empty");

		expect(actual).toBeInTheDocument();
	});
	it("Should return cart list with data", () => {
		mockCartData = [
			{
				id: 0,
				name: "fake",
				url: "../",
				price: 19.9,
				quantity: 1,
			},
		];

		const routes = [
			{
				path: "/",
				element: <ModalCart />,
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
