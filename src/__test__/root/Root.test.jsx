import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Root from "../../App/Root";

describe("Renders Root Component", () => {
	it("Should return Root DOM", () => {
		const routes = [
			{
				path: "/",
				element: <Root />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const actual = screen.getByTestId("content");

		expect(actual).toBeInTheDocument();
	});
});
