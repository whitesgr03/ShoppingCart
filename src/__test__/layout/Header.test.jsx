import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import Header, { Badge } from "../../components/layout/Header";

import {
	handleGoogleLogin,
	handleUserLogout,
} from "../../utils/handleUserAccount";

jest.mock("../../utils/handleUserAccount");

let mockUserId = null;
const mokSetAppError = jest.fn();
const mockOnOpenModal = jest.fn();

describe("Header Component", () => {
	it("Should add class if userId is null", () => {
		const MockComponent = <div data-testid="content"></div>;

		mockUserId = null;

		render(
			<Header
				userId={mockUserId}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			>
				{MockComponent}
			</Header>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByTestId("background");

		expect(element).toHaveClass("authenticate");
	});
	it("Should render account icon if userId is empty string", () => {
		const MockComponent = <div data-testid="content"></div>;

		mockUserId = "";

		render(
			<Header
				userId={mockUserId}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			>
				{MockComponent}
			</Header>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByTestId("account");

		expect(element).toBeInTheDocument();
	});
	it("Should render logout icon if userId is not empty string", () => {
		const MockComponent = <div data-testid="content"></div>;

		mockUserId = "fake";

		render(
			<Header
				userId={mockUserId}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			>
				{MockComponent}
			</Header>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByTestId("logout");

		expect(element).toBeInTheDocument();
	});
	it("Should login if button is clicked", async () => {
		const user = userEvent.setup();
		const MockComponent = <div data-testid="content"></div>;

		mockUserId = "";

		render(
			<Header
				userId={mockUserId}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			>
				{MockComponent}
			</Header>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByTestId("accountButton");

		await user.click(element);

		expect(handleGoogleLogin).toBeCalledTimes(1);
	});
	it("Should set app error if login fails", async () => {
		handleGoogleLogin.mockImplementationOnce(() => {
			throw new Error();
		});
		const user = userEvent.setup();
		const MockComponent = <div data-testid="content"></div>;

		mockUserId = "";

		render(
			<Header
				userId={mockUserId}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			>
				{MockComponent}
			</Header>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByTestId("accountButton");

		await user.click(element);

		expect(mokSetAppError).toBeCalledTimes(1);
	});
	it("Should logout if button is clicked", async () => {
		const user = userEvent.setup();
		const MockComponent = <div data-testid="content"></div>;

		mockUserId = "fake";

		render(
			<Header
				userId={mockUserId}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			>
				{MockComponent}
			</Header>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByTestId("accountButton");

		await user.click(element);

		expect(handleUserLogout).toBeCalledTimes(1);
	});
	it("Should set app error if logout fails", async () => {
		handleUserLogout.mockImplementationOnce(() => {
			throw new Error();
		});
		const user = userEvent.setup();
		const MockComponent = <></>;

		mockUserId = "fake";

		render(
			<Header
				userId={mockUserId}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			>
				{MockComponent}
			</Header>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByTestId("accountButton");

		await user.click(element);

		expect(mokSetAppError).toBeCalledTimes(1);
	});
	it("Should open modal cart if button is clicked", async () => {
		const user = userEvent.setup();
		const MockComponent = <div data-testid="content"></div>;

		render(
			<Header
				userId={mockUserId}
				setAppError={mokSetAppError}
				onOpenModal={mockOnOpenModal}
			>
				{MockComponent}
			</Header>,
			{ wrapper: BrowserRouter }
		);

		const element = screen.getByTestId("cartButton");

		await user.click(element);

		expect(mockOnOpenModal).toBeCalledTimes(1);
	});
});

describe("Badge Component", () => {
	it("Should render content if cart is provide", () => {
		const mockCart = [{}];

		render(<Badge cart={mockCart} />);

		const element = screen.getByTestId("badge");

		expect(element).toBeInTheDocument();
	});
	it("Should not render content if cart is not provide", () => {
		const mockCart = [];

		render(<Badge cart={mockCart} />);

		const element = screen.queryByTestId("badge");

		expect(element).toBeFalsy();
	});
});
