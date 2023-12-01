import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import ModalCart from "../../components/modals/ModalCart";

jest.mock("../../utils/handleUserCart");

let mockCart = null;
let mockActive = null;

const mockOnOpenModal = jest.fn();

describe("ModalCart Component", () => {
	it("Should add class if active is true", () => {
		const MockComponent = <div data-testid="content"></div>;

		mockCart = [
			{
				id: 0,
				name: "fake",
				url: "../",
				price: 19.9,
				quantity: 1,
			},
		];
		mockActive = true;

		render(
			<ModalCart
				cart={mockCart}
				active={mockActive}
				onOpenModal={mockOnOpenModal}
			>
				{MockComponent}
			</ModalCart>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByTestId("cart");

		expect(element).toHaveClass("active");
	});
	it("Should not add class if active is false", () => {
		const MockComponent = <div data-testid="content"></div>;

		mockCart = [
			{
				id: 0,
				name: "fake",
				url: "../",
				price: 19.9,
				quantity: 1,
			},
		];
		mockActive = false;

		render(
			<ModalCart
				cart={mockCart}
				active={mockActive}
				onOpenModal={mockOnOpenModal}
			>
				{MockComponent}
			</ModalCart>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByTestId("cart");

		expect(element).not.toHaveClass("active");
	});
	it("Should render content if cart is not empty", () => {
		const MockComponent = <div data-testid="content"></div>;

		mockCart = [
			{
				id: 0,
				name: "fake",
				url: "../",
				price: 19.9,
				quantity: 1,
			},
		];
		mockActive = true;

		render(
			<ModalCart
				cart={mockCart}
				active={mockActive}
				onOpenModal={mockOnOpenModal}
			>
				{MockComponent}
			</ModalCart>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByTestId("content");

		expect(element).toBeInTheDocument();
	});
	it("Should render paragraph if cart is empty", () => {
		const MockComponent = <div data-testid="content"></div>;

		mockCart = [];
		mockActive = true;

		render(
			<ModalCart
				cart={mockCart}
				active={mockActive}
				onOpenModal={mockOnOpenModal}
			>
				{MockComponent}
			</ModalCart>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByTestId("empty");

		expect(element).toBeInTheDocument();
	});
	it("Should checkout if button is clicked", async () => {
		const user = userEvent.setup();
		const MockComponent = <div data-testid="content"></div>;

		mockCart = [
			{
				id: 0,
				name: "fake",
				url: "../",
				price: 19.9,
				quantity: 1,
			},
		];
		mockActive = true;

		render(
			<ModalCart
				cart={mockCart}
				active={mockActive}
				onOpenModal={mockOnOpenModal}
			>
				{MockComponent}
			</ModalCart>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByRole("button", {
			name: "CHECKOUT",
		});

		await user.click(element);

		expect(mockOnOpenModal).toBeCalledTimes(1);
	});
});
