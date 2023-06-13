import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import Root from "../components/Root";

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
