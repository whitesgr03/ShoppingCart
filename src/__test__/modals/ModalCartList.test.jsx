import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import ModalCartList from "../../components/modals/ModalCartList";

import { updateUserCartItem } from "../../utils/handleUserCart";

jest.mock("../../utils/handleUserCart");

let mockUserId = null;
let mockCart = null;

const mockOnGetUserCart = jest.fn();
const mokSetAppError = jest.fn();
const mockOnOpenModal = jest.fn();

describe("ModalCartList Component", () => {
	it("Should update user cart item if a different option is selected", async () => {
		const user = userEvent.setup();
		mockCart = [
			{
				id: 0,
				name: "fake",
				url: "../",
				price: 19.9,
				quantity: 1,
			},
		];

		render(
			<ModalCartList
				userId={mockUserId}
				cart={mockCart}
				onGetUserCart={mockOnGetUserCart}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			/>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByRole("combobox");
		expect(element).toHaveValue(mockCart.quantity);

		await user.selectOptions(element, "2");

		expect(element).toHaveValue("2");
		expect(updateUserCartItem).toBeCalledTimes(1);
		expect(mockOnGetUserCart).toBeCalledTimes(1);
	});
	it("Should set app error if update user cart item fails", async () => {
		updateUserCartItem.mockImplementationOnce(() => {
			throw new Error();
		});
		const user = userEvent.setup();
		mockCart = [
			{
				id: 0,
				name: "fake",
				url: "../",
				price: 19.9,
				quantity: 1,
			},
		];

		render(
			<ModalCartList
				userId={mockUserId}
				cart={mockCart}
				onGetUserCart={mockOnGetUserCart}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			/>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByRole("combobox");

		await user.selectOptions(element, "2");

		expect(mokSetAppError).toBeCalledTimes(1);
	});
	it("Should open alert Modal if button is clicked", async () => {
		const user = userEvent.setup();
		mockCart = [
			{
				id: 0,
				name: "fake",
				url: "../",
				price: 19.9,
				quantity: 1,
			},
		];

		render(
			<ModalCartList
				userId={mockUserId}
				cart={mockCart}
				onGetUserCart={mockOnGetUserCart}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			/>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByRole("button");

		await user.click(element);

		expect(mockOnOpenModal).toBeCalledTimes(1);
	});
});
