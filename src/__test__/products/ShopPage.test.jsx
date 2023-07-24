import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Shop from "../../components/products/ShopPage";

let mockOutletContext = null;

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useOutletContext: () => mockOutletContext,
}));

describe("Renders Shop Component", () => {
	it("Should return Shop DOM", async () => {
		mockOutletContext = {
			products: [],
		};

		const routes = [
			{
				path: "/",
				element: <Shop />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		const { container } = render(<RouterProvider router={router} />);

		expect(container).toMatchSnapshot();
	});
});
