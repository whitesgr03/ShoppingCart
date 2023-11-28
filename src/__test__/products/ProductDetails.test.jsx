import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import ProductDetails from "../../components/products/ProductDetails";
import { AppContext } from "../../components/App";

import handleGetProduct from "../../utils/handleGetProduct";
import handlePreLoadImage from "../../utils/handlePreLoadImage";
import { addUserCartItem } from "../../utils/handleUserCart";

jest.mock("../../utils/handleGetProduct");
jest.mock("../../utils/handlePreLoadImage");
jest.mock("../../utils/handleUserCart");

const mockUserId = null;
let mockCart = null;
const mockOnOpenModule = jest.fn();
const mockOnGetUserCart = jest.fn();
const mockOnError = jest.fn();

const route = "/shop/item01";

const Provider = ({ children }) => (
	<MemoryRouter initialEntries={[route]}>
		<Routes>
			<Route
				path="shop/:productId"
				element={
					<AppContext.Provider
						value={{
							userId: mockUserId,
							cart: mockCart,
							onOpenModule: mockOnOpenModule,
							onGetUserCart: mockOnGetUserCart,
							onError: mockOnError,
						}}
					>
						{children}
					</AppContext.Provider>
				}
			/>
		</Routes>
	</MemoryRouter>
);

describe("ProductDetails Component", () => {
	it("Should render Loading component when products is false", async () => {
		render(<ProductDetails />, { wrapper: Provider });

		const element = await screen.findByTestId("loading");

		expect(element).toHaveClass("loading");
	});
	it("Should call the onError when catch error", async () => {
		handleGetProduct.mockImplementationOnce(() => {
			throw new Error();
		});

		render(<ProductDetails />, { wrapper: Provider });

		expect(mockOnError).toBeCalledTimes(1);
	});
	it("Should render ProductDetails component when product is true", async () => {
		handleGetProduct.mockReturnValueOnce({
			id: 0,
			name: "fakeBag",
			url: "../",
			price: 19.9,
		});

		render(<ProductDetails />, { wrapper: Provider });

		const element = await screen.findByRole("heading", {
			level: 2,
			name: "fakeBag",
		});

		expect(element).toBeInTheDocument();
		expect(handlePreLoadImage).toBeCalledTimes(1);
	});
	it("Should add product to cart after submission successful", async () => {
		handleGetProduct.mockReturnValueOnce({
			id: "item01",
			name: "fakeBag",
			url: "../",
			price: 19.9,
		});

		mockCart = [
			{
				id: "item01",
				name: "fakeBag",
				url: "../",
				price: 19.9,
				quantity: 1,
			},
		];

		const user = userEvent.setup();

		render(<ProductDetails />, { wrapper: Provider });

		const element = await screen.findByRole("button");

		await user.click(element);

		expect(addUserCartItem).toBeCalledTimes(1);
		expect(mockOnOpenModule).toBeCalledTimes(1);
		expect(mockOnGetUserCart).toBeCalledTimes(1);
	});
	it("Should be called the onError when submission fails", async () => {
		handleGetProduct.mockReturnValueOnce({
			id: "item01",
			name: "fakeBag",
			url: "../",
			price: 19.9,
		});

		addUserCartItem.mockImplementationOnce(() => {
			throw new Error();
		});

		mockCart = [
			{
				id: "item01",
				name: "fakeBag",
				url: "../",
				price: 19.9,
				quantity: 1,
			},
		];

		const user = userEvent.setup();

		render(<ProductDetails />, { wrapper: Provider });

		const element = await screen.findByRole("button");

		await user.click(element);

		expect(addUserCartItem).toBeCalledTimes(1);
		expect(mockOnError).toBeCalledTimes(1);
	});
});
