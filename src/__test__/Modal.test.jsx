import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Modal, { Cart } from "../components/Modal";

describe("Renders Modal Component", () => {
	it("Should return Modal DOM", () => {
		const routes = [
			{
				path: "/",
				element: <Modal />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const actual = screen.getByTestId("shadow");

		expect(actual).toBeInTheDocument();
	});

	it("Should close Modal DOM with click event", async () => {
		const mockToggleModal = jest.fn();
		const mockSetLatestItem = jest.fn();

		const user = userEvent.setup();
		const routes = [
			{
				path: "/",
				element: (
					<Modal
						onToggleModal={mockToggleModal}
						onSetLatestItem={mockSetLatestItem}
					/>
				),
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const shadow = screen.getByTestId("shadow");

		await user.pointer({ keys: "[MouseLeft]", target: shadow });

		expect(mockToggleModal).toBeCalledTimes(1);
		expect(mockSetLatestItem).toBeCalledTimes(1);
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
