import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Modal from "../../components/modals/Modal";

let mockModal = null;
let mockModalDispatch = null;

jest.mock("../../App/RootContext", () => ({
	...jest.requireActual("../../App/RootContext"),
	useModal: () => mockModal,
	useModalDispatch: () => mockModalDispatch,
}));

describe("Renders Modal Component", () => {
	it("Should return Modal DOM", () => {
		mockModal = {
			modal: "",
			alertProduct: {
				state: "",
				product: null,
			},
		};

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
		mockModal = {
			modal: "",
			alertProduct: {
				state: "",
				product: null,
			},
		};
		mockModalDispatch = jest.fn();

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
