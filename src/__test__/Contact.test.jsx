import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Contact from "../components/Contact";

let mockOutletContext = null;

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useOutletContext: () => mockOutletContext,
}));

describe("Renders Contact Component", () => {
	it("Should return Contact DOM", () => {
		mockOutletContext = {
			backgroundImage: {
				contact: null,
			},
		};

		const routes = [
			{
				path: "/",
				element: <Contact />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		const { container } = render(<RouterProvider router={router} />);

		expect(container).toMatchSnapshot();
	});
});
