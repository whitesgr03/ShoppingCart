import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import Contact from "../components/Contact";

import { AppContext } from "../components/App";

import handleGetStorageImage from "../utils/handleStorageImage";
import handlePreLoadImage from "../utils/handlePreLoadImage";

jest.mock("../utils/handleStorageImage");
jest.mock("../utils/handlePreLoadImage");

let mockImageUrls = null;
const mockSetImageUrls = jest.fn();
const mockSetAppError = jest.fn();
const mockUseNavigate = jest.fn();

const Provider = ({ children }) => (
	<BrowserRouter>
		<AppContext.Provider
			value={{
				imageUrls: mockImageUrls,
				setImageUrls: mockSetImageUrls,
				setAppError: mockSetAppError,
			}}
		>
			{children}
		</AppContext.Provider>
	</BrowserRouter>
);

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockUseNavigate,
}));

describe("Contact Component", () => {
	it("Should render Loading component if the contact is not in the imageUrls object", () => {
		mockImageUrls = {};

		render(<Contact />, { wrapper: Provider });

		const element = screen.getByTestId("loading");

		expect(element).toHaveClass("loading");
	});
	it("Should render content if the contact is in the imageUrls object", () => {
		mockImageUrls = { contact: "../" };

		render(<Contact />, { wrapper: Provider });

		const element = screen.getByTestId("backgroundImage");

		expect(element).toBeInTheDocument();
	});
	it("Should submit form if submitted", async () => {
		const user = userEvent.setup();
		mockImageUrls = { contact: "../" };

		render(<Contact />, { wrapper: Provider });

		const element = screen.getByRole("button");

		await user.click(element);

		expect(mockUseNavigate).toBeCalledTimes(1);
	});
	it("Should get storage image if the contact is not in the imageUrls object", async () => {
		handleGetStorageImage.mockReturnValueOnce([
			{
				url: "../",
			},
		]);
		mockImageUrls = {};

		render(<Contact />, { wrapper: Provider });

		await waitFor(async () => {
			expect(handleGetStorageImage).toBeCalledTimes(1);
		});
		expect(handlePreLoadImage).toBeCalledTimes(1);
	});
	it("Should set app error if getting storage image fails", async () => {
		handleGetStorageImage.mockImplementationOnce(() => {
			throw new Error();
		});
		mockImageUrls = {};

		render(<Contact />, { wrapper: Provider });

		expect(mockSetAppError).toBeCalledTimes(1);
	});
});
