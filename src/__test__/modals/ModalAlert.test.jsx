import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ModalAlert from "../../components/modals/ModalAlert";

let mockModal = null;

let mockModalDispatch = null;
let mockCartDispatch = null;

jest.mock("../../App/RootContext", () => ({
	...jest.requireActual("../../App/RootContext"),
	useModal: () => mockModal,
	useModalDispatch: () => mockModalDispatch,
	useCartDispatch: () => mockCartDispatch,
}));

describe("Renders Alert Component", () => {
	it("Should show cart DOM with click event", async () => {
		mockModal = {
			modal: "",
			alertProduct: {
				state: "add",
				product: {
					id: 0,
					name: "fake",
					url: "../",
					price: 19.9,
				},
			},
		};

		mockModalDispatch = jest.fn();

		const user = userEvent.setup();

		render(<ModalAlert />);

		const button = screen.getByRole("button", { name: "VIEW CART" });

		await user.pointer({ keys: "[MouseLeft]", target: button });

		const actual = screen.getByTestId("title");

		const expected = "Add product to cart";

		expect(actual).toHaveTextContent(expected);

		expect(mockModalDispatch).toBeCalledTimes(1);
	});

	it("Should remove product with click event", async () => {
		mockModal = {
			modal: "",
			alertProduct: {
				state: "remove",
				product: {
					id: 0,
					name: "fake",
					url: "../",
					price: 19.9,
				},
			},
		};

		mockCartDispatch = jest.fn();

		const user = userEvent.setup();

		render(<ModalAlert />);

		const button = screen.getByRole("button", { name: "REMOVE" });

		await user.pointer({ keys: "[MouseLeft]", target: button });

		const actual = screen.getByTestId("title");

		const expected = "Remove product from cart";

		expect(actual).toHaveTextContent(expected);

		expect(mockCartDispatch).toBeCalledTimes(1);
	});
});
