import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../components/App";

import { getUserCart } from "../utils/handleUserCart";

import {
	handleAuthState,
	handleCheckUser,
	handleCreateUser,
} from "../utils/handleUserAccount";

jest.mock("../utils/handleUserCart");
jest.mock("../utils/handleUserAccount");

jest.mock("../components/layout/Header", () => ({
	__esModule: true,
	default: ({ onOpenModal, children }) => (
		<div>
			<button type="button" onClick={e => onOpenModal(true)}>
				mockButton
			</button>
			{children}
		</div>
	),
	Badge: () => <></>,
}));
jest.mock("../components/layout/Footer");
jest.mock("../components/modals/ModalCart");
jest.mock("../components/modals/ModalProductAlert");

describe("App Component", () => {
	it("Should render Loading component if cart is empty and AppError is falsy", async () => {
		handleAuthState.mockReturnValueOnce(jest.fn());
		render(<App />, { wrapper: BrowserRouter });

		const element = await screen.findByTestId("loading");

		expect(element).toBeInTheDocument();
	});
	it("Should render Error component if check user fails", async () => {
		handleAuthState.mockImplementationOnce(cb => {
			const mockUser = {
				uid: "",
			};
			cb(mockUser);
			return jest.fn();
		});

		handleCheckUser.mockImplementationOnce(() => {
			throw new Error();
		});

		render(<App />, { wrapper: BrowserRouter });

		const element = await screen.findByRole("heading", { level: 1 });

		expect(element).toBeInTheDocument();
	});
	it("Should render Error component if create user fails", async () => {
		handleAuthState.mockImplementationOnce(cb => {
			const mockUser = {
				uid: "",
			};
			cb(mockUser);
			return jest.fn();
		});

		handleCheckUser.mockReturnValueOnce(false);

		handleCreateUser.mockImplementationOnce(() => {
			throw new Error();
		});

		render(<App />, { wrapper: BrowserRouter });

		const element = await screen.findByRole("heading", { level: 1 });

		expect(element).toBeInTheDocument();
	});
	it("Should render content if cart is not falsy and AppError is falsy", async () => {
		handleAuthState.mockImplementationOnce(cb => {
			const mockUser = {
				uid: "",
			};
			cb(mockUser);
			return jest.fn();
		});
		handleCheckUser.mockReturnValueOnce(true);
		getUserCart.mockReturnValueOnce([]);

		render(<App />, { wrapper: BrowserRouter });

		const element = await screen.findByTestId("shadow");

		expect(element).toBeInTheDocument();
	});

	it("Should handle auth state correctly", async () => {
		handleAuthState.mockReturnValueOnce(jest.fn());
		render(<App />, { wrapper: BrowserRouter });

		await waitFor(() => {
			expect(handleAuthState).toBeCalledTimes(1);
		});
	});
	it("Should create user if user is not created", async () => {
		handleAuthState.mockImplementationOnce(cb => {
			const mockUser = {
				uid: "",
			};
			cb(mockUser);
			return jest.fn();
		});

		handleCheckUser.mockReturnValueOnce(false);

		render(<App />, { wrapper: BrowserRouter });

		await waitFor(() => {
			expect(handleAuthState).toBeCalledTimes(1);
		});
		expect(handleCheckUser).toBeCalledTimes(1);
		expect(handleCreateUser).toBeCalledTimes(1);
	});
	it("Should render Error component if get user cart fails", async () => {
		handleAuthState.mockImplementationOnce(cb => {
			const mockUser = {
				uid: "",
			};
			cb(mockUser);
			return jest.fn();
		});
		handleCheckUser.mockReturnValueOnce(true);
		getUserCart.mockImplementationOnce(() => {
			throw new Error();
		});

		render(<App />, { wrapper: BrowserRouter });

		const element = await screen.findByRole("heading", {
			level: 1,
		});

		expect(element).toBeInTheDocument();
	});

	it("Should add class if modalState type is truly", async () => {
		const user = userEvent.setup();
		handleAuthState.mockImplementationOnce(cb => {
			const mockUser = {
				uid: "",
			};
			cb(mockUser);
			return jest.fn();
		});
		handleCheckUser.mockReturnValueOnce(true);
		getUserCart.mockReturnValueOnce([]);

		render(<App />, { wrapper: BrowserRouter });

		const button = await screen.findByRole("button", {
			name: "mockButton",
		});

		await user.click(button);

		const element = screen.getByTestId("shadow");

		expect(element).toHaveClass("active");
	});
	it("Should close modal if if modalState type is truly and block is clicked", async () => {
		const user = userEvent.setup();
		handleAuthState.mockImplementationOnce(cb => {
			const mockUser = {
				uid: "",
			};
			cb(mockUser);
			return jest.fn();
		});
		handleCheckUser.mockReturnValueOnce(true);
		getUserCart.mockReturnValueOnce([]);

		render(<App />, { wrapper: BrowserRouter });

		const button = await screen.findByRole("button", {
			name: "mockButton",
		});

		await user.click(button);

		const element = screen.getByTestId("shadow");

		await user.click(element);

		expect(element).not.toHaveClass("close");
	});
});
