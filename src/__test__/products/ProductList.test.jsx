import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import ProductList from "../../components/products/ProductList";

let mockOutletContext = null;

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useOutletContext: () => mockOutletContext,
}));

describe("Renders Products Component", () => {
	it("Should show products matching the search text", () => {
		mockOutletContext = {
			products: [
				{
					id: 0,
					name: "fakeBag",
					url: "../",
					price: 19.9,
				},
				{
					id: 1,
					name: "fakePants",
					url: "../",
					price: 19.9,
				},
			],
			filterText: "fakeBag",
		};

		const routes = [
			{
				path: "/",
				element: <ProductList />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		expect(screen.queryByText("fakePants")).not.toBeInTheDocument();

		const actual = screen.getByText(mockOutletContext.filterText);

		expect(actual).toBeInTheDocument();
	});

	it("Should show all products without searchText", () => {
		mockOutletContext = {
			products: [
				{
					id: 0,
					name: "fakeBag",
					url: "../",
					price: 19.9,
				},
				{
					id: 1,
					name: "fakePants",
					url: "../",
					price: 19.9,
				},
			],
			filterText: "",
		};

		const routes = [
			{
				path: "/",
				element: <ProductList />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		expect(screen.getByText("fakePants")).toBeInTheDocument();
		expect(screen.getByText("fakeBag")).toBeInTheDocument();
	});
});
