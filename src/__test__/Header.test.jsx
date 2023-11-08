import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { useCart, useModalDispatch } from "../components/RootContext";

import Header, { HeaderBadge } from "../components/layout/Header";

jest.mock("../firebase-config", () => ({
	...jest.requireActual("../firebase-config"),
	initialAuth: () => ({
		onAuthStateChanged: jest.fn(() => jest.fn()),
	}),
}));

jest.mock("../components/RootContext");
jest.mock("../utils/handleUserAccount");
jest.mock("../utils/handleUserCarts");

describe("Renders Header Component", () => {
	it("Should return Header DOM", () => {
		useCart.mockReturnValueOnce([]);

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
		const mockUseCart = [
			{
				id: 0,
				name: "fake",
				url: "../",
				price: "19.90",
				quantity: 1,
			},
		];

		useCart.mockReturnValueOnce(mockUseCart);

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
		useCart.mockReturnValueOnce([]);

		const mockFn = jest.fn();

		useModalDispatch.mockReturnValueOnce(mockFn);

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

		expect(mockFn).toBeCalledTimes(1);
	});
});
