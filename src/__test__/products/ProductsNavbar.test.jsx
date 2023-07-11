import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import ProductsNavbar from "../../components/products/ProductsNavbar";

describe("Renders ProductsNavbar Component", () => {
	it("Should return ProductsNavbar DOM", () => {
		const routes = [
			{
				path: "/",
				element: <ProductsNavbar />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		const { container } = render(<RouterProvider router={router} />);

		expect(container).toMatchSnapshot();
	});
});
