import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import AuthGuard from "../components/AuthGuard";
import { AppContext } from "../components/App";

import { handleGoogleLogin } from "../utils/handleUserAccount";

jest.mock("../utils/handleUserAccount");

let mockUserId = null;
const mockSetProductError = jest.fn();

const Provider = ({ children }) => (
	<BrowserRouter>
		<AppContext.Provider
			value={{
				userId: mockUserId,
				setProductError: mockSetProductError,
			}}
		>
			{children}
		</AppContext.Provider>
	</BrowserRouter>
);

describe("AuthGuard Component", () => {
	it("Should render Loading component if userId is falsy", async () => {
		mockUserId = false;
		const MockComponent = <div data-testid="content"></div>;

		render(<AuthGuard>{MockComponent}</AuthGuard>, { wrapper: Provider });

		const element = await screen.findByTestId("loading");

		expect(element).toHaveClass("loading");
	});
	it("Should set product error if google login is fails", async () => {
		handleGoogleLogin.mockImplementationOnce(() => {
			throw new Error();
		});
		mockUserId = false;
		const MockComponent = <div data-testid="content"></div>;

		render(<AuthGuard>{MockComponent}</AuthGuard>, {
			wrapper: Provider,
		});

		expect(mockSetProductError).toBeCalledTimes(1);
	});
	it("Should render content if userId is provide", async () => {
		mockUserId = true;
		const MockComponent = <div data-testid="content"></div>;

		render(<AuthGuard>{MockComponent}</AuthGuard>, { wrapper: Provider });

		const element = await screen.findByTestId("content");

		expect(element).toBeInTheDocument();
	});
});
