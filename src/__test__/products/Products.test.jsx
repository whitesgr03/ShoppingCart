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
const mockOnOpenModule = jest.fn();
const mockOnGetUserCart = jest.fn();

const Provider = ({ children }) => (
	<BrowserRouter>
		<AppContext.Provider
			value={{
				userId: mockUserId,
				cart: mockCart,
				onOpenModule: mockOnOpenModule,
				onGetUserCart: mockOnGetUserCart,
			}}
		>
			{children}
		</AppContext.Provider>
	</BrowserRouter>
);

describe("Products Component", () => {
	it("Should render Loading component when products and error is false", async () => {
		render(<Products />, { wrapper: Provider });

		const element = await screen.findByTestId("loading");

		expect(element).toHaveClass("loading");
	});
	it("Should render Error component when error is true", async () => {
		handleGetAllProducts.mockImplementationOnce(() => {
			throw new Error();
		});

		render(<Products />, { wrapper: Provider });

		const element = await screen.findByRole("heading");

		expect(element).toHaveTextContent("Service temporarily unavailable");
	});
	it("Should render Products component when products is true", async () => {
		handleGetProducts.mockReturnValue(true);

		render(<Products />, { wrapper: Provider });

		await waitFor(async () => {
			const element = await screen.findByRole("list");
			expect(element).toBeInTheDocument();
		});
	});
});
