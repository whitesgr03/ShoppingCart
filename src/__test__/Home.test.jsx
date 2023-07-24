import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Home from "../components/Home";

let mockOutletContext = null;

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useOutletContext: () => mockOutletContext,
}));

describe("Renders Home Component", () => {
	it("Should return Home DOM", () => {
		mockOutletContext = {
			backgroundImage: {
				home: null,
			},
		};

		const routes = [
			{
				path: "/",
				element: <Home />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		const { container } = render(<RouterProvider router={router} />);

		expect(container).toMatchSnapshot();
	});
});
