import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { updateUserCartItem } from "../../utils/handleUserCarts";
import { useModalDispatch, useCartDispatch } from "../../components/RootContext";

import ModalCartList from "../../components/modals/ModalCartList";

jest.mock("../../components/RootContext");
jest.mock("../../firebase-config");
jest.mock("../../utils/handleUserCarts");

describe("Renders ModalCartList Component", () => {
	it("Should return ModalCartList DOM", async () => {
		const mockCartData = [
			{
				id: 0,
				name: "fake",
				url: "../",
				price: 19.9,
				quantity: 1,
			},
		];

		const mockIsLoad = false;

		const mockOnLoading = jest.fn();

		const routes = [
			{
				path: "/",
				element: (
					<ModalCartList
						list={mockCartData}
						isLoading={mockIsLoad}
						onLoading={mockOnLoading}
					/>
				),
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		const { container } = render(<RouterProvider router={router} />);

		expect(container).toMatchSnapshot();
	});
	it("Should show Remove Alert modal DOM with click event", async () => {
		const mockCartData = {
			id: 0,
			name: "fake",
			url: "../",
			price: 19.9,
			quantity: 1,
		};

		const fakeData = {
			type: "alert",
			item: {
				state: "remove",
				product: mockCartData,
			},
		};

		const mockIsLoad = false;

		const mockModalDispatch = jest.fn();
		const mockOnLoading = jest.fn();

		useModalDispatch.mockReturnValueOnce(mockModalDispatch);

		const user = userEvent.setup();

		const routes = [
			{
				path: "/",
				element: (
					<ModalCartList
						list={[mockCartData]}
						isLoading={mockIsLoad}
						onLoading={mockOnLoading}
					/>
				),
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const button = screen.getByTestId("removeBtn");

		await user.pointer({ keys: "[MouseLeft]", target: button });

		expect(mockModalDispatch).toBeCalledTimes(1);
		expect(mockModalDispatch.mock.calls[0][0]).toEqual(fakeData);
	});
	it("Should change select value with change event", async () => {
		const mockCartData = {
			id: 0,
			name: "fake",
			url: "../",
			price: 19.9,
			quantity: 1,
		};

		const updateFetchResult = {
			message: "Update cart item success.",
			success: true,
		};

		const mockIsLoad = false;

		const mockModalDispatch = jest.fn();
		const mockCartDispatch = jest.fn();
		const mockOnLoading = jest.fn();

		useModalDispatch.mockReturnValueOnce(mockModalDispatch);
		useCartDispatch.mockReturnValueOnce(mockCartDispatch);
		updateUserCartItem.mockReturnValueOnce(updateFetchResult);

		const user = userEvent.setup();

		const routes = [
			{
				path: "/",
				element: (
					<ModalCartList
						list={[mockCartData]}
						isLoading={mockIsLoad}
						onLoading={mockOnLoading}
					/>
				),
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const select = screen.getByTestId("quantity");

		expect(select).toHaveValue("1");

		await user.selectOptions(select, "2");

		expect(updateUserCartItem).toBeCalledTimes(1);
		expect(mockOnLoading).toBeCalledTimes(2);
		expect(mockCartDispatch).toBeCalledTimes(1);
	});
});
