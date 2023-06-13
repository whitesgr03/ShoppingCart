import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Home from "../components/Home";

describe("Renders Home Component", () => {
	it("Should return Home DOM", () => {
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
