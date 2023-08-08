import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import SingleProductPage from "../../components/products/SingleProductPage";

import {
	useCart,
	useModalDispatch,
	useCartDispatch,
} from "../../App/RootContext";

import { addUserCartItem } from "../../utils/handleUserCarts";

let mockLocation = null;
let mockNavigate = null;

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useLocation: () => mockLocation,
	useNavigate: jest.fn(() => mockNavigate),
}));

jest.mock("../../firebase-config", () => ({
	...jest.requireActual("../../firebase-config"),
	initialAuth: () => ({
		onAuthStateChanged: jest.fn(() => jest.fn()),
	}),
}));

jest.mock("../../App/RootContext");
jest.mock("../../utils/handleUserCarts");

describe("Renders SignProductPage Component", () => {
	it("Should return Error DOM without state", () => {
		mockLocation = {
			state: null,
		};

		const routes = [
			{
				path: "/",
				element: <SingleProductPage />,
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
				element: <SingleProductPage />,
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

	it("Should successfully added newItem and show added modal DOM with state", async () => {
		const mockProduct = { id: 0, name: "fake", url: "../", price: 19.9 };

		mockLocation = {
			state: {
				product: mockProduct,
			},
		};

		const mockModalDispatch = jest.fn();
		const mockCartDispatch = jest.fn();
		const mockCartData = [mockProduct];

		useModalDispatch.mockReturnValueOnce(mockModalDispatch);
		useCartDispatch.mockReturnValueOnce(mockCartDispatch);
		useCart.mockReturnValueOnce(mockCartData);

		addUserCartItem.mockResolvedValueOnce({
			message: "Add to cart success.",
			success: true,
		});

		const user = userEvent.setup();

		const routes = [
			{
				path: "/",
				element: <SingleProductPage />,
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

	it("Should failed to add newItem", async () => {
		const mockProduct = { id: 0, name: "fake", url: "../", price: 19.9 };

		const mockErrorUrl = "/error";

		mockLocation = {
			state: {
				product: mockProduct,
			},
		};

		mockNavigate = jest.fn();

		const mockCartData = [mockProduct];

		useCart.mockReturnValueOnce(mockCartData);

		addUserCartItem.mockResolvedValueOnce({
			message: "failed to add item",
			success: false,
		});

		const user = userEvent.setup();

		const routes = [
			{
				path: "/",
				element: <SingleProductPage />,
			},
		];
		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});
		render(<RouterProvider router={router} />);

		const button = screen.getByRole("button", { name: "Add to Cart" });

		await user.pointer({ keys: "[MouseLeft]", target: button });

		expect(mockNavigate).toBeCalledTimes(1);
		expect(mockNavigate.mock.calls[0][0]).toEqual(mockErrorUrl);
	});
});
