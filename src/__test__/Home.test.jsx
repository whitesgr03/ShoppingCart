import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Home from "../components/Home";

import { AppContext } from "../components/App";

import handleGetStorageImage from "../utils/handleStorageImage";
import handlePreLoadImage from "../utils/handlePreLoadImage";

jest.mock("../utils/handleStorageImage");
jest.mock("../utils/handlePreLoadImage");

let mockImageUrls = null;
const mockSetImageUrls = jest.fn();
const mockSetAppError = jest.fn();

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

describe("Home Component", () => {
	it("Should render Loading component if the home is not in the imageUrls object", () => {
		mockImageUrls = {};

		render(<Home />, { wrapper: Provider });

		const element = screen.getByTestId("loading");

		expect(element).toHaveClass("loading");
	});
	it("Should render home if the home is in the imageUrls object", () => {
		mockImageUrls = { home: "../" };

		render(<Home />, { wrapper: Provider });

		const element = screen.getByTestId("backgroundImage");

		expect(element).toBeInTheDocument();
	});
	it("Should get storage image if the home is not in the imageUrls object", async () => {
		handleGetStorageImage.mockReturnValueOnce([
			{
				url: "../",
			},
		]);
		mockImageUrls = {};

		render(<Home />, { wrapper: Provider });

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

		render(<Home />, { wrapper: Provider });

		expect(mockSetAppError).toBeCalledTimes(1);
	});
});
