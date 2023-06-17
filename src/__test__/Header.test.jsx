import { render, screen } from "@testing-library/react";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Header from "../components/Header";

describe("Renders Header Component", () => {
	it("Should return Header DOM with empty cartList", () => {
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

	it("Should return Header DOM with cartList", () => {
		const mockCartList = [
			{
				id: 0,
				name: "fake",
				url: "../",
				price: "19.90",
				quantity: 1,
			},
		];

		const mockToggleModal = jest.fn();

		const routes = [
			{
				path: "/",
				element: (
					<Header
						cartList={mockCartList}
						onToggleModal={mockToggleModal}
					/>
				),
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});
		render(<RouterProvider router={router} />);

		const actual = screen.queryByTestId("quantity");

		expect(actual).toHaveTextContent("1");
	});
});
