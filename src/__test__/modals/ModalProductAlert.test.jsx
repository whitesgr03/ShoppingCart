import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import ModalProductAlert from "../../components/modals/ModalProductAlert";

import { deleteUserCartItem } from "../../utils/handleUserCart";

jest.mock("../../utils/handleUserCart");

let mockProduct = null;
let mockBehavior = null;
let mockActive = null;

const mockUserId = null;

const mockOnGetUserCart = jest.fn();
const mokSetAppError = jest.fn();
const mockOnOpenModal = jest.fn();

describe("Alert Component", () => {
	it("Should render content if product is provide", async () => {
		mockProduct = {
			id: 0,
			name: "fake",
			url: "../",
			price: 19.9,
			quantity: 1,
		};

		render(
			<ModalProductAlert
				userId={mockUserId}
				product={mockProduct}
				behavior={mockBehavior}
				active={mockActive}
				onGetUserCart={mockOnGetUserCart}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			/>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByTestId("title");

		expect(element).toBeInTheDocument();
	});
	it("Should add class if active is true", async () => {
		mockActive = true;

		render(
			<ModalProductAlert
				userId={mockUserId}
				product={mockProduct}
				behavior={mockBehavior}
				active={mockActive}
				onGetUserCart={mockOnGetUserCart}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			/>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByTestId("productAlert");

		expect(element).toHaveClass("active");
	});
	it("Should not add class if active is false", async () => {
		mockActive = false;

		render(
			<ModalProductAlert
				userId={mockUserId}
				product={mockProduct}
				behavior={mockBehavior}
				active={mockActive}
				onGetUserCart={mockOnGetUserCart}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			/>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByTestId("productAlert");

		expect(element).not.toHaveClass("active");
	});
	it("Should render title with added text and button with added action if behavior is add", async () => {
		mockProduct = {
			id: 0,
			name: "fake",
			url: "../",
			price: 19.9,
			quantity: 1,
		};
		mockBehavior = "add";

		render(
			<ModalProductAlert
				userId={mockUserId}
				product={mockProduct}
				behavior={mockBehavior}
				active={mockActive}
				onGetUserCart={mockOnGetUserCart}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			/>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByTestId("title");
		const button = screen.getByRole("button", { name: "VIEW CART" });

		expect(element).toHaveTextContent("Add product to cart");
		expect(button).toBeInTheDocument();
	});
	it("Should render title with remove text and button with remove action if behavior is remove", async () => {
		mockProduct = {
			id: 0,
			name: "fake",
			url: "../",
			price: 19.9,
			quantity: 1,
		};
		mockBehavior = "remove";

		render(
			<ModalProductAlert
				userId={mockUserId}
				product={mockProduct}
				behavior={mockBehavior}
				active={mockActive}
				onGetUserCart={mockOnGetUserCart}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			/>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByTestId("title");
		const button = screen.getByRole("button", { name: "REMOVE" });

		expect(element).toHaveTextContent("Remove product from cart");
		expect(button).toBeInTheDocument();
	});
	it("Should open cart modal if view cart button is clicked", async () => {
		const user = userEvent.setup();
		mockProduct = {
			id: 0,
			name: "fake",
			url: "../",
			price: 19.9,
			quantity: 1,
		};
		mockBehavior = "add";

		render(
			<ModalProductAlert
				userId={mockUserId}
				product={mockProduct}
				behavior={mockBehavior}
				active={mockActive}
				onGetUserCart={mockOnGetUserCart}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			/>,
			{ wrapper: BrowserRouter }
		);

		const button = screen.getByRole("button", { name: "VIEW CART" });

		await user.click(button);

		expect(mockOnOpenModal).toBeCalledTimes(1);
	});
	it("Should open cart modal if cancel button is clicked", async () => {
		const user = userEvent.setup();
		mockProduct = {
			id: 0,
			name: "fake",
			url: "../",
			price: 19.9,
			quantity: 1,
		};
		mockBehavior = "remove";

		render(
			<ModalProductAlert
				userId={mockUserId}
				product={mockProduct}
				behavior={mockBehavior}
				active={mockActive}
				onGetUserCart={mockOnGetUserCart}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			/>,
			{ wrapper: BrowserRouter }
		);

		const button = screen.getByRole("button", { name: "CANCEL" });

		await user.click(button);

		expect(mockOnOpenModal).toBeCalledTimes(1);
	});
	it("Should remove item if remove button is clicked", async () => {
		const user = userEvent.setup();
		mockProduct = {
			id: 0,
			name: "fake",
			url: "../",
			price: 19.9,
			quantity: 1,
		};
		mockBehavior = "remove";

		render(
			<ModalProductAlert
				userId={mockUserId}
				product={mockProduct}
				behavior={mockBehavior}
				active={mockActive}
				onGetUserCart={mockOnGetUserCart}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			/>,
			{ wrapper: BrowserRouter }
		);

		const button = screen.getByRole("button", { name: "REMOVE" });

		await user.click(button);

		expect(deleteUserCartItem).toBeCalledTimes(1);
		expect(mockOnGetUserCart).toBeCalledTimes(1);
		expect(mockOnOpenModal).toBeCalledTimes(1);
	});
	it("Should set app error if remove item  is fails", async () => {
		deleteUserCartItem.mockImplementationOnce(() => {
			throw new Error();
		});
		const user = userEvent.setup();
		mockProduct = {
			id: 0,
			name: "fake",
			url: "../",
			price: 19.9,
			quantity: 1,
		};
		mockBehavior = "remove";

		render(
			<ModalProductAlert
				userId={mockUserId}
				product={mockProduct}
				behavior={mockBehavior}
				active={mockActive}
				onGetUserCart={mockOnGetUserCart}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			/>,
			{ wrapper: BrowserRouter }
		);

		const button = screen.getByRole("button", { name: "REMOVE" });

		await user.click(button);

		expect(mokSetAppError).toBeCalledTimes(1);
	});
});
