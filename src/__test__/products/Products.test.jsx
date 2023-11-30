import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Products from "../../components/products/Products";
import { AppContext } from "../../components/App";

import handleGetAllProducts from "../../utils/handleGetAllProducts";
import handlePreLoadImage from "../../utils/handlePreLoadImage";

jest.mock("../../utils/handleGetAllProducts");
jest.mock("../../utils/handlePreLoadImage");
jest.mock("../../components/products/ProductsNavbar.jsx", () => () => (
	<ul></ul>
));

const mockUserId = null;
const mockCart = null;
let mockProducts = null;
const mockSetProducts = jest.fn();
const mockSetAppError = jest.fn();
const mockOnOpenModal = jest.fn();
const mockOnGetUserCart = jest.fn();

const Provider = ({ children }) => (
	<BrowserRouter>
		<AppContext.Provider
			value={{
				userId: mockUserId,
				cart: mockCart,
				products: mockProducts,
				setProducts: mockSetProducts,
				setAppError: mockSetAppError,
				onOpenModal: mockOnOpenModal,
				onGetUserCart: mockOnGetUserCart,
			}}
		>
			{children}
		</AppContext.Provider>
	</BrowserRouter>
);

describe("Products Component", () => {
	it("Should render Loading component if context products are empty and state error is falsy", async () => {
		mockProducts = [];

		render(<Products />, { wrapper: Provider });

		const element = await screen.findByTestId("loading");

		expect(element).toHaveClass("loading");
	});
	it("Should render content if products are not empty", async () => {
		mockProducts = [
			{
				id: "item01",
				name: "fakeBag",
				url: "../",
				price: 19.9,
			},
		];

		render(<Products />, { wrapper: Provider });

		const element = await screen.findByRole("list");

		expect(element).toBeInTheDocument();
	});
	it("Should get all products if products are empty", async () => {
		handleGetAllProducts.mockReturnValueOnce([
			{
				url: "../",
			},
		]);
		mockProducts = [];

		render(<Products />, { wrapper: Provider });

		await waitFor(async () => {
			expect(handleGetAllProducts).toBeCalledTimes(1);
		});
		expect(handlePreLoadImage).toBeCalledTimes(1);
	});
	it("Should set app error if getting all products fails", async () => {
		handleGetAllProducts.mockImplementationOnce(() => {
			throw new Error();
		});
		mockProducts = [];

		render(<Products />, { wrapper: Provider });

		expect(mockSetAppError).toBeCalledTimes(1);
	});
	// it("Should render Error component when error is provided", async () => {
	// handleGetAllProducts.mockImplementationOnce(() => {
	// 	throw new Error();
	// });

	// 	render(<Products />, { wrapper: Provider });

	// 	const element = await screen.findByRole("heading", { level: 1 });

	// 	expect(element).toHaveTextContent("Service temporarily unavailable");
	// });
});
