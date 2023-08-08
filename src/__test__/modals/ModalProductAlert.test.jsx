import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { deleteUserCartItem } from "../../utils/handleUserCarts";

import {
	useModal,
	useModalDispatch,
	useCartDispatch,
} from "../../App/RootContext";

import ModalProductAlert from "../../components/modals/ModalProductAlert";

let mockNavigate = null;

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: jest.fn(() => mockNavigate),
}));

jest.mock("../../firebase-config");
jest.mock("../../utils/handleUserCarts");
jest.mock("../../App/RootContext");
jest.mock("../../utils/handleUserCarts");

describe("Renders Alert Component", () => {
	it("Should return ModalProductAlert DOM", async () => {
		const mockModal = {
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

		useModal.mockReturnValueOnce(mockModal);

		const mockIsLoad = false;
		const mockOnLoading = jest.fn();

		const { container } = render(
			<ModalProductAlert
				isLoading={mockIsLoad}
				onLoading={mockOnLoading}
			/>
		);

		expect(container).toMatchSnapshot();
	});
	it("Should show cart DOM with click event", async () => {
		const mockModal = {
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

		const mockModalDispatch = jest.fn();

		useModal.mockReturnValueOnce(mockModal);
		useModalDispatch.mockReturnValueOnce(mockModalDispatch);

		const mockIsLoad = false;
		const mockOnLoading = jest.fn();

		const user = userEvent.setup();

		render(
			<ModalProductAlert
				isLoading={mockIsLoad}
				onLoading={mockOnLoading}
			/>
		);

		const button = screen.getByRole("button", { name: "VIEW CART" });

		await user.pointer({ keys: "[MouseLeft]", target: button });

		const actual = screen.getByTestId("title");

		const expected = "Add product to cart";

		expect(actual).toHaveTextContent(expected);

		expect(mockModalDispatch).toBeCalledTimes(1);
	});
	it("Should successfully remove product with click event", async () => {
		const mockModal = {
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

		const mockModalDispatch = jest.fn();
		const mockCartDispatch = jest.fn();

		const deleteFetchResult = {
			message: "Delete cart item success.",
			success: true,
		};

		useModal.mockReturnValueOnce(mockModal);
		useModalDispatch.mockReturnValueOnce(mockModalDispatch);
		useCartDispatch.mockReturnValueOnce(mockCartDispatch);
		deleteUserCartItem.mockReturnValueOnce(deleteFetchResult);

		const mockIsLoad = false;
		const mockOnLoading = jest.fn();

		const user = userEvent.setup();

		render(
			<ModalProductAlert
				isLoading={mockIsLoad}
				onLoading={mockOnLoading}
			/>
		);

		const button = screen.getByRole("button", { name: "REMOVE" });

		await user.pointer({ keys: "[MouseLeft]", target: button });

		const actual = screen.getByTestId("title");

		const expected = "Remove product from cart";

		expect(actual).toHaveTextContent(expected);

		expect(mockOnLoading).toBeCalledTimes(2);
		expect(mockCartDispatch).toBeCalledTimes(1);
		expect(mockModalDispatch).toBeCalledTimes(1);
	});
	it("Should failed to remove product with click event", async () => {
		mockNavigate = jest.fn();

		const mockModal = {
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

		const deleteFetchResult = {
			message: "failed to remove",
			success: false,
		};

		useModal.mockReturnValueOnce(mockModal);
		deleteUserCartItem.mockReturnValueOnce(deleteFetchResult);

		const mockIsLoad = false;
		const mockOnLoading = jest.fn();

		const user = userEvent.setup();

		render(
			<ModalProductAlert
				isLoading={mockIsLoad}
				onLoading={mockOnLoading}
			/>
		);

		const button = screen.getByRole("button", { name: "REMOVE" });

		await user.pointer({ keys: "[MouseLeft]", target: button });

		const actual = screen.getByTestId("title");

		const expected = "Remove product from cart";

		expect(actual).toHaveTextContent(expected);

		expect(mockNavigate).toBeCalledTimes(1);
		expect(mockOnLoading).toBeCalledTimes(2);
	});
});
