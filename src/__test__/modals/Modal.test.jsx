import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { useCart, useModal, useModalDispatch } from "../../components/RootContext";

import Modal from "../../components/modals/Modal";

jest.mock("../../firebase-config");
jest.mock("../../components/RootContext");

describe("Renders Modal Component", () => {
	it("Should return Modal DOM", () => {
		const mockModal = {
			modal: "fake",
			alertProduct: {
				state: "",
				product: null,
			},
		};

		useModal.mockReturnValue(mockModal);

		useCart.mockReturnValueOnce([]);

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
		const mockModal = {
			modal: "fake",
			alertProduct: {
				state: "",
				product: null,
			},
		};

		const mockModalDispatch = jest.fn();

		useModal.mockReturnValue(mockModal);

		useCart.mockReturnValueOnce([]);

		useModalDispatch.mockReturnValueOnce(mockModalDispatch);

		const user = userEvent.setup();
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

		const shadow = screen.getByTestId("shadow");

		await user.pointer({ keys: "[MouseLeft]", target: shadow });

		expect(mockModalDispatch).toBeCalledTimes(1);
	});
});
