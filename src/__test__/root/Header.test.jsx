import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Header, { HeaderBadge } from "../../App/Header";

let mockUseCart = [];
let mockDispatch = null;

jest.mock("../../App/RootContext", () => ({
	...jest.requireActual("../../App/RootContext"),
	useCart: () => mockUseCart,
	useModalDispatch: () => mockDispatch,
}));

describe("Renders Header Component", () => {
	it("Should return Header DOM", () => {
		const routes = [
			{
				path: "/",
				element: <Header />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});
		render(<RouterProvider router={router} />);

		const actual = screen.getByTestId("sidebar");

		expect(actual).toBeInTheDocument();
	});

	it("Should return HeaderBadge DOM with cartList", () => {
		mockUseCart = [
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
				element: <HeaderBadge />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});
		render(<RouterProvider router={router} />);

		const actual = screen.queryByTestId("badge");

		expect(actual).toHaveTextContent("1");
	});

	it("Should show cart Alert with click event", async () => {
		mockDispatch = jest.fn();

		const user = userEvent.setup();

		const routes = [
			{
				path: "/",
				element: <Header />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});
		render(<RouterProvider router={router} />);

		const button = screen.getByTestId("cart");

		await user.pointer({ keys: "[MouseLeft]", target: button });

		expect(mockDispatch).toBeCalledTimes(1);
	});
});
