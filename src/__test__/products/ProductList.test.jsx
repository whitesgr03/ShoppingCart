import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ProductList from "../../components/products/ProductList";
import { AppContext } from "../../components/App";

let mockProducts = null;

const Provider = ({ children }) => (
	<BrowserRouter>
		<AppContext.Provider
			value={{
				products: mockProducts,
			}}
		>
			{children}
		</AppContext.Provider>
	</BrowserRouter>
);

describe("ProductList Component", () => {
	it("Should render list when products context is provided", () => {
		mockProducts = [
			{
				id: "item01",
				name: "fakeBag",
				url: "../",
				price: 19.9,
			},
		];

		render(<ProductList />, { wrapper: Provider });

		const element = screen.getByRole("list");

		expect(element).toBeInTheDocument();
	});
	it("Should render heading when products context is not provided", () => {
		mockProducts = [];

		render(<ProductList />, { wrapper: Provider });

		const element = screen.getByRole("heading", { level: 3 });

		expect(element).toBeInTheDocument();
	});
});
