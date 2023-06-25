import { render } from "@testing-library/react";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Error from "../components/Error";

describe("Renders Error Component", () => {
	it("Should return Error DOM", () => {
		const routes = [
			{
				path: "/",
				element: <Error />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});
		const { container } = render(<RouterProvider router={router} />);

		expect(container).toMatchSnapshot();
	});
});
