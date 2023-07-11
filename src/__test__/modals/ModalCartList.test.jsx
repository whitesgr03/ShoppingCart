import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

import ModalCartList from "../../components/modals/ModalCartList";

let mockModalDispatch = null;
let mockCartDispatch = null;

jest.mock("../../App/RootContext", () => ({
	...jest.requireActual("../../App/RootContext"),
	useModalDispatch: () => mockModalDispatch,
	useCartDispatch: () => mockCartDispatch,
}));

describe("Renders ModalCartList Component", () => {
	it("Should show Remove Alert modal DOM with click event", async () => {
		mockModalDispatch = jest.fn();

		const mockCartData = [
			{
				id: 0,
				name: "fake",
				url: "../",
				price: 19.9,
				quantity: 1,
			},
		];
		const user = userEvent.setup();

		const routes = [
			{
				path: "/",
				element: <ModalCartList list={mockCartData} />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const button = screen.getByTestId("removeBtn");

		await user.pointer({ keys: "[MouseLeft]", target: button });

		expect(mockModalDispatch).toBeCalledTimes(1);
	});
	it("Should change select value with change event", async () => {
		mockCartDispatch = jest.fn();

		const mockCartData = [
			{
				id: 0,
				name: "fake",
				url: "../",
				price: 19.9,
				quantity: 1,
			},
		];

		const user = userEvent.setup();

		const routes = [
			{
				path: "/",
                element: <ModalCartList list={mockCartData} />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const select = screen.getByTestId("quantity");

		expect(select).toHaveValue("1");

		await user.selectOptions(select, "2");

		expect(mockCartDispatch).toBeCalledTimes(1);
	});
});
