import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import AuthGuard from "../components/AuthGuard";
import { AppContext } from "../components/App";

import { handleGoogleLogin } from "../utils/handleUserAccount";

jest.mock("../utils/handleUserAccount");

let mockUserId = null;
const mockOnError = jest.fn();

const Provider = ({ children }) => (
	<BrowserRouter>
		<AppContext.Provider
			value={{
				userId: mockUserId,
				onError: mockOnError,
			}}
		>
			{children}
		</AppContext.Provider>
	</BrowserRouter>
);

describe("AuthGuard Component", () => {
	it("Should render Loading component when userId is false", async () => {
		mockUserId = false;
		const MockComponent = <div data-testid="content"></div>;

		render(<AuthGuard>{MockComponent}</AuthGuard>, { wrapper: Provider });

		const element = await screen.findByTestId("loading");

		expect(element).toHaveClass("loading");
		expect(handleGoogleLogin).toBeCalledTimes(1);
	});
	it("Should call the onError when catch error", async () => {
		handleGoogleLogin.mockImplementationOnce(() => {
			throw new Error();
		});
		mockUserId = false;
		const MockComponent = <div data-testid="content"></div>;

		render(<AuthGuard>{MockComponent}</AuthGuard>, {
			wrapper: Provider,
		});

		expect(mockOnError).toBeCalledTimes(1);
	});
	it("Should render content when userId is true", async () => {
		mockUserId = true;
		const MockComponent = <div data-testid="content"></div>;

		render(<AuthGuard>{MockComponent}</AuthGuard>, { wrapper: Provider });

		const element = await screen.findByTestId("content");

		expect(element).toBeInTheDocument();
	});
});
