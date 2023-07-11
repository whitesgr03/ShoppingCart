import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import SignProductPage from "../../components/products/SignProductPage";

let mockLocation = null;

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useLocation: () => mockLocation,
}));

let mockModalDispatch = null;
let mockCartDispatch = null;

jest.mock("../../App/RootContext", () => ({
	...jest.requireActual("../../App/RootContext"),

	useModalDispatch: () => mockModalDispatch,
	useCartDispatch: () => mockCartDispatch,
}));

describe("Renders SignProductPage Component", () => {
	it("Should return Error DOM without state", () => {
		mockLocation = {
			state: null,
		};

		const routes = [
			{
				path: "/",
				element: <SignProductPage />,
			},
		];
		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});
		render(<RouterProvider router={router} />);

		const actual = screen.getByTestId("productError");

		expect(actual).toHaveClass("productError");
	});

	it("Should return ProductInfo DOM with state", () => {
		mockLocation = {
			state: {
				product: { id: 0, name: "fake", url: "../", price: 19.9 },
			},
		};

		const routes = [
			{
				path: "/",
				element: <SignProductPage />,
			},
		];
		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});
		render(<RouterProvider router={router} />);

		expect(screen.getByRole("img")).toHaveAttribute("src", "../");

		expect(screen.getByText("fake")).toHaveClass("title");

		expect(screen.getByText("$19.90")).toHaveClass("price");
	});

	it("Should return added newItem and show added modal DOM with state", async () => {
		mockModalDispatch = jest.fn();
		mockCartDispatch = jest.fn();

		const user = userEvent.setup();

		const routes = [
			{
				path: "/",
				element: <SignProductPage />,
			},
		];
		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});
		render(<RouterProvider router={router} />);

		const button = screen.getByRole("button", { name: "Add to Cart" });

		await user.pointer({ keys: "[MouseLeft]", target: button });

		expect(mockModalDispatch).toBeCalledTimes(1);
		expect(mockCartDispatch).toBeCalledTimes(1);
	});
});
