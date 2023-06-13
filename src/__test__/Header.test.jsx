import { render } from "@testing-library/react";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Header from "../components/Header";

describe("Renders Header Component", () => {
	it("Should return Header DOM", () => {
		const routes = [
			{
				path: "/",
				element: <Header />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});
		const { container } = render(<RouterProvider router={router} />);

		expect(container).toMatchSnapshot();
	});
});
